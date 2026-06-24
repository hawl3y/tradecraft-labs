import { STAGE_LABELS, type ResearchStage } from '@/lib/research-stages'
import { cn } from '@/lib/utils'

interface ProgressSummaryProps {
  stage: string
  artifactCount: number
  methodology: string[]
  className?: string
}

export default function ProgressSummary({
  stage,
  artifactCount,
  methodology,
  className,
}: ProgressSummaryProps) {
  const stageLabel = STAGE_LABELS[stage as ResearchStage] ?? stage

  return (
    <div className={cn('flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm', className)}>
      <span className="text-muted">
        Stage:{' '}
        <span className="font-medium text-ink">{stageLabel}</span>
      </span>
      <span className="text-gray-300" aria-hidden>·</span>
      <span className="text-muted">
        <span className="font-medium text-ink">{artifactCount}</span>{' '}
        {artifactCount === 1 ? 'artifact' : 'artifacts'}
      </span>
      {methodology.length > 0 && (
        <>
          <span className="text-gray-300" aria-hidden>·</span>
          <span className="text-muted">{methodology.join(', ')}</span>
        </>
      )}
    </div>
  )
}
