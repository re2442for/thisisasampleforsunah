'use client'

import { useMemo, useState } from 'react'
import { BookOpen, Bookmark, BookmarkCheck, CalendarDays, Minus, Plus } from 'lucide-react'
import { stages, type SiraEvent, type Stage } from '@/lib/data/stages'
import { chapters, type Chapter } from '@/lib/data/chapters'
import { SectionHeading } from '@/components/section-heading'
import { QuoteBlock } from '@/components/quote-block'
import { cn } from '@/lib/utils'

type Entry =
  | { key: string; kind: 'event'; stage: Stage; event: SiraEvent }
  | { key: string; kind: 'chapter'; stage: Stage; chapter: Chapter }

const entries: Entry[] = stages.flatMap((stage) => [
  ...stage.events.map((event, i): Entry => ({ key: `${stage.id}:e${i}`, kind: 'event', stage, event })),
  ...stage.chapterIds
    .map((id) => chapters.find((c) => c.id === id))
    .filter((c): c is Chapter => Boolean(c))
    .map((chapter): Entry => ({ key: `${stage.id}:c-${chapter.id}`, kind: 'chapter', stage, chapter })),
])

const fontSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl']

function entryTitle(entry: Entry) {
  return entry.kind === 'event' ? entry.event.title : entry.chapter.title
}

