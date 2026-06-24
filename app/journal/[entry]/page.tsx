import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import BreadcrumbNav from '@/components/layout/BreadcrumbNav'
import Badge, { type BadgeVariant } from '@/components/ui/Badge'
import MDXContent from '@/components/mdx/MDXContent'
import {
  getAllJournalEntries,
  getJournalEntryBySlug,
  getAdjacentJournalEntries,
  getProjectBySlug,
} from '@/lib/content'
import { formatDate } from '@/lib/utils'

const CATEGORY_VARIANT: Record<string, BadgeVariant> = {
  milestone: 'success',
  reflection: 'info',
  update: 'warning',
  observation: 'neutral',
}

const CATEGORY_LABEL: Record<string, string> = {
  milestone: 'Milestone',
  reflection: 'Reflection',
  update: 'Update',
  observation: 'Observation',
}

interface Props {
  params: Promise<{ entry: string }>
}

export async function generateStaticParams() {
  return getAllJournalEntries().map((e) => ({ entry: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { entry: slug } = await params
  const entry = getJournalEntryBySlug(slug)
  if (!entry) return { title: 'Not Found' }
  return {
    title: `${entry.title} — Research Journal`,
    description: entry.summary,
    openGraph: {
      title: entry.title,
      description: entry.summary,
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.summary,
    },
  }
}

export default async function JournalEntryPage({ params }: Props) {
  const { entry: slug } = await params
  const entry = getJournalEntryBySlug(slug)
  if (!entry) notFound()

  const { prev, next } = getAdjacentJournalEntries(slug)
  const project = getProjectBySlug(entry.project)

  return (
    <PageLayout width="narrow">
      <BreadcrumbNav
        crumbs={[
          { label: 'Journal', href: '/journal' },
          { label: entry.title },
        ]}
      />

      {/* Entry header */}
      <div className="mt-8 mb-8">
        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <time dateTime={entry.date} className="text-sm text-muted">
            {formatDate(entry.date)}
          </time>
          <Badge
            label={CATEGORY_LABEL[entry.category] ?? entry.category}
            variant={CATEGORY_VARIANT[entry.category] ?? 'default'}
          />
          {project && (
            <Link
              href={project.url}
              className="text-xs text-navy hover:text-navy/70 transition-colors duration-150"
            >
              Project {project.projectNumber}
            </Link>
          )}
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl text-ink leading-snug mb-6">
          {entry.title}
        </h1>

        {/* Summary — styled as a lead paragraph */}
        <p className="text-base leading-relaxed text-muted border-l-4 border-gray-200 pl-4">
          {entry.summary}
        </p>
      </div>

      <div className="border-t border-gray-100 mb-10" />

      {/* MDX body */}
      <MDXContent code={entry.body.code} />

      <div className="border-t border-gray-100 mt-12 mb-8" />

      {/* Previous / Next navigation */}
      {(prev || next) && (
        <nav
          aria-label="Entry navigation"
          className="flex items-start justify-between gap-6"
        >
          <div className="flex-1 min-w-0">
            {prev && (
              <Link href={prev.url} className="group block">
                <span className="block text-xs text-muted uppercase tracking-wider mb-1">
                  ← Previous
                </span>
                <span className="block text-sm font-medium text-ink group-hover:text-navy transition-colors duration-150 truncate">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="flex-1 min-w-0 text-right">
            {next && (
              <Link href={next.url} className="group block">
                <span className="block text-xs text-muted uppercase tracking-wider mb-1">
                  Next →
                </span>
                <span className="block text-sm font-medium text-ink group-hover:text-navy transition-colors duration-150 truncate">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Back to journal */}
      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link
          href="/journal"
          className="text-sm text-navy hover:text-navy/70 transition-colors duration-150"
        >
          ← All journal entries
        </Link>
      </div>
    </PageLayout>
  )
}
