import { Leaf, Palette, Sparkles, Heart } from 'lucide-react';

import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

type QualityFeature = {
  icon: typeof Leaf;
  title: string;
  description: string;
};

const qualityFeatures: QualityFeature[] = [
  {
    icon: Leaf,
    title: 'Eco-friendly',
    description: 'Sustainably sourced paper and vegetable-based inks',
  },
  {
    icon: Palette,
    title: 'Vibrant colors',
    description: 'Fade-resistant printing that lasts for years',
  },
  {
    icon: Sparkles,
    title: 'Premium paper',
    description: 'Thick, luxurious stocks with beautiful textures',
  },
  {
    icon: Heart,
    title: 'Made with care',
    description: 'Each card designed and inspected by hand',
  },
];

export default function QualityCard() {
  return (
    <Card>
      <div className="flex h-full flex-col justify-between">
        <CardTitle variant="mono">Quality & Materials</CardTitle>
        <div className="mt-4 space-y-3">
          {qualityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-stone-50"
            >
              <feature.icon className="mt-0.5 size-4 shrink-0 text-theme-1" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-primary">{feature.title}</span>
                <span className="text-xs text-text-primary/60">{feature.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export { QualityCard as CodeCard };
