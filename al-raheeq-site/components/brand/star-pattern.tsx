import { useId } from 'react'
import { cn } from '@/lib/utils'

const STAR_PATH =
  'M50 8 L62 38 L92 50 L62 62 L50 92 L38 62 L8 50 L38 38 Z M20.3 20.3 L50 32.6 L79.7 20.3 L67.4 50 L79.7 79.7 L50 67.4 L20.3 79.7 L32.6 50 Z'

export function Star8({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <rect x="22" y="22" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="7" />
      <rect
        x="22"
        y="22"
        width="56"
        height="56"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        transform="rotate(45 50 50)"
      />
    </svg>
  )
}

export function StarPattern({ className, opacity = 0.14 }: { className?: string; opacity?: number }) {
  const id = useId()
  return (
    <svg className={cn('pointer-events-none absolute inset-0 size-full', className)} aria-hidden="true">
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <g transform="scale(0.72)" fill="none" stroke="#d2aa5c" strokeWidth="1.6">
            <path d={STAR_PATH} />
            <path d="M0 0 L8 50 L0 100 M100 0 L92 50 L100 100 M0 0 L50 8 L100 0 M0 100 L50 92 L100 100" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  )
}
