export type CardVariant = 'physical' | 'digital';

export type CardPricing = {
  physical: number;
  digital: number;
  currency: 'USD';
};

export type CardCollectionType = 'celebrations' | 'gratitude' | 'seasonal' | 'everyday';

export type Card = {
  id: string;
  name: string;
  occasion: string;
  style: 'illustrated' | 'typographic' | 'photographic' | 'minimal';
  tone: 'warm' | 'playful' | 'elegant' | 'minimal' | 'festive' | 'serene';
  colors: string[];
  size: string;
  paperStock: string;
  description: string;
  src: string;
  srcLg: string;
  srcBack?: string;
  srcLgBack?: string;
  width?: number;
  height?: number;
  pricing: CardPricing;
  inStock: boolean;
  collection?: CardCollectionType;
  aspect?: number;
};

export type CardCollection = {
  colors: {
    bg: string;
    fg: string;
    mutedBg: string;
    mutedFg: string;
  };
  cards: Card[];
};
