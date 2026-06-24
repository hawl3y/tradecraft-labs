import { cn } from '@/lib/utils'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'info' | 'neutral' | 'muted'

const variantClasses: Record<BadgeVariant, string> = {
  default:  'bg-gray-100 text-gray-700 border-gray-200',
  success:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning:  'bg-amber-50 text-amber-700 border-amber-200',
  info:     'bg-navy-light text-navy border-navy/20',
  neutral:  'bg-gray-100 text-gray-500 border-gray-200',
  muted:    'bg-gray-50 text-gray-400 border-gray-200',
}

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

export default function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium leading-none',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
