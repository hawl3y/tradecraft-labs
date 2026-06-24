import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import ResearchCard from '@/components/research/ResearchCard'
import { getAllProjects, getArtifactsByProject } from '@/lib/content'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Research — Tradecraft Labs',
  description: SITE.mission.full,
}

export default function ResearchPage() {
  const projects = getAllProjects()

  return (
    <PageLayout>
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-ink mb-2">Research Projects</h1>
        <p className="text-base text-muted">
          Active and planned research initiatives.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-muted">No research projects yet.</p>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => {
            const artifacts = getArtifactsByProject(project.slug)
            return (
              <ResearchCard
                key={project.slug}
                project={project}
                artifactCount={artifacts.length}
              />
            )
          })}
        </div>
      )}
    </PageLayout>
  )
}
