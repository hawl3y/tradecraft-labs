import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import JournalTimeline from '@/components/journal/JournalTimeline'
import JournalFilter from '@/components/journal/JournalFilter'
import { getAllJournalEntries, getAllProjects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Research Journal — Tradecraft Labs',
  description:
    'A continuous record of research in progress: milestones, reflections, updates, and observations.',
}

interface PageProps {
  searchParams: Promise<{ category?: string; project?: string }>
}

export default async function JournalPage({ searchParams }: PageProps) {
  const { category, project } = await searchParams

  const currentCategory = category ?? 'all'
  const currentProject = project ?? 'all'

  const allEntries = getAllJournalEntries()

  let entries = allEntries
  if (currentCategory !== 'all') {
    entries = entries.filter((e) => e.category === currentCategory)
  }
  if (currentProject !== 'all') {
    entries = entries.filter((e) => e.project === currentProject)
  }

  const projects = getAllProjects().map((p) => ({
    slug: p.slug,
    projectNumber: p.projectNumber,
    shortTitle: p.shortTitle,
    title: p.title,
  }))

  const isFiltered = currentCategory !== 'all' || currentProject !== 'all'

  return (
    <PageLayout>
      {/* Page header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-ink mb-2">Research Journal</h1>
        <p className="text-base text-muted">
          A continuous record of research in progress.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 pb-8 border-b border-gray-100">
        <JournalFilter
          currentCategory={currentCategory}
          currentProject={currentProject}
          projects={projects}
          showProjectFilter={true}
        />
      </div>

      {/* Entry count */}
      <p className="text-xs text-muted uppercase tracking-widest mb-8">
        {isFiltered
          ? `${entries.length} of ${allEntries.length} ${allEntries.length === 1 ? 'entry' : 'entries'}`
          : `${allEntries.length} ${allEntries.length === 1 ? 'entry' : 'entries'}`}
      </p>

      {/* Timeline */}
      <JournalTimeline entries={entries} showProjectBadge={true} />
    </PageLayout>
  )
}
