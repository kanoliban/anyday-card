'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

import { cn } from '~/src/util';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  rows?: number;
};

export default function TextareaInput({
  value,
  onChange,
  placeholder = 'Type here...',
  className,
  autoFocus,
  rows = 4,
}: Props) {
  const id = useId();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('w-full', className)}
    >
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={rows}
        className={cn(
          'w-full resize-none rounded-xl border border-stone-300 bg-white px-4 py-3 text-lg text-stone-800',
          'placeholder:text-stone-400',
          'focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200',
          'transition-colors'
        )}
      />
    </motion.div>
  );
}
