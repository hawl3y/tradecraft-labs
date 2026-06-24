import { cn } from '@/lib/utils'

type CalloutType = 'insight' | 'note' | 'warning'

const CALLOUT_STYLES: Record<CalloutType, string> = {
  insight: 'border-navy bg-navy-light text-navy',
  note:    'border-gray-300 bg-surface text-ink',
  warning: 'border-amber-400 bg-amber-50 text-amber-900',
}

const CALLOUT_LABEL: Record<CalloutType, string> = {
  insight: 'Insight',
  note:    'Note',
  warning: 'Warning',
}

interface CalloutProps {
  type?: CalloutType
  children: React.ReactNode
  className?: string
}

export default function Callout({ type = 'note', children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        'not-prose border-l-4 rounded-r-sm px-5 py-4 my-6',
        CALLOUT_STYLES[type],
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
        {CALLOUT_LABEL[type]}
      </p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
