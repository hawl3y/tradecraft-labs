import { cn } from '@/lib/utils'
import {
  RESEARCH_STAGES,
  STAGE_LABELS,
  type ResearchStage,
  getStageIndex,
} from '@/lib/research-stages'

interface ResearchProgressTimelineProps {
  currentStage: ResearchStage
  variant?: 'full' | 'compact'
  className?: string
}

export default function ResearchProgressTimeline({
  currentStage,
  variant = 'full',
  className,
}: ResearchProgressTimelineProps) {
  const currentIdx = getStageIndex(currentStage)
  const isCompact = variant === 'compact'

  return (
    <div className={cn('w-full', className)}>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${RESEARCH_STAGES.length}, minmax(0, 1fr))` }}
      >
        {RESEARCH_STAGES.map((stage, i) => {
          const isFirst = i === 0
          const isLast = i === RESEARCH_STAGES.length - 1
          const isCurrent = i === currentIdx
          const isCompleted = i < currentIdx
          const isReached = i <= currentIdx

          // Left connector: navy if this stage has been reached
          const leftActive = !isFirst && isReached
          // Right connector: navy if this stage is completed (we've moved past it)
          const rightActive = !isLast && isCompleted

          return (
            <div key={stage} className="flex flex-col items-center">
              {/* Dot and connector track */}
              <div className="flex items-center w-full">
                <div
                  className={cn(
                    'flex-1 h-0.5',
                    isFirst ? 'invisible' : leftActive ? 'bg-navy' : 'bg-gray-200'
                  )}
                  aria-hidden="true"
                />
                <div
                  className={cn(
                    'flex-shrink-0 rounded-full border-2 transition-colors',
                    isCompact ? 'w-3 h-3' : 'w-4 h-4',
                    isCurrent && 'ring-2 ring-offset-1 ring-navy/40',
                    isReached ? 'bg-navy border-navy' : 'bg-background border-gray-300'
                  )}
                  role="img"
                  aria-label={`${STAGE_LABELS[stage]}${isCurrent ? ' — current stage' : isCompleted ? ' — completed' : ' — upcoming'}`}
                />
                <div
                  className={cn(
                    'flex-1 h-0.5',
                    isLast ? 'invisible' : rightActive ? 'bg-navy' : 'bg-gray-200'
                  )}
                  aria-hidden="true"
                />
              </div>

              {/* Stage labels (full variant, sm+ only) */}
              {!isCompact && (
                <div className="mt-2.5 px-0.5 text-center">
                  <p
                    className={cn(
                      'text-xs leading-tight hidden sm:block',
                      isCurrent
                        ? 'text-navy font-semibold'
                        : isCompleted
                        ? 'text-muted'
                        : 'text-gray-400'
                    )}
                  >
                    {STAGE_LABELS[stage]}
                  </p>
                  {isCurrent && (
                    <p className="hidden sm:block text-xs text-navy/60 mt-0.5">
                      ↑ Current
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile fallback: show current stage as text (full variant only) */}
      {!isCompact && (
        <p className="sm:hidden mt-3 text-sm text-center">
          <span className="text-muted">Current Stage: </span>
          <span className="text-navy font-medium">{STAGE_LABELS[currentStage]}</span>
        </p>
      )}
    </div>
  )
}
