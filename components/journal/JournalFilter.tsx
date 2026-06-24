'use client'

import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type CategoryValue = 'all' | 'milestone' | 'reflection' | 'update' | 'observation'

const CATEGORIES: { value: CategoryValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'milestone', label: 'Milestones' },
  { value: 'reflection', label: 'Reflections' },
  { value: 'update', label: 'Updates' },
  { value: 'observation', label: 'Observations' },
]

interface Project {
  slug: string
  projectNumber: string
  title: string
}

interface JournalFilterProps {
  currentCategory: string
  currentProject: string
  projects: Project[]
  showProjectFilter?: boolean
}

const chipBase =
  'px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1'
const chipActive = 'bg-navy text-white border-navy'
const chipInactive =
  'bg-background text-muted border-gray-200 hover:border-navy/50 hover:text-navy'

export default function JournalFilter({
  currentCategory,
  currentProject,
  projects,
  showProjectFilter = true,
}: JournalFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  function applyFilter(key: 'category' | 'project', value: string) {
    const params = new URLSearchParams()

    const nextCategory = key === 'category' ? value : currentCategory
    const nextProject = key === 'project' ? value : currentProject

    if (nextCategory && nextCategory !== 'all') {
      params.set('category', nextCategory)
    }
    if (nextProject && nextProject !== 'all') {
      params.set('project', nextProject)
    }

    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <div className="space-y-3">
      {/* Category filter */}
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => applyFilter('category', value)}
            className={cn(chipBase, currentCategory === value ? chipActive : chipInactive)}
            aria-pressed={currentCategory === value}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project filter (global journal only, when multiple projects exist) */}
      {showProjectFilter && projects.length > 1 && (
        <div role="group" aria-label="Filter by project" className="flex flex-wrap gap-2">
          <button
            onClick={() => applyFilter('project', 'all')}
            className={cn(chipBase, currentProject === 'all' ? chipActive : chipInactive)}
            aria-pressed={currentProject === 'all'}
          >
            All Projects
          </button>
          {projects.map((p) => (
            <button
              key={p.slug}
              onClick={() => applyFilter('project', p.slug)}
              className={cn(
                chipBase,
                currentProject === p.slug ? chipActive : chipInactive
              )}
              aria-pressed={currentProject === p.slug}
            >
              Project {p.projectNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
