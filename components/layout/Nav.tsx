'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Research', href: '/research' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
] as const

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav aria-label="Main navigation">
      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-6" role="list">
        {NAV_ITEMS.map(({ label, href }) => {
          const active = isActive(pathname, href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'text-sm font-medium transition-colors duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-sm',
                  active
                    ? 'text-navy underline underline-offset-4 decoration-navy/50'
                    : 'text-ink hover:text-navy'
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Mobile hamburger button */}
      <button
        type="button"
        className={cn(
          'md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-sm'
        )}
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? (
          /* X icon */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          /* Hamburger icon */
          <>
            <span className="w-5 h-px bg-ink" />
            <span className="w-5 h-px bg-ink" />
            <span className="w-5 h-px bg-ink" />
          </>
        )}
      </button>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full bg-background border-b border-gray-200 shadow-sm md:hidden"
        >
          <ul className="max-w-content mx-auto px-6 py-4 flex flex-col gap-4" role="list">
            {NAV_ITEMS.map(({ label, href }) => {
              const active = isActive(pathname, href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block text-sm font-medium py-1 transition-colors duration-150',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-sm',
                      active ? 'text-navy' : 'text-ink hover:text-navy'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}
