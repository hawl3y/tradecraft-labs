import { cn } from '@/lib/utils'

interface CitationBlockProps {
  children: React.ReactNode
  className?: string
}

export default function CitationBlock({ children, className }: CitationBlockProps) {
  return (
    <div
      className={cn(
        'not-prose border border-gray-200 rounded-sm bg-surface px-5 py-4',
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
        Citation
      </p>
      <p className="text-xs text-muted leading-relaxed font-mono">{children}</p>
    </div>
  )
}
