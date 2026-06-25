interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 space-y-3">
      <h2 className="text-4xl font-bold text-text-primary md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-tertiary max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
