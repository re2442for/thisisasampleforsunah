const links = [
  { href: '#stages', label: 'مراحل السيرة' },
  { href: '#book', label: 'الكتاب' },
  { href: '#stories', label: 'القصص والعبر' },
  { href: '#maps', label: 'الخرائط' },
  { href: '#medicine', label: 'الطب النبوي' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-bold text-primary">الرحيق المختوم</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">السيرة التفاعلية</span>
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