export function StagesReader() {
  const [currentKey, setCurrentKey] = useState(entries[0].key)
  const [read, setRead] = useState<string[]>([entries[0].key])
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [fontStep, setFontStep] = useState(1)

  const index = entries.findIndex((e) => e.key === currentKey)
  const current = entries[index]
  const stage = current.stage
  const stageIndex = stages.indexOf(stage)
  const stageEntries = useMemo(() => entries.filter((e) => e.stage.id === stage.id), [stage.id])
  const progress = Math.round((read.length / entries.length) * 100)
  const isBookmarked = bookmarks.includes(current.key)

  function goTo(key: string) {
    setCurrentKey(key)
    setRead((prev) => (prev.includes(key) ? prev : [...prev, key]))
  }

  function goToStage(id: string) {
    const first = entries.find((e) => e.stage.id === id)
    if (first) goTo(first.key)
  }

  const eventEntries = stageEntries.filter((e) => e.kind === 'event')
  const chapterEntries = stageEntries.filter((e) => e.kind === 'chapter')

  return (
    <section id="stages" className="scroll-mt-20 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="المراحل والكتاب في مكان واحد"
          title="مراحل السيرة النبوية"
          description="اختر مرحلة، ثم اقرأ أحداثها وما يقابلها من فصول كتاب الرحيق المختوم، مع الآيات والأحاديث المتصلة بكل حدث."
        />

        <div role="tablist" aria-label="مراحل السيرة" className="relative mb-8">
          <div aria-hidden className="absolute inset-x-8 top-5 hidden h-px bg-border md:block" />
          <ol className="relative grid grid-cols-3 gap-2 md:grid-cols-6">
            {stages.map((s, i) => {
              const isActive = s.id === stage.id
              return (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="stage-panel"
                    onClick={() => goToStage(s.id)}
                    className="group flex w-full flex-col items-center gap-2 rounded-xl p-2 text-center"
                  >
                    <span
                      className={cn(
                        'flex size-10 items-center justify-center rounded-full border-2 font-heading text-lg font-bold transition',
                        isActive
                          ? 'border-primary bg-primary text-primary-foreground'
                          : i < stageIndex
                            ? 'border-primary bg-card text-primary'
                            : 'border-border bg-card text-muted-foreground group-hover:border-accent',
                      )}
                    >
                      {(i + 1).toLocaleString('ar-EG')}
                    </span>
                    <span className={cn('text-sm leading-snug font-medium', isActive ? 'text-primary' : 'text-foreground/70')}>
                      {s.title}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div id="stage-panel" role="tabpanel" className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-accent">{stage.period}</span>
              <h3 className="font-heading text-2xl font-extrabold text-primary">{stage.title}</h3>
              <p className="font-serif text-lg leading-loose text-foreground/80">{stage.intro}</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تقدم القراءة</span>
                <span className="font-semibold text-primary">{progress.toLocaleString('ar-EG')}٪</span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-secondary"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="تقدم القراءة"
              >
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <nav aria-label={`محتوى مرحلة ${stage.title}`} className="flex flex-col gap-4">
              <EntryList
                heading="أحداث المرحلة"
                items={eventEntries}
                currentKey={current.key}
                read={read}
                bookmarks={bookmarks}
                onSelect={goTo}
              />
              {chapterEntries.length > 0 && (
                <EntryList
                  heading="من فصول الكتاب"
                  items={chapterEntries}
                  currentKey={current.key}
                  read={read}
                  bookmarks={bookmarks}
                  onSelect={goTo}
                  icon
                />
              )}
            </nav>
          </aside>

          <article className="rounded-2xl border border-border bg-card p-6 md:p-10" aria-live="polite">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                {current.kind === 'event' ? (
                  <>
                    <CalendarDays aria-hidden className="size-4 text-accent" />
                    <span>{stage.title}</span>
                    {current.event.group && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{current.event.group}</span>
                      </>
                    )}
                    <span aria-hidden>·</span>
                    <span>{current.event.date}</span>
                  </>
                ) : (
                  <>
                    <BookOpen aria-hidden className="size-4 text-accent" />
                    <span>الرحيق المختوم</span>
                    <span aria-hidden>·</span>
                    <span>{current.chapter.part}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFontStep((s) => Math.max(0, s - 1))}
                  aria-label="تصغير الخط"
                  className="rounded-md p-2 hover:bg-secondary disabled:opacity-40"
                  disabled={fontStep === 0}
                >
                  <Minus className="size-4" />
                </button>
                <span className="px-1 text-sm text-muted-foreground">حجم الخط</span>
                <button
                  onClick={() => setFontStep((s) => Math.min(fontSizes.length - 1, s + 1))}
                  aria-label="تكبير الخط"
                  className="rounded-md p-2 hover:bg-secondary disabled:opacity-40"
                  disabled={fontStep === fontSizes.length - 1}
                >
                  <Plus className="size-4" />
                </button>
                <button
                  onClick={() =>
                    setBookmarks((prev) =>
                      prev.includes(current.key) ? prev.filter((b) => b !== current.key) : [...prev, current.key],
                    )
                  }
                  aria-pressed={isBookmarked}
                  className={cn(
                    'mr-2 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition',
                    isBookmarked ? 'border-accent bg-accent/15' : 'border-border hover:bg-secondary',
                  )}
                >
                  {isBookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                  {isBookmarked ? 'محفوظ' : 'حفظ علامة'}
                </button>
              </div>
            </div>

            {stage.verse && current === stageEntries[0] && (
              <div className="mb-8">
                <QuoteBlock quote={stage.verse} />
              </div>
            )}

            <h3 className="mb-6 font-heading text-3xl font-extrabold text-primary md:text-4xl">{entryTitle(current)}</h3>

            <div className={cn('flex flex-col gap-6 font-serif leading-loose text-foreground/90', fontSizes[fontStep])}>
              {current.kind === 'event' ? (
                <>
                  <p>{current.event.summary}</p>
                  {current.event.details?.map((p) => <p key={p}>{p}</p>)}
                  {current.event.quotes?.map((q) => <QuoteBlock key={q.text} quote={q} />)}
                </>
              ) : (
                current.chapter.paragraphs.map((p) => <p key={p}>{p}</p>)
              )}
            </div>

            {current.kind === 'chapter' && (
              <div className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-5">
                <h4 className="mb-3 font-heading font-bold">أبرز النقاط</h4>
                <ul className="flex flex-col gap-2">
                  {current.chapter.keyPoints.map((point) => (
                    <li key={point} className="flex gap-2 leading-relaxed text-foreground/85">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between gap-3">
              <button
                onClick={() => goTo(entries[index - 1].key)}
                disabled={index === 0}
                className="rounded-full border border-border px-5 py-2 text-sm transition hover:bg-secondary disabled:opacity-40"
              >
                السابق
              </button>
              <span className="text-xs text-muted-foreground">
                {(index + 1).toLocaleString('ar-EG')} من {entries.length.toLocaleString('ar-EG')}
              </span>
              <button
                onClick={() => goTo(entries[index + 1].key)}
                disabled={index === entries.length - 1}
                className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
              >
                التالي
              </button>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              ملخصات تعليمية مستندة إلى كتاب «الرحيق المختوم» للشيخ صفي الرحمن المباركفوري رحمه الله، وننصح بالرجوع إلى الكتاب الأصلي للتفصيل.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function EntryList({
  heading,
  items,
  currentKey,
  read,
  bookmarks,
  onSelect,
  icon = false,
}: {
  heading: string
  items: Entry[]
  currentKey: string
  read: string[]
  bookmarks: string[]
  onSelect: (key: string) => void
  icon?: boolean
}) {
  let lastGroup: string | undefined
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold text-muted-foreground">{heading}</h4>
      <ol className="flex flex-col gap-1">
        {items.map((entry) => {
          const isActive = entry.key === currentKey
          const group = entry.kind === 'event' ? entry.event.group : undefined
          const showGroup = group && group !== lastGroup
          lastGroup = group
          return (
            <li key={entry.key}>
              {showGroup && <p className="mt-2 mb-1 px-3 font-ruqaa text-base text-accent">{group}</p>}
              <button
                onClick={() => onSelect(entry.key)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-right text-sm transition',
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary',
                )}
              >
                {icon ? (
                  <BookOpen aria-hidden className={cn('size-4 shrink-0', isActive ? '' : 'text-accent')} />
                ) : (
                  <span
                    aria-hidden
                    className={cn(
                      'size-2 shrink-0 rotate-45',
                      isActive ? 'bg-gold-light' : read.includes(entry.key) ? 'bg-accent' : 'bg-border',
                    )}
                  />
                )}
                <span className="flex-1 leading-snug">{entryTitle(entry)}</span>
                {bookmarks.includes(entry.key) && <BookmarkCheck aria-label="محفوظ" className="size-4 shrink-0" />}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
