import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import BreadcrumbNav from '@/components/layout/BreadcrumbNav'
import JournalTimeline from '@/components/journal/JournalTimeline'
import JournalFilter from '@/components/journal/JournalFilter'
import {
  getAllProjects,
  getProjectBySlug,
  getJournalEntriesByProject,
} from '@/lib/content'

interface PageProps {
  params: Promise<{ project: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ project: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { project: slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Not Found' }
  return {
    title: `Journal — ${project.shortTitle ?? `Project ${project.projectNumber}`} — Tradecraft Labs`,
    description: `Research journal entries for ${project.shortTitle ?? `Project ${project.projectNumber}`}.`,
  }
}

export default async function ProjectJournalPage({
  params,
  searchParams,
}: PageProps) {
  const { project: slug } = await params
  const { category } = await searchParams

  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const currentCategory = category ?? 'all'

  const allProjectEntries = getJournalEntriesByProject(slug)
  let entries = allProjectEntries
  if (currentCategory !== 'all') {
    entries = entries.filter((e) => e.category === currentCategory)
  }

  const isFiltered = currentCategory !== 'all'

  return (
    <PageLayout>
      <BreadcrumbNav
        crumbs={[
          { label: 'Research', href: '/research' },
          { label: project.shortTitle ?? `Project ${project.projectNumber}`, href: project.url },
          { label: 'Journal' },
        ]}
      />

      {/* Page header */}
      <div className="mt-8 mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-2">
          {project.shortTitle ?? `Project ${project.projectNumber}`}
        </p>
        <h1 className="font-serif text-3xl text-ink mb-2">Research Journal</h1>
        <p className="text-sm text-muted">
          Journal entries for this research project.{' '}
          <Link
            href="/journal"
            className="text-navy hover:text-navy/70 transition-colors duration-150"
          >
            View global journal →
          </Link>
        </p>
      </div>

      {/* Category filter (project is already fixed by URL) */}
      <div className="mb-8 pb-8 border-b border-gray-100">
        <JournalFilter
          currentCategory={currentCategory}
          currentProject={slug}
          projects={[]}
          showProjectFilter={false}
        />
      </div>

      {/* Entry count */}
      <p className="text-xs text-muted uppercase tracking-widest mb-8">
        {isFiltered
          ? `${entries.length} of ${allProjectEntries.length} ${allProjectEntries.length === 1 ? 'entry' : 'entries'}`
          : `${allProjectEntries.length} ${allProjectEntries.length === 1 ? 'entry' : 'entries'}`}
      </p>

      {/* Timeline — no project badge since this is a project-scoped view */}
      <JournalTimeline
        entries={entries}
        showProjectBadge={false}
        emptyMessage="No entries match the current filter."
      />
    </PageLayout>
  )
}
