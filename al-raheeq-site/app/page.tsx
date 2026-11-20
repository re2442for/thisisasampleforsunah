import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { StagesReader } from '@/components/sections/stages-reader'
import { Stories } from '@/components/sections/stories'
import { MapsSection } from '@/components/sections/maps-section'
import { MedicineMenu } from '@/components/sections/medicine-menu'
import { LogoMark } from '@/components/brand/logo'
import { StarPattern } from '@/components/brand/star-pattern'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StagesReader />
        <Stories />
        <MapsSection />
        <MedicineMenu />
      </main>
      <footer className="relative isolate overflow-hidden bg-primary px-4 py-12 text-center text-primary-foreground">
        <StarPattern opacity={0.08} className="-z-10" />
        <LogoMark tone="inverse" className="mx-auto mb-5 h-12 w-auto" />
        <p className="font-quran text-2xl leading-loose md:text-3xl">
          {'﴿لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ﴾'}
        </p>
        <p className="mt-1 text-xs text-gold-light">سورة الأحزاب: ٢١</p>
        <p className="mt-5 text-sm text-primary-foreground/70">
          المحتوى ملخص من كتاب الرحيق المختوم للشيخ صفي الرحمن المباركفوري رحمه الله
        </p>
      </footer>
    </>
  )
}
