'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, useState } from 'react';

import { InfoIcon } from '~/src/components/icons';
import CardTitle from '~/src/components/ui/CardTitle';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/src/components/ui/Tooltip';

import Card from './Card';

import './PantoneCard.css';

type PaperStock = {
  name: string;
  weight: string;
  texture: string;
  color: string;
};

const paperStocks: PaperStock[] = [
  { name: 'Cotton', weight: '110lb', texture: 'Textured', color: '#FAF9F6' },
  { name: 'Premium Smooth', weight: '120lb', texture: 'Smooth', color: '#FFFFFF' },
  { name: 'Linen', weight: '100lb', texture: 'Woven', color: '#F5F5F0' },
  { name: 'Velvet', weight: '110lb', texture: 'Soft-touch', color: '#FEFEFA' },
];

const slideLeftProps: Partial<ComponentProps<typeof motion.div>> = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: {
    duration: 0.3,
    type: 'tween',
    ease: 'easeInOut',
  },
};

export default function PaperStockCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStock = paperStocks[activeIndex];

  return (
    <Card containerClassName="z-3 pantone-card">
      <div className="flex min-h-[210px] w-full flex-col gap-3">
        <div
          className="flex-1 rounded-md border border-stone-200 transition-all duration-250"
          style={{ backgroundColor: activeStock.color }}
        />
        <div className="mb-2 flex gap-1">
          {paperStocks.map((stock, i) => (
            <button
              key={stock.name}
              onClick={() => setActiveIndex(i)}
              className={`h-2 flex-1 rounded-full transition-all ${
                i === activeIndex ? 'bg-theme-1' : 'bg-stone-200 hover:bg-stone-300'
              }`}
              aria-label={`View ${stock.name} paper stock`}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="text-text-primary"
                key={activeStock.name}
                {...slideLeftProps}
              >
                <CardTitle variant="mono" className="inline">
                  {activeStock.name}
                </CardTitle>{' '}
                <span className="text-sm">
                  {activeStock.weight} · {activeStock.texture}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <Tooltip>
            <TooltipTrigger className="rounded-full" aria-label="Paper stock information">
              <InfoIcon className="text-text-primary" />
            </TooltipTrigger>
            <TooltipContent className="w-[200px] text-center">
              All cards printed on premium archival paper for lasting quality.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}

export { PaperStockCard as PantoneCard };
