import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { StagesTimeline } from '@/components/sections/stages-timeline'
import { BookReader } from '@/components/sections/book-reader'
import { Stories } from '@/components/sections/stories'
import { MapsSection } from '@/components/sections/maps-section'
import { MedicineMenu } from '@/components/sections/medicine-menu'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StagesTimeline />
        <BookReader />
        <Stories />
        <MapsSection />
        <MedicineMenu />
      </main>
      <footer className="border-t border-border bg-primary px-4 py-10 text-center text-primary-foreground">
        <p className="font-serif text-2xl">﴿لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ﴾</p>
        <p className="mt-3 text-sm text-primary-foreground/70">
          المحتوى ملخص من كتاب الرحيق المختوم للشيخ صفي الرحمن المباركفوري رحمه الله
        </p>
      </footer>
    </>
  )
}
