import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#e7e5e4',
};

export const metadata: Metadata = {
  title: 'AnyDayCard / Digital Stamp Collection',
  description:
    'A digital stamp collection exploring the blend of art, history, and typography.',
};

export default function StampsLayout({ children }: { children: React.ReactNode }) {
  return <div className="stamps-layout">{children}</div>;
}
