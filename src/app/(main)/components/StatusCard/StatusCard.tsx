'use client';

import { Package, Truck, Download, Globe } from 'lucide-react';

import CardTitle from '~/src/components/ui/CardTitle';

import Card from '../Card';

type ShippingOption = {
  icon: typeof Package;
  title: string;
  time: string;
  description: string;
};

const shippingOptions: ShippingOption[] = [
  {
    icon: Package,
    title: 'Production',
    time: '1-2 days',
    description: 'Printed and packed with care',
  },
  {
    icon: Truck,
    title: 'US Shipping',
    time: '3-5 days',
    description: 'Free on orders over $25',
  },
  {
    icon: Download,
    title: 'Digital',
    time: 'Instant',
    description: 'Download immediately after purchase',
  },
  {
    icon: Globe,
    title: 'International',
    time: '7-14 days',
    description: 'We ship worldwide',
  },
];

export { ShippingInfoCard as StatusCard };

export default function ShippingInfoCard() {
  return (
    <Card>
      <div className="flex h-full flex-col justify-between gap-5">
        <CardTitle variant="mono">Shipping & Delivery</CardTitle>
        <div className="space-y-3">
          {shippingOptions.map((option) => (
            <div
              key={option.title}
              className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-stone-50"
            >
              <option.icon className="size-4 shrink-0 text-theme-1" />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-text-primary">{option.title}</span>
                  <span className="text-xs text-text-primary/60">{option.description}</span>
                </div>
                <span className="text-sm font-medium text-theme-1">{option.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
