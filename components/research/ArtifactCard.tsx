import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import StatusBadge from '@/components/research/StatusBadge'
import type { Artifact } from '@/lib/content'
import { cn } from '@/lib/utils'

const ARTIFACT_TYPE_LABEL: Record<string, string> = {
  'research-proposal':      'Research Proposal',
  'literature-matrix':      'Literature Matrix',
  'annotated-bibliography': 'Annotated Bibliography',
  'research-insights':      'Research Insights',
  'research-data':          'Research Data',
  'interview-guide':        'Interview Guide',
  'interview-pool':         'Interview Pool',
  'interview-analysis':     'Interview Analysis',
  'paper-outline':          'Paper Outline',
  'draft-paper':            'Draft Paper',
  'final-paper':            'Final Paper',
  'presentation':           'Presentation',
}

interface ArtifactCardProps {
  artifact: Artifact
  className?: string
}

export default function ArtifactCard({ artifact, className }: ArtifactCardProps) {
  const isStub = artifact.status === 'stub'
  const typeLabel = ARTIFACT_TYPE_LABEL[artifact.artifactType] ?? artifact.artifactType

  return (
    <div
      className={cn(
        'flex items-start gap-3 py-4 border-b border-gray-100 last:border-0',
        className
      )}
    >
      {/* Status dot */}
      <div
        className={cn(
          'mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0',
          isStub
            ? 'border-2 border-gray-300 bg-background'
            : 'bg-navy'
        )}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title + badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {isStub ? (
            <span className="text-sm font-medium text-muted">{artifact.title}</span>
          ) : (
            <Link
              href={artifact.url}
              className="text-sm font-medium text-ink hover:text-navy transition-colors duration-150"
            >
              {artifact.title}
            </Link>
          )}
          <Badge label={`v${artifact.version}`} variant={isStub ? 'muted' : 'neutral'} />
          {!isStub && <StatusBadge status={artifact.status} />}
        </div>

        {/* Description */}
        <p className="text-xs text-muted leading-relaxed line-clamp-2">
          {artifact.description}
        </p>

        {/* Stub indicator */}
        {isStub && (
          <p className="mt-1.5 text-xs text-gray-400 italic">
            Pending — full content will be published as research progresses
          </p>
        )}
      </div>
    </div>
  )
}

export { ARTIFACT_TYPE_LABEL }
