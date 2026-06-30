import Link from 'next/link'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/research/StatusBadge'
import ResearchProgressTimeline from '@/components/research/ResearchProgressTimeline'
import type { Project } from '@/lib/content'
import { type ResearchStage, STAGE_LABELS } from '@/lib/research-stages'
import { formatDateShort } from '@/lib/utils'

interface ResearchCardProps {
  project: Project
  artifactCount: number
}

export default function ResearchCard({ project, artifactCount }: ResearchCardProps) {
  return (
    <Card as="article" hover>
      {/* Project number + status */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge label={project.shortTitle ?? `Project ${project.projectNumber}`} variant="info" />
        <StatusBadge status={project.status} />
      </div>

      {/* Title */}
      <h2 className="font-serif text-xl md:text-2xl text-ink leading-snug mb-5">
        <Link
          href={project.url}
          className="hover:text-navy transition-colors duration-150"
        >
          {project.title}
        </Link>
      </h2>

      {/* Compact progress timeline */}
      <div className="py-4 border-y border-gray-100 mb-5">
        <ResearchProgressTimeline
          currentStage={project.stage as ResearchStage}
          variant="compact"
        />
        <p className="text-xs text-muted text-center mt-2">
          Stage: {STAGE_LABELS[project.stage as ResearchStage]}
        </p>
      </div>

      {/* Research question excerpt */}
      <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-2">
        {project.researchQuestion}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted">
          {artifactCount} {artifactCount === 1 ? 'artifact' : 'artifacts'}
          {project.updatedDate !== 'TBD' && (
            <> · Updated {formatDateShort(project.updatedDate)}</>
          )}
        </p>
        <Button href={project.url} variant="secondary" size="sm">
          View Project →
        </Button>
      </div>
    </Card>
  )
}
