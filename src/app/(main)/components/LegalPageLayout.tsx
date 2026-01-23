import { ReactNode } from 'react';

import Header from './Header';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div>
      <Header />
      <div className="flex flex-col px-5 py-8 md:py-12">
        <main className="mx-auto w-full max-w-3xl pb-24">
          <header className="mb-12">
            <h1 className="mb-3 font-archivo text-4xl font-bold text-text-primary lg:text-5xl">
              {title}
            </h1>
            <p className="text-sm text-text-muted">Last updated: {lastUpdated}</p>
          </header>
          <article className="legal-content">{children}</article>
        </main>
      </div>
    </div>
  );
}
