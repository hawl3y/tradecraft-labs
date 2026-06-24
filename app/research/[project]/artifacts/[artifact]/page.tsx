import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import SidebarLayout from '@/components/layout/SidebarLayout'
import BreadcrumbNav from '@/components/layout/BreadcrumbNav'
import Badge from '@/components/ui/Badge'
import StatusBadge from '@/components/research/StatusBadge'
import MDXContent from '@/components/mdx/MDXContent'
import JournalTimeline from '@/components/journal/JournalTimeline'
import { ARTIFACT_TYPE_LABEL } from '@/components/research/ArtifactCard'
import {
  getAllProjects,
  getProjectBySlug,
  getArtifactsByProject,
  getArtifactBySlug,
  getJournalEntriesByProject,
} from '@/lib/content'
import { formatDateShort } from '@/lib/utils'

interface Props {
  params: Promise<{ project: string; artifact: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.flatMap((p) =>
    getArtifactsByProject(p.slug).map((a) => ({
      project: p.slug,
      artifact: a.slug,
    }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: projectSlug, artifact: artifactSlug } = await params
  const artifact = getArtifactBySlug(projectSlug, artifactSlug)
  if (!artifact) return {}
  return {
    title: `${artifact.title} — Tradecraft Labs`,
    description: artifact.description,
    openGraph: {
      title: artifact.title,
      description: artifact.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: artifact.title,
      description: artifact.description,
    },
  }
}

export default async function ArtifactPage({ params }: Props) {
  const { project: projectSlug, artifact: artifactSlug } = await params
  const artifact = getArtifactBySlug(projectSlug, artifactSlug)
  if (!artifact) notFound()

  const project = getProjectBySlug(projectSlug)
  if (!project) notFound()

  const isStub = artifact.status === 'stub'
  const typeLabel = ARTIFACT_TYPE_LABEL[artifact.artifactType] ?? artifact.artifactType

  const projectArtifacts = getArtifactsByProject(project.slug)
  const relatedArtifacts = projectArtifacts
    .filter((a) => a.slug !== artifact.slug && a.status !== 'stub')
    .slice(0, 4)

  const journalEntries = getJournalEntriesByProject(project.slug)
  const recentEntries = journalEntries.slice(0, 2)

  const sidebar = (
    <div className="space-y-8">
      {/* Project link */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
          Project
        </p>
        <Link
          href={project.url}
          className="text-sm font-medium text-navy hover:underline"
        >
          {project.projectNumber} — {project.title}
        </Link>
      </div>

      {/* Artifact metadata */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
          Artifact Details
        </p>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-muted text-xs">Type</dt>
            <dd className="text-ink">{typeLabel}</dd>
          </div>
          <div>
            <dt className="text-muted text-xs">Version</dt>
            <dd className="text-ink">v{artifact.version}</dd>
          </div>
          {artifact.updatedDate !== 'TBD' && (
            <div>
              <dt className="text-muted text-xs">Updated</dt>
              <dd className="text-ink">{formatDateShort(artifact.updatedDate)}</dd>
            </div>
          )}
          {artifact.downloadUrl && (
            <div className="pt-2">
              <a
                href={artifact.downloadUrl}
                className="text-sm text-navy hover:underline font-medium"
                download
              >
                Download PDF →
              </a>
            </div>
          )}
        </dl>
      </div>

      {/* Related artifacts */}
      {relatedArtifacts.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
            Other Artifacts
          </p>
          <ul className="space-y-2">
            {relatedArtifacts.map((a) => (
              <li key={a.slug}>
                <Link
                  href={a.url}
                  className="text-sm text-navy hover:underline"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/research/${project.slug}/artifacts`}
            className="mt-3 inline-block text-xs text-muted hover:text-navy"
          >
            View all artifacts →
          </Link>
        </div>
      )}

      {/* Recent journal entries */}
      {recentEntries.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
            Recent Journal
          </p>
          <JournalTimeline
            entries={recentEntries}
            showProjectBadge={false}
          />
          <Link
            href={`/research/${project.slug}/journal`}
            className="mt-3 inline-block text-xs text-muted hover:text-navy"
          >
            View all entries →
          </Link>
        </div>
      )}
    </div>
  )

  return (
    <PageLayout width="wide">
      <BreadcrumbNav
        crumbs={[
          { label: 'Research', href: '/research' },
          { label: `Project ${project.projectNumber}`, href: project.url },
          { label: 'Artifacts', href: `/research/${project.slug}/artifacts` },
          { label: artifact.title },
        ]}
      />

      <SidebarLayout sidebar={sidebar}>
        {/* Artifact header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge label={typeLabel} variant="neutral" />
            <Badge label={`v${artifact.version}`} variant="muted" />
            {!isStub && <StatusBadge status={artifact.status} />}
          </div>
          <h1 className="font-serif text-3xl text-ink leading-tight mb-4">
            {artifact.title}
          </h1>
          <p className="text-base text-muted leading-relaxed border-l-4 border-gray-200 pl-4">
            {artifact.description}
          </p>
        </header>

        {/* Content or stub message */}
        {isStub ? (
          <div className="rounded-sm border border-gray-200 bg-surface px-6 py-8 text-center">
            <p className="font-serif text-lg text-ink italic mb-2">
              Content pending
            </p>
            <p className="text-sm text-muted max-w-sm mx-auto">
              This artifact is complete. Full content will be published as
              the research progresses.
            </p>
          </div>
        ) : (
          <MDXContent code={artifact.body.code} />
        )}
      </SidebarLayout>
    </PageLayout>
  )
}
