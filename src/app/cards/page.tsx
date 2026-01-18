import { Metadata } from 'next';

import ClientRendered from '~/src/components/ClientRendered';

import CartDrawer from '../(main)/shop/components/CartDrawer';
import CardsGrid from './components/CardsGrid';
import Header from './components/Header';
import { cards, CollectionFilter } from './constants';

export const metadata: Metadata = {
  title: 'Cards | AnyDayCard',
  description:
    'Browse our collection of AI-generated greeting cards. Buy as-is or customize with our wizard.',
};

export default async function CardsPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: CollectionFilter }>;
}) {
  const params = await searchParams;

  const filteredCards = cards.filter((card) => {
    if (!params?.c || params.c === 'all') {
      return true;
    }
    return card.collection === params.c;
  });

  return (
    <div className="flex min-h-svh flex-1 flex-col bg-main-background">
      <Header />
      <main className="flex-1">
        <ClientRendered>
          <CardsGrid cards={filteredCards} />
        </ClientRendered>
      </main>
      <CartDrawer />
    </div>
  );
}
