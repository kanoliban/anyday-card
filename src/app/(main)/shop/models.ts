import type { Card, CardVariant } from '~/src/app/cards/models';

export type CartItem = {
  card: Card;
  variant: CardVariant;
  quantity: number;
};

export type CartItemKey = `${string}-${CardVariant}`;

export function getCartItemKey(cardId: string, variant: CardVariant): CartItemKey {
  return `${cardId}-${variant}`;
}

export function getItemPrice(item: CartItem): number {
  return item.card.pricing[item.variant] * item.quantity;
}
