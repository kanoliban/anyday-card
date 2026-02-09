'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      disableTransitionOnChange
      // Keep light-only until all hardcoded light surfaces are tokenized.
      defaultTheme="light"
      enableSystem={false}
      storageKey="adc-theme"
      value={{
        light: 'theme-light',
        dark: 'theme-dark',
      }}
      attribute="class"
    >
      {children}
    </NextThemeProvider>
  );
}
