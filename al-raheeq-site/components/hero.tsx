import Image from 'next/image'

const stats = [
  { value: '6', label: 'مراحل' },
  { value: '12', label: 'فصلًا' },
  { value: '22', label: 'موقعًا على الخريطة' },
  { value: '9', label: 'من الطب النبوي' },
]

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src="/hero-desert.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/55 via-foreground/40 to-background" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pt-24 pb-16 text-center md:pt-32">
        <p className="rounded-full border border-background/40 bg-background/10 px-4 py-1 text-sm text-background backdrop-blur">
          مستند إلى كتاب الرحيق المختوم للشيخ صفي الرحمن المباركفوري
        </p>
        <h1 className="font-serif text-5xl leading-tight font-bold text-balance text-background md:text-7xl">
          السيرة النبوية
          <span className="block text-accent">رحلة تفاعلية</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-pretty text-background/90">
          تنقّل بين مراحل حياة النبي ﷺ، واقرأ الكتاب فصلًا فصلًا، وتأمل القصص والعبر، واستكشف الأماكن على الخريطة، وتعرّف على الطب النبوي.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#stages"
            className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            ابدأ الرحلة
          </a>
          <a
            href="#maps"
            className="rounded-full border border-background/50 bg-background/10 px-6 py-3 font-medium text-background backdrop-blur transition hover:bg-background/20"
          >
            استكشف الخرائط
          </a>
        </div>
        <dl className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card/90 p-4 backdrop-blur">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="font-serif text-3xl font-bold text-primary">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
