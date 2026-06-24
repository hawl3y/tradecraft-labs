import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import PublicationCard from '@/components/research/PublicationCard'
import { getAllPublications } from '@/lib/content'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Publications — Tradecraft Labs',
  description: 'Research papers, drafts, and presentations from Tradecraft Labs.',
  openGraph: {
    title: 'Publications — Tradecraft Labs',
    description: 'Research papers, drafts, and presentations from Tradecraft Labs.',
  },
}

export default function PublicationsPage() {
  const publications = getAllPublications()

  return (
    <PageLayout>
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-ink mb-2">Publications</h1>
        <p className="text-base text-muted">
          Research papers, drafts, and presentations.
        </p>
      </div>

      {publications.length > 0 ? (
        <div className="space-y-6">
          {publications.map((pub) => (
            <PublicationCard key={pub.slug} publication={pub} />
          ))}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-sm bg-surface px-8 py-12 text-center max-w-prose">
          <p className="font-serif text-lg text-ink italic mb-3">
            No publications yet.
          </p>
          <p className="text-sm text-muted leading-relaxed mb-6">
            {SITE.name} is currently in the research and interview phase. The
            first paper is in progress. Follow the journal for updates as the
            research develops.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/research/project-001-biso"
              className="text-sm text-navy hover:underline font-medium"
            >
              View current research →
            </Link>
            <span className="text-gray-300 select-none">·</span>
            <Link
              href="/journal"
              className="text-sm text-navy hover:underline font-medium"
            >
              Follow in journal →
            </Link>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
