import Link from 'next/link'
import Nav from './Nav'
import { SITE } from '@/lib/site'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-gray-200">
      <div className="relative max-w-content mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Wordmark + mission subtitle */}
        <div>
          <Link
            href="/"
            className="block font-serif text-xl font-semibold tracking-wide text-ink hover:text-navy transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-sm"
          >
            {SITE.name.toUpperCase()}
          </Link>
          <p className="hidden sm:block text-xs text-muted mt-0.5 leading-none">
            {SITE.mission.short}
          </p>
        </div>

        {/* Nav — client component handles active state + mobile toggle */}
        <Nav />
      </div>
    </header>
  )
}
