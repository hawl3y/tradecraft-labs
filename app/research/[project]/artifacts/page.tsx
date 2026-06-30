import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import BreadcrumbNav from '@/components/layout/BreadcrumbNav'
import Badge from '@/components/ui/Badge'
import StatusBadge from '@/components/research/StatusBadge'
import ArtifactGrid from '@/components/research/ArtifactGrid'
import {
  getAllProjects,
  getProjectBySlug,
  getArtifactsByProject,
} from '@/lib/content'

interface Props {
  params: Promise<{ project: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ project: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `Artifacts — ${project.shortTitle ?? `Project ${project.projectNumber}`} — Tradecraft Labs`,
    description: `Research artifacts for: ${project.title}`,
  }
}

export default async function ArtifactsPage({ params }: Props) {
  const { project: slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const artifacts = getArtifactsByProject(project.slug)
  const activeCount = artifacts.filter((a) => a.status !== 'stub').length

  return (
    <PageLayout>
      <BreadcrumbNav
        crumbs={[
          { label: 'Research', href: '/research' },
          { label: project.shortTitle ?? `Project ${project.projectNumber}`, href: `/research/${project.slug}` },
          { label: 'Artifacts' },
        ]}
      />

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge label={project.shortTitle ?? `Project ${project.projectNumber}`} variant="info" />
          <StatusBadge status={project.status} />
        </div>
        <h1 className="font-serif text-3xl text-ink mb-2">Artifacts</h1>
        <p className="text-sm text-muted">
          {activeCount} of {artifacts.length} artifacts published
        </p>
      </header>

      <ArtifactGrid artifacts={artifacts} />
    </PageLayout>
  )
}
