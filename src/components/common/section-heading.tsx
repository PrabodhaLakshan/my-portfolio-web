export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl tracking-tight leading-tight">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">{description}</p>}
    </div>
  );
}
