'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

import Button from '~/src/components/ui/Button';
import Heading from '~/src/components/ui/Heading';

import { useCartStore } from '../../store';

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clearCart = useCartStore((state) => state.clearCart);
  const hasCleared = useRef(false);

  useEffect(() => {
    // Clear cart only once on mount when we have a valid session ID
    if (sessionId && !hasCleared.current) {
      hasCleared.current = true;
      clearCart();
    }
  }, [sessionId, clearCart]);

  if (!sessionId) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <Heading className="mb-4 text-2xl">Invalid Session</Heading>
        <p className="mb-6 text-text-secondary">
          This page requires a valid checkout session.
        </p>
        <Button asChild>
          <Link href="/shop">Return to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-12 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="size-10 text-green-600" />
      </div>

      <Heading className="mb-4 text-2xl md:text-3xl">
        Thank you for your order!
      </Heading>

      <p className="mb-2 text-text-secondary">
        Your order has been confirmed and is being processed.
      </p>

      <p className="mb-8 text-sm text-text-secondary">
        A confirmation email will be sent to you shortly.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>

      <p className="mt-8 text-xs text-text-secondary">
        Order reference: {sessionId.slice(0, 8)}...
      </p>
    </div>
  );
}
