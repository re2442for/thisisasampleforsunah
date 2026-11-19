'use client'

import { useMemo, useState } from 'react'
import { BookOpen, Bookmark, BookmarkCheck, Minus, Plus, Search } from 'lucide-react'
import { chapters } from '@/lib/data/chapters'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const fontSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl']

export function BookReader() {
  const [index, setIndex] = useState(0)
  const [fontStep, setFontStep] = useState(1)
  const [query, setQuery] = useState('')
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [read, setRead] = useState<string[]>([chapters[0].id])

  const chapter = chapters[index]
  const progress = Math.round((read.length / chapters.length) * 100)

  const filtered = useMemo(() => {
    const q = query.trim()
    if (!q) return chapters
    return chapters.filter(
      (c) => c.title.includes(q) || c.paragraphs.some((p) => p.includes(q)) || c.part.includes(q),
    )
  }, [query])

  function goTo(i: number) {
    setIndex(i)
    const id = chapters[i].id
    setRead((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  function toggleBookmark(id: string) {
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]))
  }

  const isBookmarked = bookmarks.includes(chapter.id)

  return (
    <section id="book" className="scroll-mt-20 bg-secondary/50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="تحويل الكتاب إلى برنامج"
          title="اقرأ الرحيق المختوم"
          description="ملخصات مرتبة لفصول الكتاب مع فهرس وبحث وعلامات مرجعية وتكبير للخط ومتابعة لتقدمك في القراءة."
        />

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 lg:sticky lg:top-24 lg:self-start">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تقدم القراءة</span>
                <span className="font-semibold text-primary">{progress}%</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-secondary"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="تقدم القراءة"
              >
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <label className="relative block">
              <span className="sr-only">ابحث في الفصول</span>
              <Search aria-hidden className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث في الكتاب..."
                className="w-full rounded-lg border border-input bg-background py-2 pr-9 pl-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </label>

            <nav aria-label="فهرس الفصول" className="max-h-[420px] overflow-y-auto">
              <ol className="flex flex-col gap-1">
                {filtered.map((c) => {
                  const i = chapters.indexOf(c)
                  const isActive = i === index
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => goTo(i)}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-right text-sm transition',
                          isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary',
                        )}
                      >
                        <span
                          className={cn(
                            'flex size-6 shrink-0 items-center justify-center rounded-full text-xs',
                            isActive
                              ? 'bg-primary-foreground/20'
                              : read.includes(c.id)
                                ? 'bg-accent/25 text-foreground'
                                : 'bg-secondary text-muted-foreground',
                          )}
                        >
                          {(i + 1).toLocaleString('ar-EG')}
                        </span>
                        <span className="flex-1 leading-snug">{c.title}</span>
                        {bookmarks.includes(c.id) && <BookmarkCheck aria-label="محفوظ" className="size-4 shrink-0" />}
                      </button>
                    </li>
                  )
                })}
                {filtered.length === 0 && (
                  <li className="px-3 py-4 text-center text-sm text-muted-foreground">لا توجد نتائج</li>
                )}
              </ol>
            </nav>
          </aside>

          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen aria-hidden className="size-4 text-accent" />
                <span>{chapter.part}</span>
                <span aria-hidden>·</span>
                <span>
                  الفصل {(index + 1).toLocaleString('ar-EG')} من {chapters.length.toLocaleString('ar-EG')}
                </span>
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
                  onClick={() => toggleBookmark(chapter.id)}
                  aria-pressed={isBookmarked}
                  className={cn(
                    'mr-2 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition',
                    isBookmarked ? 'border-accent bg-accent/15 text-foreground' : 'border-border hover:bg-secondary',
                  )}
                >
                  {isBookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                  {isBookmarked ? 'محفوظ' : 'حفظ علامة'}
                </button>
              </div>
            </div>

            <h3 className="mb-6 font-serif text-3xl font-bold text-primary md:text-4xl">{chapter.title}</h3>
            <div className={cn('flex flex-col gap-5 leading-loose text-foreground/90', fontSizes[fontStep])}>
              {chapter.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-5">
              <h4 className="mb-3 font-semibold text-foreground">أبرز النقاط</h4>
              <ul className="flex flex-col gap-2">
                {chapter.keyPoints.map((point) => (
                  <li key={point} className="flex gap-2 leading-relaxed text-foreground/85">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                className="rounded-full border border-border px-5 py-2 text-sm transition hover:bg-secondary disabled:opacity-40"
              >
                الفصل السابق
              </button>
              <button
                onClick={() => goTo(index + 1)}
                disabled={index === chapters.length - 1}
                className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
              >
                الفصل التالي
              </button>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              هذه ملخصات تعليمية مستندة إلى كتاب «الرحيق المختوم» للشيخ صفي الرحمن المباركفوري رحمه الله، وننصح بالرجوع إلى الكتاب الأصلي للتفصيل.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
