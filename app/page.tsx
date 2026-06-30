import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedProject, getLatestJournalEntries } from '@/lib/content'
import { SITE } from '@/lib/site'
import { type ResearchStage } from '@/lib/research-stages'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StatusBadge from '@/components/research/StatusBadge'
import ResearchProgressTimeline from '@/components/research/ResearchProgressTimeline'
import WhyThisMatters from '@/components/research/WhyThisMatters'
import JournalEntry from '@/components/journal/JournalEntry'

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.mission.full,
}

export default function Home() {
  const project = getFeaturedProject()
  const latestEntries = getLatestJournalEntries(3)
  const thesisSummary = project
    ? project.workingThesis.split('. ')[0] + '.'
    : ''

  return (
    <div>
      {/* ── Section 1: Hero ─────────────────────────────────── */}
      <section aria-labelledby="hero-heading" className="border-b border-gray-100">
        <div className="max-w-content mx-auto px-6 py-12 md:py-16">
          <h1
            id="hero-heading"
            className="font-serif text-4xl md:text-5xl text-ink leading-[1.2] max-w-3xl"
          >
            {SITE.mission.full}
          </h1>
        </div>
      </section>

      {/* ── Section 2: Current Research ─────────────────────── */}
      {project && (
        <section
          aria-labelledby="current-research-heading"
          className="border-b border-gray-100"
        >
          <div className="max-w-content mx-auto px-6 py-16">
            <p className="text-xs font-medium uppercase tracking-widest text-muted mb-6">
              Current Research
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge label={project.shortTitle ?? `Project ${project.projectNumber}`} variant="info" />
              <StatusBadge status={project.status} />
            </div>
            <h2
              id="current-research-heading"
              className="font-serif text-2xl md:text-3xl text-ink leading-snug max-w-3xl mb-5"
            >
              {project.title}
            </h2>
            <p className="text-base text-ink/80 leading-relaxed max-w-2xl mb-8">
              {thesisSummary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={project.url} variant="primary">
                View Research
              </Button>
              <Button
                href={`${project.url}/artifacts/biso-research-proposal`}
                variant="secondary"
              >
                Read Proposal
              </Button>
              <Button href="/journal" variant="ghost">
                Follow in Journal
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 3: Research Progress Timeline ───────────── */}
      {project && (
        <section
          aria-label="Research progress timeline"
          className="bg-surface border-b border-gray-100"
        >
          <div className="max-w-content mx-auto px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-widest text-muted mb-8">
              Research Progress
            </p>
            <ResearchProgressTimeline
              currentStage={project.stage as ResearchStage}
              variant="full"
            />
          </div>
        </section>
      )}

      {/* ── Section 4: Why This Matters ─────────────────────── */}
      {project && (
        <section
          aria-labelledby="why-this-matters"
          className="border-b border-gray-100"
        >
          <div className="max-w-content mx-auto px-6 py-16">
            <WhyThisMatters text={project.researchGap} />
          </div>
        </section>
      )}

      {/* ── Section 5: From the Journal ─────────────────────── */}
      <section aria-labelledby="journal-preview-heading" className="bg-surface">
        <div className="max-w-content mx-auto px-6 py-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2
              id="journal-preview-heading"
              className="font-serif text-2xl text-ink"
            >
              From the Research Journal
            </h2>
            <Link
              href="/journal"
              className="text-sm text-navy hover:text-navy/70 transition-colors duration-150 shrink-0 ml-4"
            >
              View all entries →
            </Link>
          </div>
          {latestEntries.length > 0 ? (
            <div className="max-w-2xl">
              {latestEntries.map((entry) => (
                <JournalEntry key={entry.slug} entry={entry} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Journal entries will appear here as research progresses.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
