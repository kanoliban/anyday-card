'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';

import Image from '~/src/components/ui/Image';

import { CartItem, getItemPrice } from '../models';
import { useCartStore } from '../store';

type Props = {
  item: CartItem;
};

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export default function CartItemRow({ item }: Props) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const { card, variant, quantity } = item;
  const itemTotal = getItemPrice(item);

  return (
    <div className="flex gap-4 py-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-stone-100">
        <Image
          src={card.src}
          alt={card.name}
          fill
          sizes="80px"
          className="object-contain p-2"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h4 className="font-medium text-text-primary">{card.name}</h4>
          <p className="text-sm text-text-secondary capitalize">{variant}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(card.id, variant, quantity - 1)}
              className="flex size-7 items-center justify-center rounded-full bg-panel-overlay text-text-secondary transition-colors hover:bg-panel-overlay/80"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center tabular-nums text-text-primary">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(card.id, variant, quantity + 1)}
              className="flex size-7 items-center justify-center rounded-full bg-panel-overlay text-text-secondary transition-colors hover:bg-panel-overlay/80"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium tabular-nums text-text-primary">
              {formatPrice(itemTotal)}
            </span>
            <button
              onClick={() => removeItem(card.id, variant)}
              className="text-text-secondary transition-colors hover:text-red-500"
              aria-label="Remove item"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
