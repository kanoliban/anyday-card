'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';

import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

type Testimonial = {
  quote: string;
  author: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    quote: 'The card quality exceeded my expectations. The paper feels luxurious.',
    author: 'Sarah M.',
    location: 'Portland, OR',
  },
  {
    quote: 'Perfect for last-minute gifts. Digital download was instant!',
    author: 'James K.',
    location: 'Austin, TX',
  },
  {
    quote: 'Finally, cards that feel personal and not mass-produced.',
    author: 'Emily R.',
    location: 'Brooklyn, NY',
  },
];

export default function TestimonialsCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[activeIndex];

  return (
    <Card className="">
      <div className="flex flex-col justify-between gap-5">
        <div className="flex items-center justify-between">
          <CardTitle variant="mono">What people say</CardTitle>
          <Quote className="size-4 text-theme-1" />
        </div>
        <div className="min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm leading-5 text-text-primary italic">"{testimonial.quote}"</p>
              <p className="mt-2 text-xs text-text-primary/60">
                — {testimonial.author}, {testimonial.location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i === activeIndex ? 'bg-theme-1' : 'bg-stone-200 hover:bg-stone-300'
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export { TestimonialsCard as NotesCard };
