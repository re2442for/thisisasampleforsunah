'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { History, MapPin, Route, Building2 } from 'lucide-react'
import { categoryColors, categoryLabels, hijraRoute, places, type PlaceCategory } from '@/lib/data/places'
import type { Era } from '@/components/map/sira-map'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const SiraMap = dynamic(() => import('@/components/map/sira-map'), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center bg-secondary text-muted-foreground">
      جارٍ تحميل الخريطة...
    </div>
  ),
})

type View = PlaceCategory | 'hijra'

const views: { id: View; label: string; center: [number, number]; zoom: number }[] = [
  { id: 'makkah', label: categoryLabels.makkah, center: [21.425, 39.845], zoom: 13 },
  { id: 'madinah', label: categoryLabels.madinah, center: [24.458, 39.612], zoom: 13 },
  { id: 'hijaz', label: categoryLabels.hijaz, center: [22.2, 39.9], zoom: 7 },
  { id: 'wells', label: categoryLabels.wells, center: [24.47, 39.6], zoom: 12 },
  { id: 'hijra', label: 'طريق الهجرة', center: [22.95, 39.4], zoom: 7 },
  { id: 'battles', label: categoryLabels.battles, center: [24.0, 38.9], zoom: 6 },
]

const eras: { id: Era; label: string; hint: string; Icon: typeof History }[] = [
  { id: 'then', label: 'الخريطة قديمًا', hint: 'تضاريس وأسماء زمن النبي ﷺ', Icon: History },
  { id: 'now', label: 'الخريطة حاليًا', hint: 'المعالم والعمران اليوم', Icon: Building2 },
]

