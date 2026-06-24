import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import type { Publication } from '@/lib/content'
import { formatDateShort } from '@/lib/utils'

const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  published: 'Published',
}

const STATUS_VARIANT: Record<string, 'warning' | 'neutral' | 'info'> = {
  draft: 'warning',
  submitted: 'neutral',
  published: 'info',
}

interface PublicationCardProps {
  publication: Publication
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const statusLabel = STATUS_LABEL[publication.status] ?? publication.status
  const statusVariant = STATUS_VARIANT[publication.status] ?? 'neutral'

  return (
    <Card as="article">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge label={statusLabel} variant={statusVariant} />
        <Badge label={`v${publication.version}`} variant="muted" />
        {publication.publicationDate && (
          <span className="text-xs text-muted">
            {formatDateShort(publication.publicationDate)}
          </span>
        )}
      </div>

      <h2 className="font-serif text-lg text-ink leading-snug mb-3">
        {publication.title}
      </h2>

      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
        {publication.abstract}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          {publication.authors.join(', ')}
        </p>

        {publication.downloadUrl && (
          <a
            href={publication.downloadUrl}
            className="text-sm text-navy hover:underline font-medium"
            download
          >
            Download PDF →
          </a>
        )}
      </div>

      {publication.citationText && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
            Citation
          </p>
          <p className="text-xs text-muted leading-relaxed font-mono">
            {publication.citationText}
          </p>
        </div>
      )}
    </Card>
  )
}
