import { Suspense } from 'react';

import Header from './components/Header';
import CartDrawer from '../shop/components/CartDrawer';

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      {children}
      <CartDrawer />
    </>
  );
}
