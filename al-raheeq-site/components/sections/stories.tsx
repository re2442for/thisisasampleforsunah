'use client'

import { useState } from 'react'
import { Lightbulb } from 'lucide-react'
import { stories } from '@/lib/data/stories'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

export function Stories() {
  const [flipped, setFlipped] = useState<string | null>(null)

  return (
    <section id="stories" className="scroll-mt-20 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="قصص وعبر"
          title="مواقف من السيرة"
          description="اقرأ القصة، ثم اضغط على «العبر المستفادة» لتقلب البطاقة وتتأمل الدروس."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => {
            const showLessons = flipped === story.id
            return (
              <li
                key={story.id}
                className={cn(
                  'flex flex-col rounded-2xl border p-6 transition',
                  showLessons ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card',
                )}
              >
                <span className={cn('mb-2 text-xs', showLessons ? 'text-accent' : 'text-accent')}>{story.stage}</span>
                <h3 className="mb-3 font-serif text-2xl font-bold">{story.title}</h3>
                {showLessons ? (
                  <ul className="flex flex-1 flex-col gap-3">
                    {story.lessons.map((lesson) => (
                      <li key={lesson} className="flex gap-2 leading-relaxed">
                        <Lightbulb aria-hidden className="mt-1 size-4 shrink-0 text-accent" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="flex-1 leading-loose text-foreground/80">{story.story}</p>
                )}
                <button
                  onClick={() => setFlipped(showLessons ? null : story.id)}
                  aria-pressed={showLessons}
                  className={cn(
                    'mt-5 self-start rounded-full px-4 py-2 text-sm font-medium transition',
                    showLessons
                      ? 'bg-primary-foreground/15 hover:bg-primary-foreground/25'
                      : 'bg-secondary text-primary hover:bg-accent/20',
                  )}
                >
                  {showLessons ? 'العودة إلى القصة' : 'العبر المستفادة'}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
