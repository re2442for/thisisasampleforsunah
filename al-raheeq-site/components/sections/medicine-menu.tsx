'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, X } from 'lucide-react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { foods, type Food } from '@/lib/data/foods'
import { SectionHeading } from '@/components/section-heading'

export function MedicineMenu() {
  const [selected, setSelected] = useState<Food | null>(null)

  return (
    <section id="medicine" className="scroll-mt-20 bg-secondary/50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="قائمة الطب النبوي"
          title="من هدي النبي ﷺ في الغذاء والتداوي"
          description="اضغط على أي صنف لتكبير صورته والاطلاع على الحديث الوارد فيه وفوائده وطريقة استعماله."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <li key={food.id}>
              <button
                onClick={() => setSelected(food)}
                className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-right transition hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={food.image}
                    alt={food.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-primary">{food.name}</h3>
                    <p className="text-sm text-muted-foreground">{food.tagline}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs text-primary">التفاصيل</span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          تنبيه: المعلومات للثقافة العامة، ولا تغني عن استشارة الطبيب المختص خاصة لأصحاب الأمراض المزمنة.
        </p>
      </div>

      <DialogPrimitive.Root open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <DialogPrimitive.Popup
            dir="rtl"
            className="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-card text-card-foreground shadow-2xl transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0"
          >
            {selected && (
              <>
                <div className="relative aspect-[16/9] w-full">
                  <Image src={selected.image} alt={selected.name} fill sizes="768px" className="object-cover" />
                  <DialogPrimitive.Close
                    aria-label="إغلاق"
                    className="absolute top-3 left-3 rounded-full bg-card/90 p-2 text-foreground shadow transition hover:bg-card"
                  >
                    <X className="size-5" />
                  </DialogPrimitive.Close>
                </div>
                <div className="flex flex-col gap-5 p-6 md:p-8">
                  <div>
                    <DialogPrimitive.Title className="font-serif text-3xl font-bold text-primary">
                      {selected.name}
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-muted-foreground">
                      {selected.tagline}
                    </DialogPrimitive.Description>
                  </div>
                  <blockquote className="rounded-xl border-r-4 border-accent bg-secondary/60 p-4">
                    <p className="font-serif text-xl leading-loose">{selected.hadith}</p>
                    <cite className="mt-2 block text-sm text-muted-foreground not-italic">{selected.source}</cite>
                  </blockquote>
                  <div>
                    <h4 className="mb-3 font-semibold">المميزات والفوائد</h4>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {selected.benefits.map((b) => (
                        <li key={b} className="flex gap-2 rounded-lg bg-background p-3 text-sm leading-relaxed">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-primary p-4 text-primary-foreground">
                    <h4 className="mb-1 font-semibold text-accent">طريقة الاستعمال</h4>
                    <p className="leading-relaxed">{selected.usage}</p>
                  </div>
                </div>
              </>
            )}
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  )
}
