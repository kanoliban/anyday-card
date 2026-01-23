'use client';

import { motion } from 'framer-motion';

import { cn } from '~/src/util';
import type { FormField } from '../../models';

type Props = {
  fields: FormField[];
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
  className?: string;
};

export default function FormInput({ fields, values, onChange, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex w-full flex-col gap-8', className)}
    >
      {fields.map((field, index) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex flex-col gap-3"
        >
          <label className="text-sm font-medium text-stone-600">
            {field.label}
            {field.required && <span className="ml-1 text-rose-500">*</span>}
          </label>

          {field.type === 'pills' && field.options && (
            <div className="flex flex-wrap gap-2">
              {field.options.map((option) => {
                const isSelected = values[field.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(field.id, option.value)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                      'focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2',
                      isSelected
                        ? 'border-stone-800 bg-stone-800 text-white'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50'
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}

          {field.type === 'text' && (
            <input
              type="text"
              value={values[field.id] ?? ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={cn(
                'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-800',
                'placeholder:text-stone-400',
                'focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200',
                'transition-colors'
              )}
            />
          )}

          {field.type === 'textarea' && (
            <textarea
              value={values[field.id] ?? ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className={cn(
                'w-full resize-none rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-800',
                'placeholder:text-stone-400',
                'focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-200',
                'transition-colors'
              )}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
