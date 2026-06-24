import Badge, { type BadgeVariant } from '@/components/ui/Badge'

const STATUS_VARIANT: Record<string, BadgeVariant> = {
  active: 'success',
  completed: 'info',
  planned: 'neutral',
  paused: 'neutral',
  stub: 'muted',
  draft: 'warning',
  superseded: 'muted',
  published: 'info',
}

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  completed: 'Completed',
  planned: 'Planned',
  paused: 'Paused',
  stub: 'Pending',
  draft: 'Draft',
  superseded: 'Superseded',
  published: 'Published',
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      label={STATUS_LABEL[status] ?? status}
      variant={STATUS_VARIANT[status] ?? 'default'}
      className={className}
    />
  )
}
