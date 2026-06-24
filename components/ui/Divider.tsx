import { cn } from '@/lib/utils'

interface DividerProps {
  label?: string
  className?: string
}

export default function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn('border-gray-200', className)} />
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <hr className="flex-1 border-gray-200" />
      <span className="text-xs font-medium uppercase tracking-widest text-muted">
        {label}
      </span>
      <hr className="flex-1 border-gray-200" />
    </div>
  )
}
