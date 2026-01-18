import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { getStripe } from '~/src/lib/stripe';
import { createClient } from '~/src/supabase/server';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await handleCheckoutComplete(session);
    } catch (err) {
      console.error('Error handling checkout.session.completed:', err);
      // Return 200 to acknowledge receipt (Stripe will retry otherwise)
      // Log error for investigation
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const supabase = await createClient();

  // Parse items from session metadata
  const itemsJson = session.metadata?.items;
  const items = itemsJson ? JSON.parse(itemsJson) : [];

  const { error } = await supabase.from('orders').insert({
    stripe_session_id: session.id,
    stripe_payment_intent:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? null,
    customer_email: session.customer_details?.email ?? null,
    items,
    subtotal: session.amount_total ?? 0,
    status: 'completed',
  });

  if (error) {
    console.error('Failed to insert order:', error);
    throw error;
  }

  console.log(`Order created for session: ${session.id}`);
}
