import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  crumbs: Crumb[]
  className?: string
}

export default function BreadcrumbNav({ crumbs, className }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('mb-6', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted" role="list">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-gray-300 select-none">
                  /
                </span>
              )}
              {isLast || !crumb.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(isLast ? 'text-ink font-medium' : 'text-muted')}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-navy transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1 rounded-sm"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
