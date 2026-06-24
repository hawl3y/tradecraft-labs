import Link from 'next/link'
import { SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-background">
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand + mission */}
          <div className="max-w-prose">
            <p className="font-serif text-sm font-semibold tracking-wide text-ink">
              {SITE.name.toUpperCase()}
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {SITE.mission.full}
            </p>
          </div>

          {/* External links */}
          <div className="flex flex-col gap-2 sm:items-end shrink-0">
            <a
              href={SITE.links.personal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-navy transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-sm"
            >
              JoeHawley.com
            </a>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-navy transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-muted">
            &copy; {SITE.year} Tradecraft Labs
          </p>
        </div>
      </div>
    </footer>
  )
}
