import { LogoStacked } from '@/components/brand/logo'
import { StarPattern } from '@/components/brand/star-pattern'
import { places } from '@/lib/data/places'
import { stages } from '@/lib/data/stages'
import { chapters } from '@/lib/data/chapters'

const stats = [
  { value: stages.length, label: 'مراحل' },
  { value: chapters.length, label: 'فصلًا من الكتاب' },
  { value: places.length, label: 'موقعًا على الخريطة' },
  { value: 9, label: 'من الطب النبوي' },
]

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_28%,black_75%)]">
        <StarPattern opacity={0.16} />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 pt-16 pb-14 text-center md:pt-20">
        <LogoStacked tone="inverse" />
        <p className="font-ruqaa text-2xl text-gold-light md:text-3xl">سِراج السيرة النبوية</p>
        <h1 className="sr-only">أسوتنا: السيرة النبوية رحلة تفاعلية</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-pretty text-primary-foreground/85">
          {'رحلة تفاعلية في السيرة النبوية: تنقّل بين مراحل حياة النبي ﷺ، واقرأ من كتاب الرحيق المختوم، وتأمل القصص والعبر، واستكشف الأماكن كما كانت وكما هي اليوم.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#stages"
            className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition hover:bg-gold-light"
          >
            ابدأ الرحلة
          </a>
          <a
            href="#maps"
            className="rounded-full border border-primary-foreground/40 px-6 py-3 font-medium transition hover:bg-primary-foreground/10"
          >
            استكشف الخرائط
          </a>
        </div>
        <dl className="mt-6 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
              <dt className="text-sm text-primary-foreground/70">{stat.label}</dt>
              <dd className="font-heading text-3xl font-extrabold text-gold-light">{stat.value.toLocaleString('ar-EG')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
