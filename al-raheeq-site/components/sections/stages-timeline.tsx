'use client'

import { useState } from 'react'
import { stages } from '@/lib/data/stages'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

export function StagesTimeline() {
  const [activeId, setActiveId] = useState(stages[0].id)
  const [openEvent, setOpenEvent] = useState(0)
  const active = stages.find((s) => s.id === activeId) ?? stages[0]
  const activeIndex = stages.indexOf(active)

  return (
    <section id="stages" className="scroll-mt-20 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="الخط الزمني"
          title="مراحل السيرة النبوية"
          description="اختر مرحلة لتعرض أبرز أحداثها، ثم اضغط على أي حدث لقراءة تفاصيله."
        />

        <div role="tablist" aria-label="مراحل السيرة" className="relative mb-10">
          <div aria-hidden className="absolute inset-x-6 top-5 hidden h-0.5 bg-border md:block" />
          <ol className="relative grid grid-cols-2 gap-3 md:grid-cols-6">
            {stages.map((stage, i) => {
              const isActive = stage.id === activeId
              return (
                <li key={stage.id}>
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="stage-panel"
                    onClick={() => {
                      setActiveId(stage.id)
                      setOpenEvent(0)
                    }}
                    className="group flex w-full flex-col items-center gap-2 rounded-xl p-2 text-center"
                  >
                    <span
                      className={cn(
                        'flex size-10 items-center justify-center rounded-full border-2 font-serif text-lg font-bold transition',
                        isActive
                          ? 'border-primary bg-primary text-primary-foreground'
                          : i < activeIndex
                            ? 'border-primary bg-card text-primary'
                            : 'border-border bg-card text-muted-foreground group-hover:border-accent',
                      )}
                    >
                      {(i + 1).toLocaleString('ar-EG')}
                    </span>
                    <span
                      className={cn(
                        'text-sm leading-snug font-medium',
                        isActive ? 'text-primary' : 'text-foreground/70',
                      )}
                    >
                      {stage.title}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div
          id="stage-panel"
          role="tabpanel"
          className="grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-5 md:p-8"
        >
          <div className="flex flex-col gap-3 md:col-span-2">
            <span className="text-sm text-accent">{active.period}</span>
            <h3 className="font-serif text-3xl font-bold text-primary">{active.title}</h3>
            <p className="leading-loose text-foreground/80">{active.intro}</p>
            <div className="mt-auto flex gap-2 pt-4">
              <button
                disabled={activeIndex === 0}
                onClick={() => {
                  setActiveId(stages[activeIndex - 1].id)
                  setOpenEvent(0)
                }}
                className="rounded-full border border-border px-4 py-2 text-sm transition hover:bg-secondary disabled:opacity-40"
              >
                المرحلة السابقة
              </button>
              <button
                disabled={activeIndex === stages.length - 1}
                onClick={() => {
                  setActiveId(stages[activeIndex + 1].id)
                  setOpenEvent(0)
                }}
                className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
              >
                المرحلة التالية
              </button>
            </div>
          </div>

          <ol className="relative flex flex-col gap-3 border-r-2 border-border pr-5 md:col-span-3">
            {active.events.map((event, i) => {
              const isOpen = openEvent === i
              return (
                <li key={event.title} className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      'absolute top-4 -right-[27px] size-3 rounded-full border-2 border-card',
                      isOpen ? 'bg-accent' : 'bg-border',
                    )}
                  />
                  <button
                    aria-expanded={isOpen}
                    onClick={() => setOpenEvent(isOpen ? -1 : i)}
                    className={cn(
                      'w-full rounded-xl border p-4 text-right transition',
                      isOpen ? 'border-accent/60 bg-secondary/60' : 'border-transparent hover:bg-secondary/40',
                    )}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold text-foreground">{event.title}</span>
                      <span className="text-xs text-muted-foreground">{event.date}</span>
                    </div>
                    {isOpen && <p className="mt-2 leading-loose text-foreground/80">{event.summary}</p>}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
