import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import BreadcrumbNav from '@/components/layout/BreadcrumbNav'
import Badge from '@/components/ui/Badge'
import StatusBadge from '@/components/research/StatusBadge'
import ResearchProgressTimeline from '@/components/research/ResearchProgressTimeline'
import ResearchQuestion from '@/components/research/ResearchQuestion'
import ThesisBlock from '@/components/research/ThesisBlock'
import ArtifactGrid from '@/components/research/ArtifactGrid'
import JournalTimeline from '@/components/journal/JournalTimeline'
import MDXContent from '@/components/mdx/MDXContent'
import {
  getAllProjects,
  getProjectBySlug,
  getArtifactsByProject,
  getJournalEntriesByProject,
} from '@/lib/content'
import type { ResearchStage } from '@/lib/research-stages'
import { formatDateShort } from '@/lib/utils'

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
    title: `${project.title} — Tradecraft Labs`,
    description: project.researchQuestion,
    openGraph: {
      title: project.title,
      description: project.researchQuestion,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.researchQuestion,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { project: slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const artifacts = getArtifactsByProject(project.slug)
  const journalEntries = getJournalEntriesByProject(project.slug)
  const recentEntries = journalEntries.slice(0, 3)

  return (
    <PageLayout>
      <BreadcrumbNav
        crumbs={[
          { label: 'Research', href: '/research' },
          { label: `Project ${project.projectNumber}` },
        ]}
      />

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge label={`Project ${project.projectNumber}`} variant="info" />
          <StatusBadge status={project.status} />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-6">
          {project.title}
        </h1>
        <div className="pt-4 border-t border-gray-100">
          <ResearchProgressTimeline
            currentStage={project.stage as ResearchStage}
            variant="full"
          />
        </div>
      </header>

      {/* Research question + thesis */}
      <div className="space-y-8 mb-12">
        <ResearchQuestion question={project.researchQuestion} />
        <ThesisBlock thesis={project.workingThesis} version={project.thesisVersion} />
      </div>

      {/* Project body (MDX) */}
      {project.body.code && (
        <div className="mb-12">
          <MDXContent code={project.body.code} />
        </div>
      )}

      {/* Two-column: artifacts + journal sidebar */}
      <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
        {/* Artifacts */}
        <section>
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="font-serif text-xl text-ink">Artifacts</h2>
            <Link
              href={`/research/${project.slug}/artifacts`}
              className="text-sm text-navy hover:underline"
            >
              View all →
            </Link>
          </div>
          <ArtifactGrid artifacts={artifacts} />
        </section>

        {/* Journal sidebar */}
        <aside>
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="font-serif text-xl text-ink">Journal</h2>
            <Link
              href={`/research/${project.slug}/journal`}
              className="text-sm text-navy hover:underline"
            >
              View all →
            </Link>
          </div>

          {recentEntries.length > 0 ? (
            <>
              <JournalTimeline
                entries={recentEntries}
                showProjectBadge={false}
              />
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-muted">
                  {journalEntries.length}{' '}
                  {journalEntries.length === 1 ? 'entry' : 'entries'} total
                  {project.updatedDate !== 'TBD' && (
                    <> · Updated {formatDateShort(project.updatedDate)}</>
                  )}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted">No journal entries yet.</p>
          )}
        </aside>
      </div>
    </PageLayout>
  )
}