export function MapsSection() {
  const [view, setView] = useState<View>('makkah')
  const [era, setEra] = useState<Era>('then')
  const [selectedId, setSelectedId] = useState<string | null>('hira')
  const [focus, setFocus] = useState({ center: views[0].center, zoom: views[0].zoom })

  const visible = useMemo(() => {
    if (view === 'hijra') return places.filter((p) => ['kaaba', 'thawr', 'quba', 'nabawi'].includes(p.id))
    return places.filter((p) => p.category === view)
  }, [view])

  const selected = places.find((p) => p.id === selectedId) ?? null

  function changeView(next: View) {
    const v = views.find((x) => x.id === next)!
    setView(next)
    setSelectedId(null)
    setFocus({ center: v.center, zoom: v.zoom })
  }

  function selectPlace(id: string) {
    const place = places.find((p) => p.id === id)
    if (!place) return
    setSelectedId(id)
    const zoom = place.category === 'battles' || place.category === 'hijaz' ? 11 : 15
    setFocus({ center: place.coords, zoom })
  }

  return (
    <section id="maps" className="scroll-mt-20 bg-secondary/50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="خرائط تفاعلية"
          title="أماكن السيرة قديمًا وحديثًا"
          description="كل موضع ورد في مراحل السيرة على الخريطة: قارن بين المكان كما كان في زمن النبي ﷺ وكما هو اليوم، وتتبع طريق الهجرة ومواقع الغزوات."
        />

        <div className="mb-5 flex flex-col items-center gap-4">
          <div role="radiogroup" aria-label="زمن الخريطة" className="inline-flex rounded-full border border-border bg-card p-1">
            {eras.map(({ id, label, Icon }) => (
              <button
                key={id}
                role="radio"
                aria-checked={era === id}
                onClick={() => setEra(id)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition',
                  era === id ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-primary',
                )}
              >
                <Icon aria-hidden className="size-4" />
                {label}
              </button>
            ))}
          </div>

          <div role="tablist" aria-label="طبقات الخريطة" className="flex flex-wrap justify-center gap-2">
            {views.map((v) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={view === v.id}
                onClick={() => changeView(v.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition',
                  view === v.id ? 'border-accent bg-accent/15 text-foreground' : 'border-border bg-card hover:bg-secondary',
                )}
              >
                {v.id === 'hijra' ? (
                  <Route aria-hidden className="size-4 text-accent" />
                ) : (
                  <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: categoryColors[v.id] }} />
                )}
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <div
            className={cn(
              'relative z-0 h-[460px] overflow-hidden rounded-2xl border md:h-[560px]',
              era === 'then' ? 'map-then border-accent/60' : 'map-now border-border',
            )}
            dir="ltr"
          >
            <SiraMap
              places={visible}
              selectedId={selectedId}
              showHijra={view === 'hijra'}
              era={era}
              focus={focus}
              onSelect={selectPlace}
            />
            {era === 'then' && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[400] shadow-[inset_0_0_90px_rgba(90,63,23,0.45)]"
              />
            )}
            <span
              dir="rtl"
              className="pointer-events-none absolute top-3 right-3 z-[500] rounded-full bg-card/90 px-3 py-1 text-xs text-foreground shadow-sm"
            >
              {eras.find((e) => e.id === era)!.hint}
            </span>
          </div>

          <aside className="flex flex-col gap-4">
            {selected ? (
              <div className="rounded-2xl border border-accent/50 bg-card p-5">
                <span className="text-xs font-medium" style={{ color: categoryColors[selected.category] }}>
                  {categoryLabels[selected.category]}
                </span>
                <h3 className="mt-1 font-heading text-2xl font-extrabold text-primary">
                  {era === 'then' && selected.oldName ? selected.oldName : selected.name}
                </h3>
                <p className="text-sm text-accent">{selected.subtitle}</p>
                <dl className="mt-4 flex flex-col gap-3">
                  <div className={cn('rounded-xl p-3 transition', era === 'then' ? 'bg-accent/15' : 'bg-secondary/60')}>
                    <dt className="mb-1 font-ruqaa text-base text-accent">في زمن النبي ﷺ</dt>
                    <dd className="font-serif text-lg leading-loose text-foreground/90">{selected.description}</dd>
                  </div>
                  <div className={cn('rounded-xl p-3 transition', era === 'now' ? 'bg-primary/10' : 'bg-secondary/60')}>
                    <dt className="mb-1 text-sm font-semibold text-primary">اليوم</dt>
                    <dd className="leading-relaxed text-foreground/85">{selected.today}</dd>
                  </div>
                </dl>
              </div>
            ) : view === 'hijra' ? (
              <div className="rounded-2xl border border-accent/50 bg-card p-5">
                <h3 className="font-heading text-2xl font-extrabold text-primary">طريق الهجرة</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  مسار تقريبي سلكه النبي ﷺ وأبو بكر بدلالة عبد الله بن أريقط عبر طريق الساحل.
                </p>
                <ol className="mt-4 flex flex-col gap-2">
                  {hijraRoute.map((stop, i) => (
                    <li key={stop.name} className="flex items-center gap-3 text-sm">
                      <span className="flex size-6 items-center justify-center rounded-full bg-accent/20 text-xs">
                        {(i + 1).toLocaleString('ar-EG')}
                      </span>
                      {stop.name}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card/60 p-5 text-center text-sm text-muted-foreground">
                اختر موقعًا من الخريطة أو من القائمة لعرض تفاصيله.
              </div>
            )}

            <ul className="flex max-h-[300px] flex-col gap-1.5 overflow-y-auto rounded-2xl border border-border bg-card p-2">
              {visible.map((place) => (
                <li key={place.id}>
                  <button
                    onClick={() => selectPlace(place.id)}
                    aria-current={place.id === selectedId ? 'true' : undefined}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-right text-sm transition',
                      place.id === selectedId ? 'bg-secondary' : 'hover:bg-secondary/60',
                    )}
                  >
                    <MapPin aria-hidden className="size-4 shrink-0" style={{ color: categoryColors[place.category] }} />
                    <span className="flex-1">{place.name}</span>
                    <span className="text-xs text-muted-foreground">{place.subtitle}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          المواقع تقريبية لأغراض تعليمية، وبعضها اندرس أو تغيرت معالمه مع الزمن.
        </p>
      </div>
    </section>
  )
}
