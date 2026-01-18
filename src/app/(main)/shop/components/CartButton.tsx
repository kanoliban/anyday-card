'use client';

import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '~/src/util';

import { useCartStore } from '../store';

export default function CartButton() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const setOpen = useCartStore((state) => state.setOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCount = mounted ? itemCount : 0;

  return (
    <button
      onClick={() => setOpen(true)}
      className="relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-panel-overlay"
      aria-label={`Shopping cart with ${displayCount} items`}
    >
      <ShoppingCart className="size-5 text-text-primary" />
      {mounted && itemCount > 0 && (
        <span
          className={cn(
            'absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-theme-1 text-xs font-medium text-white'
          )}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}
