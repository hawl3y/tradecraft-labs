import Link from 'next/link'
import Badge, { type BadgeVariant } from '@/components/ui/Badge'
import { formatDateShort } from '@/lib/utils'
import type { JournalEntry as JournalEntryData } from '@/lib/content'

const CATEGORY_VARIANT: Record<string, BadgeVariant> = {
  milestone: 'success',
  reflection: 'info',
  update: 'warning',
  observation: 'neutral',
}

const CATEGORY_LABEL: Record<string, string> = {
  milestone: 'Milestone',
  reflection: 'Reflection',
  update: 'Update',
  observation: 'Observation',
}

interface JournalEntryProps {
  entry: JournalEntryData
}

export default function JournalEntry({ entry }: JournalEntryProps) {
  return (
    <article className="py-5 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3 mb-2">
        <time dateTime={entry.date} className="text-sm text-muted tabular-nums">
          {formatDateShort(entry.date)}
        </time>
        <Badge
          label={CATEGORY_LABEL[entry.category] ?? entry.category}
          variant={CATEGORY_VARIANT[entry.category] ?? 'default'}
        />
      </div>
      <Link href={entry.url} className="group">
        <h3 className="text-base font-medium text-ink group-hover:text-navy transition-colors duration-150 leading-snug mb-1.5">
          {entry.title}
        </h3>
      </Link>
      <p className="text-sm text-muted leading-relaxed line-clamp-2">
        {entry.summary}
      </p>
    </article>
  )
}
