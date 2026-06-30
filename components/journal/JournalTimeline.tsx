import Link from 'next/link'
import Badge, { type BadgeVariant } from '@/components/ui/Badge'
import type { JournalEntry } from '@/lib/content'
import { formatDateShort } from '@/lib/utils'
import { cn } from '@/lib/utils'

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

function getProjectFallbackLabel(projectSlug: string): string {
  const match = projectSlug.match(/^project-(\d+)/)
  return match ? `Project ${match[1]}` : projectSlug
}

interface JournalTimelineProps {
  entries: JournalEntry[]
  showProjectBadge?: boolean
  projectLabels?: Record<string, string>
  emptyMessage?: string
}

export default function JournalTimeline({
  entries,
  showProjectBadge = true,
  projectLabels = {},
  emptyMessage = 'No journal entries match the current filter.',
}: JournalTimelineProps) {
  if (entries.length === 0) {
    return (
      <p className="py-8 text-sm text-muted">{emptyMessage}</p>
    )
  }

  return (
    <div className="relative">
      {/* Continuous vertical line connecting all entries */}
      {entries.length > 1 && (
        <div
          className="absolute left-[6px] top-5 bottom-5 w-0.5 bg-gray-200"
          aria-hidden="true"
        />
      )}

      <ol role="list">
        {entries.map((entry) => {
          const projectLabel = projectLabels[entry.project] ?? getProjectFallbackLabel(entry.project)

          return (
            <li key={entry.slug} className="relative pl-9 pb-12 last:pb-0">
              {/* Timeline dot */}
              <div
                className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-background border-2 border-gray-300 z-10"
                aria-hidden="true"
              />

              {/* Date */}
              <time
                dateTime={entry.date}
                className="block text-sm text-muted mb-2.5"
              >
                {formatDateShort(entry.date)}
              </time>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge
                  label={CATEGORY_LABEL[entry.category] ?? entry.category}
                  variant={CATEGORY_VARIANT[entry.category] ?? 'default'}
                />
                {showProjectBadge && (
                  <Badge label={projectLabel} variant="info" />
                )}
              </div>

              {/* Title */}
              <Link href={entry.url} className="group">
                <h3 className="font-serif text-xl text-ink group-hover:text-navy transition-colors duration-150 leading-snug mb-2">
                  {entry.title}
                </h3>
              </Link>

              {/* Summary */}
              <p className="text-sm text-muted leading-relaxed mb-3 max-w-prose">
                {entry.summary}
              </p>

              {/* CTA */}
              <Link
                href={entry.url}
                className="text-sm text-navy hover:text-navy/70 transition-colors duration-150"
              >
                Read entry →
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
