'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CSSProperties, useCallback, useRef, useState } from 'react';

import { cn } from '~/src/util';

import { Card } from '../../models';

interface DoubleSidedCardProps {
  card: Card;
  isMobile: boolean;
  isMobileSmall: boolean;
  defaultDimensions: { width: number; height: number };
}

export function DoubleSidedCard({
  card,
  isMobile,
  isMobileSmall,
  defaultDimensions,
}: DoubleSidedCardProps) {
  const sizeScale = isMobileSmall ? 0.6 : isMobile ? 0.8 : 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const imageStyle = {
    '--width': card.width || defaultDimensions.width,
    '--height': card.height || defaultDimensions.height,
    '--size-scale': sizeScale,
  } as CSSProperties;

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !isMobile) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveIndex(newIndex);
  }, [isMobile]);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: index * width, behavior: 'smooth' });
  }, []);

  const cardContent = (side: 'front' | 'back') => (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
        {side === 'front' ? 'FRONT' : 'BACK'}
      </span>
      <Image
        data-slot={side === 'front' ? 'card-image' : undefined}
        src={side === 'front' ? card.src : card.srcBack || card.src}
        alt={`${card.name} - ${side === 'front' ? 'Front' : 'Back'}`}
        width={card.width || defaultDimensions.width}
        height={card.height || defaultDimensions.height}
        priority
        loading="eager"
        style={imageStyle}
        className={cn(
          'pointer-events-none h-auto w-[calc(var(--size-scale)*var(--width)*1px)] object-contain object-center drop-shadow transition-all duration-200',
        )}
      />
    </div>
  );

  // Desktop: side-by-side layout
  if (!isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-start gap-4"
      >
        {cardContent('front')}
        {cardContent('back')}
      </motion.div>
    );
  }

  // Mobile: horizontal swipe carousel with centered cards
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onScroll={handleScroll}
        className="flex w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-full shrink-0 snap-center justify-center">
          {cardContent('front')}
        </div>
        <div className="flex w-full shrink-0 snap-center justify-center">
          {cardContent('back')}
        </div>
      </motion.div>

      <div className="flex items-center gap-2">
        {[0, 1].map((index) => (
          <button
            key={index}
            type="button"
            aria-label={index === 0 ? 'View front' : 'View back'}
            onClick={() => scrollToIndex(index)}
            className={cn(
              'size-2 rounded-full transition-colors',
              activeIndex === index ? 'bg-stone-600' : 'bg-stone-300',
            )}
          />
        ))}
      </div>
    </div>
  );
}
