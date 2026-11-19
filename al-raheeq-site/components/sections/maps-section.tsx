'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Route } from 'lucide-react'
import {
  categoryColors,
  categoryLabels,
  hijraRoute,
  places,
  type PlaceCategory,
} from '@/lib/data/places'
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
  { id: 'makkah', label: categoryLabels.makkah, center: [21.425, 39.835], zoom: 13 },
  { id: 'madinah', label: categoryLabels.madinah, center: [24.462, 39.612], zoom: 14 },
  { id: 'wells', label: categoryLabels.wells, center: [24.47, 39.6], zoom: 12 },
  { id: 'hijra', label: 'طريق الهجرة', center: [22.95, 39.4], zoom: 7 },
  { id: 'battles', label: categoryLabels.battles, center: [24.0, 38.9], zoom: 6 },
]

export function MapsSection() {
  const [view, setView] = useState<View>('makkah')
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
    setFocus({ center: place.coords, zoom: place.category === 'battles' ? 11 : 15 })
  }

  return (
    <section id="maps" className="scroll-mt-20 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="خرائط تفاعلية"
          title="أماكن السيرة على الخريطة"
          description="استكشف غار حراء ومنزل النبي ﷺ والآبار، وتتبع طريق الهجرة ومواقع الغزوات. اضغط على أي موقع لعرض تفاصيله."
        />

        <div role="tablist" aria-label="طبقات الخريطة" className="mb-5 flex flex-wrap justify-center gap-2">
          {views.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={view === v.id}
              onClick={() => changeView(v.id)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition',
                view === v.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:bg-secondary',
              )}
            >
              {v.id === 'hijra' ? (
                <Route aria-hidden className="size-4" />
              ) : (
                <span
                  aria-hidden
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: categoryColors[v.id] }}
                />
              )}
              {v.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="relative z-0 h-[460px] overflow-hidden rounded-2xl border border-border md:h-[560px]" dir="ltr">
            <SiraMap
              places={visible}
              selectedId={selectedId}
              showHijra={view === 'hijra'}
              focus={focus}
              onSelect={selectPlace}
            />
          </div>

          <aside className="flex flex-col gap-4">
            {selected ? (
              <div className="rounded-2xl border border-accent/50 bg-card p-5">
                <span className="text-xs font-medium" style={{ color: categoryColors[selected.category] }}>
                  {categoryLabels[selected.category]}
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-primary">{selected.name}</h3>
                <p className="text-sm text-accent">{selected.subtitle}</p>
                <p className="mt-3 leading-loose text-foreground/85">{selected.description}</p>
              </div>
            ) : view === 'hijra' ? (
              <div className="rounded-2xl border border-accent/50 bg-card p-5">
                <h3 className="font-serif text-2xl font-bold text-primary">طريق الهجرة</h3>
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
