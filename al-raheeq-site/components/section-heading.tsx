export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mb-10 flex flex-col items-center gap-3 text-center">
      <span className="text-sm font-medium tracking-wide text-accent">{eyebrow}</span>
      <h2 className="font-serif text-4xl font-bold text-balance text-primary md:text-5xl">{title}</h2>
      <div aria-hidden className="flex items-center gap-2 text-accent">
        <span className="h-px w-10 bg-accent/60" />
        <span className="size-1.5 rotate-45 bg-accent" />
        <span className="h-px w-10 bg-accent/60" />
      </div>
      <p className="max-w-2xl leading-relaxed text-pretty text-muted-foreground">{description}</p>
    </div>
  )
}
