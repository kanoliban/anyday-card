import Card from './Card';

const customizationOptions = [
  'Your message',
  'Envelope color',
  'Gift wrapping',
  'Handwritten note',
  'Custom text',
  'Photo insert',
  'Gift card',
];

export { CustomizationCard as ToolsCard };

export default function CustomizationCard() {
  return (
    <Card>
      <div className="flex h-full flex-col gap-8">
        <div className="flex justify-between">
          <span className="text-text-secondary">Make it yours</span>
        </div>
        <div className="relative h-56 overflow-hidden text-[2.5rem] leading-[1.2] md:h-[calc(3.5rem*5)] md:text-[3rem] md:leading-14 xl:h-56">
          <div className="track animate-[carousel-vertical_10s_linear_infinite]">
            {customizationOptions.concat(customizationOptions).map((t, i) => (
              <div key={i} className="font-archivo font-medium text-text-primary">
                {t}
              </div>
            ))}
          </div>
          <div className="absolute top-0 h-[100px] w-full [background:var(--panel-blend-layer)]" />
          <div className="absolute -bottom-px h-[100px] w-full rotate-180 [background:var(--panel-blend-layer)]" />
        </div>
        <p className="mt-auto leading-7 text-text-secondary">
          Personalize your card with a custom message inside. Choose from premium envelope colors
          and add gift wrapping for that extra special touch. Coming soon: handwritten notes.
        </p>
      </div>
    </Card>
  );
}
