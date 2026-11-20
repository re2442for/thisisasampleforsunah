import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Amiri, Amiri_Quran, Aref_Ruqaa, IBM_Plex_Sans_Arabic, Tajawal } from 'next/font/google'
import './globals.css'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
})

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

const amiriQuran = Amiri_Quran({
  subsets: ['arabic'],
  weight: '400',
  variable: '--font-amiri-quran',
})

const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-ruqaa',
})

const plex = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plex',
})

export const metadata: Metadata = {
  title: 'أسوتنا | سِراج السيرة النبوية',
  description:
    'أسوتنا: رحلة تفاعلية في السيرة النبوية مستندة إلى كتاب الرحيق المختوم. مراحل السيرة مع قراءة الكتاب، والقصص والعبر، وخرائط الأماكن قديمًا وحديثًا، والطب النبوي.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0f4c3a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${amiri.variable} ${amiriQuran.variable} ${arefRuqaa.variable} ${plex.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
