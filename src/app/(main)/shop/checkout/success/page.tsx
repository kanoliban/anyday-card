import { Metadata } from 'next';
import { Suspense } from 'react';

import Header from '../../../components/Header';
import SuccessContent from './SuccessContent';

export const metadata: Metadata = {
  title: 'Order Complete | AnyDayCard',
  description: 'Thank you for your purchase!',
};

function SuccessLoading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-20">
      <div className="size-8 animate-spin rounded-full border-4 border-text-secondary/30 border-t-text-primary" />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col px-6 py-8 md:px-11">
        <Suspense fallback={<SuccessLoading />}>
          <SuccessContent />
        </Suspense>
      </main>
    </>
  );
}
