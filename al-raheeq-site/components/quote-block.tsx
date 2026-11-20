import type { Quote } from '@/lib/data/stages'

const labels: Record<Quote['kind'], string> = {
  quran: 'قال تعالى',
  hadith: 'من الأثر',
  dua: 'من الدعاء',
}

export function QuoteBlock({ quote }: { quote: Quote }) {
  if (quote.kind === 'quran') {
    return (
      <figure className="rounded-xl border border-primary/15 bg-primary/5 px-5 py-6 text-center">
        <figcaption className="mb-3 text-xs text-muted-foreground">{labels.quran}</figcaption>
        <blockquote className="font-quran text-2xl leading-[2.2] text-primary md:text-3xl">
          {'﴿'}
          {quote.text}
          {'﴾'}
        </blockquote>
        <p className="mt-2 text-xs text-accent">{quote.source}</p>
      </figure>
    )
  }

  return (
    <figure className="border-r-4 border-accent bg-accent/10 py-4 pr-5 pl-4">
      <figcaption className="mb-2 text-xs text-muted-foreground">{labels[quote.kind]}</figcaption>
      <blockquote className="font-serif text-xl leading-loose text-foreground">
        {'«'}
        {quote.text}
        {'»'}
      </blockquote>
      <p className="mt-2 text-xs text-accent">{quote.source}</p>
    </figure>
  )
}
