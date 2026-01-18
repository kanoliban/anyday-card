import { Metadata } from 'next';

import Header from '../../components/Header';
import CheckoutContent from './CheckoutContent';

export const metadata: Metadata = {
  title: 'Checkout | AnyDayCard',
  description: 'Review your order and proceed to payment.',
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col px-6 py-8 md:px-11">
        <CheckoutContent />
      </main>
    </>
  );
}
