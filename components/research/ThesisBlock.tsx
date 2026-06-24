import { cn } from '@/lib/utils'

interface ThesisBlockProps {
  thesis: string
  version: number
  className?: string
}

export default function ThesisBlock({ thesis, version, className }: ThesisBlockProps) {
  return (
    <div
      className={cn(
        'border-l-4 border-navy bg-navy-light rounded-r-sm px-6 py-5',
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-navy/70 mb-3">
        Working Thesis (v{version})
      </p>
      <blockquote className="font-serif text-base leading-relaxed text-ink italic">
        {thesis}
      </blockquote>
      <p className="mt-3 text-xs text-muted">
        This thesis evolves as research progresses.
      </p>
    </div>
  )
}
