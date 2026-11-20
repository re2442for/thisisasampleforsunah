import { Logo } from '@/components/brand/logo'

const links = [
  { href: '#stages', label: 'مراحل السيرة' },
  { href: '#stories', label: 'القصص والعبر' },
  { href: '#maps', label: 'الخرائط' },
  { href: '#medicine', label: 'الطب النبوي' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <a href="#top" aria-label="أسوتنا، الصفحة الرئيسية">
          <Logo withTagline />
        </a>
        <nav aria-label="أقسام الموقع" className="-mx-1 overflow-x-auto">
          <ul className="flex items-center gap-1 whitespace-nowrap">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
