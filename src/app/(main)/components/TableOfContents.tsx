'use client';

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <nav className="mb-12 border-b border-panel-border pb-8">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-muted">
        Contents
      </h2>
      <ol className="space-y-2">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="flex items-baseline gap-3 text-text-secondary transition-colors hover:text-theme-1"
            >
              <span className="min-w-[1.5rem] font-mono text-sm text-text-muted">{index + 1}.</span>
              <span>{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
