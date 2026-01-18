import { NextResponse } from 'next/server';
import { z } from 'zod';

import { cards } from '~/src/app/cards/constants';
import type { CardVariant } from '~/src/app/cards/models';
import { getBaseUrl, getStripe } from '~/src/lib/stripe';

const cartItemSchema = z.object({
  cardId: z.string(),
  variant: z.enum(['physical', 'digital']),
  quantity: z.number().int().min(1).max(99),
});

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(50),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid cart data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { items } = parsed.data;

    // Build line items from cart
    const lineItems = items.map((item) => {
      const card = cards.find((c) => c.id === item.cardId);
      if (!card) {
        throw new Error(`Card not found: ${item.cardId}`);
      }

      const price = card.pricing[item.variant as CardVariant];
      const variantLabel = item.variant === 'physical' ? 'Physical Card' : 'Digital Download';

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: card.name,
            description: `${variantLabel} - ${card.occasion}`,
            images: [`${getBaseUrl()}${card.src}`],
            metadata: {
              cardId: card.id,
              variant: item.variant,
            },
          },
          unit_amount: Math.round(price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    const baseUrl = getBaseUrl();

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${baseUrl}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop`,
      metadata: {
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);

    if (error instanceof Error && error.message.startsWith('Card not found')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
