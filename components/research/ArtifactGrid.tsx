import ArtifactCard from '@/components/research/ArtifactCard'
import type { Artifact } from '@/lib/content'

const ARTIFACT_GROUPS: { label: string; types: string[] }[] = [
  {
    label: 'Foundations',
    types: ['research-proposal', 'literature-matrix', 'annotated-bibliography'],
  },
  {
    label: 'Analysis',
    types: ['research-insights', 'research-data'],
  },
  {
    label: 'Field Work',
    types: ['interview-guide', 'interview-pool', 'interview-analysis'],
  },
  {
    label: 'Writing',
    types: ['paper-outline', 'draft-paper', 'final-paper', 'presentation'],
  },
]

interface ArtifactGridProps {
  artifacts: Artifact[]
}

export default function ArtifactGrid({ artifacts }: ArtifactGridProps) {
  const hasArtifacts = artifacts.length > 0

  if (!hasArtifacts) {
    return <p className="text-sm text-muted">No artifacts yet.</p>
  }

  return (
    <div className="space-y-10">
      {ARTIFACT_GROUPS.map((group) => {
        const groupArtifacts = artifacts.filter((a) =>
          group.types.includes(a.artifactType)
        )
        if (groupArtifacts.length === 0) return null

        const activeCount = groupArtifacts.filter((a) => a.status !== 'stub').length
        const total = groupArtifacts.length

        return (
          <div key={group.label}>
            <div className="flex items-baseline gap-3 mb-1 pb-2 border-b border-gray-100">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                {group.label}
              </h3>
              <span className="text-xs text-gray-400">
                {activeCount}/{total}
              </span>
            </div>
            <div>
              {groupArtifacts.map((artifact) => (
                <ArtifactCard key={artifact.slug} artifact={artifact} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
