'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { EnvelopeSimple } from '@phosphor-icons/react';

import useScroll from '~/src/hooks/useScroll';
import { cn } from '~/src/util';


const headerTriggerY = 50;

export default function Header({ children }: { children?: ReactNode }) {
  const { y, directionY } = useScroll();

  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex flex-wrap justify-between rounded-bl-[32px] rounded-br-[32px] px-5 py-4 transition-all duration-300 ease-in-out',
        {
          'translate-y-[-128px]': y > headerTriggerY && directionY === 'down',
        },
      )}
    >
      <div className="absolute inset-0 z-[-1] rounded-bl-[32px] rounded-br-[32px] backdrop-blur mask-[linear-gradient(to_top,transparent,black_65%)]" />
      <Link
        href="/"
        className={cn(
          'flex items-center gap-2 font-archivo text-xl font-bold transition-colors duration-300',
          y > headerTriggerY ? 'text-theme-1' : 'text-text-primary'
        )}
        aria-label="Go to Home page"
      >
        <EnvelopeSimple size={24} weight="duotone" />
        <span className="hidden pr-1 md:inline">AnyDayCard</span>
      </Link>
      {children && (
        <div className="order-3 mt-4 w-full lg:order-0 lg:mt-0 lg:w-auto">{children}</div>
      )}
    </header>
  );
}
