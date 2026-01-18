import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import CardTitle from '~/src/components/ui/CardTitle';
import LinkBox, { LinkBoxLink } from '~/src/components/ui/LinkBox';

import Card from './Card';

const featuredCard = {
  id: 'birthday-warm',
  name: 'Warm Birthday Wishes',
  label: 'New Arrival',
  image: '/cards/birthday-warm.svg',
};

export default function FeaturedCardCard() {
  return (
    <Card>
      <LinkBox className="group flex flex-col justify-between">
        <div className="text-text-primary group-hover:text-main-accent mb-4 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-2">
            <CardTitle variant="mono">
              <LinkBoxLink href={`/cards?card=${featuredCard.id}`} className="rounded">
                {featuredCard.label}
              </LinkBoxLink>
            </CardTitle>
            <span className="text-sm">{featuredCard.name}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="relative aspect-4/2 w-full overflow-hidden rounded-md bg-stone-100">
          <Image
            src={featuredCard.image}
            alt={featuredCard.name}
            fill
            className="object-contain p-4 transition-all duration-300 group-hover:scale-105"
          />
          <div className="bg-panel-overlay absolute top-0 left-0 h-full w-full transition-colors duration-200" />
        </div>
      </LinkBox>
    </Card>
  );
}

export { FeaturedCardCard as WorkspaceCard };
