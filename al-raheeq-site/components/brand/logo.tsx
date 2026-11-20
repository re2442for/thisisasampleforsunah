import { cn } from '@/lib/utils'

type Tone = 'primary' | 'inverse'

const palette: Record<Tone, { dome: string; gold: string }> = {
  primary: { dome: '#0f4c3a', gold: '#b48a3c' },
  inverse: { dome: '#f7f3ea', gold: '#d2aa5c' },
}

export function LogoMark({ tone = 'primary', className }: { tone?: Tone; className?: string }) {
  const { dome, gold } = palette[tone]
  return (
    <svg viewBox="30 20 925 580" className={className} aria-hidden="true" focusable="false">
      <path d="M447 34 a25 25 0 0 0 50 0 a19 19 0 0 1 -50 0 Z" fill={gold} />
      <rect x="457" y="80" width="30" height="38" rx="5" fill={dome} />
      <path d="M95 440 A380 305 0 0 1 855 440" fill="none" stroke={dome} strokeWidth="82" />
      <path d="M40 450 H945 L870 500 H95 V562 L40 592 Z" fill={gold} />
    </svg>
  )
}

export function Logo({
  tone = 'primary',
  className,
  withTagline = false,
}: {
  tone?: Tone
  className?: string
  withTagline?: boolean
}) {
  const textColor = tone === 'primary' ? 'text-primary' : 'text-primary-foreground'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark tone={tone} className="h-9 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn('font-heading text-2xl font-extrabold', textColor)}>أسوتنا</span>
        {withTagline && (
          <span className={cn('mt-1 text-[11px]', tone === 'primary' ? 'text-muted-foreground' : 'text-gold-light')}>
            سِراج السيرة النبوية
          </span>
        )}
      </span>
    </span>
  )
}

export function LogoStacked({ tone = 'primary', className }: { tone?: Tone; className?: string }) {
  const textColor = tone === 'primary' ? 'text-primary' : 'text-primary-foreground'
  return (
    <span className={cn('inline-flex flex-col items-center', className)} role="img" aria-label="شعار أسوتنا">
      <LogoMark tone={tone} className="w-40 md:w-48" />
      <span className={cn('-mt-1 font-heading text-6xl font-extrabold md:text-7xl', textColor)} aria-hidden="true">
        أسوتنا
      </span>
    </span>
  )
}
