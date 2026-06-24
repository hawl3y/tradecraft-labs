import type { MetadataRoute } from 'next'
import {
  getAllProjects,
  getArtifactsByProject,
  getAllJournalEntries,
} from '@/lib/content'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tradecraftlabs.vercel.app'

function url(path: string): string {
  return `${siteUrl}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()
  const journalEntries = getAllJournalEntries()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url('/'),             priority: 1.0, changeFrequency: 'weekly' },
    { url: url('/research'),     priority: 0.9, changeFrequency: 'weekly' },
    { url: url('/journal'),      priority: 0.8, changeFrequency: 'weekly' },
    { url: url('/about'),        priority: 0.7, changeFrequency: 'monthly' },
    { url: url('/publications'), priority: 0.7, changeFrequency: 'monthly' },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const artifacts = getArtifactsByProject(project.slug)
    return [
      {
        url: url(`/research/${project.slug}`),
        priority: 0.9,
        changeFrequency: 'weekly' as const,
        lastModified: project.updatedDate !== 'TBD'
          ? new Date(project.updatedDate + 'T00:00:00')
          : undefined,
      },
      {
        url: url(`/research/${project.slug}/artifacts`),
        priority: 0.7,
        changeFrequency: 'weekly' as const,
      },
      {
        url: url(`/research/${project.slug}/journal`),
        priority: 0.7,
        changeFrequency: 'weekly' as const,
      },
      ...artifacts.map((artifact) => ({
        url: url(`/research/${project.slug}/artifacts/${artifact.slug}`),
        priority: 0.6,
        changeFrequency: 'monthly' as const,
        lastModified: artifact.updatedDate !== 'TBD'
          ? new Date(artifact.updatedDate + 'T00:00:00')
          : undefined,
      })),
    ]
  })

  const journalRoutes: MetadataRoute.Sitemap = journalEntries.map((entry) => ({
    url: url(`/journal/${entry.slug}`),
    priority: 0.7,
    changeFrequency: 'never' as const,
    lastModified: new Date(entry.date + 'T00:00:00'),
  }))

  return [...staticRoutes, ...projectRoutes, ...journalRoutes]
}
