import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Your Card | AnyDayCard',
};

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  // Full-screen layout without footer
  return <>{children}</>;
}
