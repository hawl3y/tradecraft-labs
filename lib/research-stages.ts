export const RESEARCH_STAGES = [
  'concept',
  'literature-review',
  'proposal',
  'interviews',
  'analysis',
  'draft',
  'publication',
] as const

export type ResearchStage = typeof RESEARCH_STAGES[number]

export const STAGE_LABELS: Record<ResearchStage, string> = {
  'concept':           'Concept',
  'literature-review': 'Lit. Review',
  'proposal':          'Proposal',
  'interviews':        'Interviews',
  'analysis':          'Analysis',
  'draft':             'Draft',
  'publication':       'Publication',
}

export function getStageIndex(stage: ResearchStage): number {
  return RESEARCH_STAGES.indexOf(stage)
}

export function isStageCompleted(stage: ResearchStage, currentStage: ResearchStage): boolean {
  return getStageIndex(stage) < getStageIndex(currentStage)
}

export function isCurrentStage(stage: ResearchStage, currentStage: ResearchStage): boolean {
  return stage === currentStage
}

export function isUpcomingStage(stage: ResearchStage, currentStage: ResearchStage): boolean {
  return getStageIndex(stage) > getStageIndex(currentStage)
}

export function getCompletedStages(currentStage: ResearchStage): ResearchStage[] {
  return RESEARCH_STAGES.filter((s) => isStageCompleted(s, currentStage))
}

export function getStageLabel(stage: ResearchStage): string {
  return STAGE_LABELS[stage]
}
