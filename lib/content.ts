import {
  allProjects,
  allArtifacts,
  allJournalEntries,
  allPublications,
  type Project,
  type Artifact,
  type JournalEntry,
  type Publication,
} from 'contentlayer/generated'

export type { Project, Artifact, JournalEntry, Publication }

// ─── Projects ───────────────────────────────────────────────────────────────

export function getAllProjects(): Project[] {
  return [...allProjects].sort((a, b) =>
    a.projectNumber.localeCompare(b.projectNumber)
  )
}

export function getFeaturedProject(): Project | null {
  return allProjects.find((p) => p.featured) ?? allProjects[0] ?? null
}

export function getProjectBySlug(slug: string): Project | null {
  return allProjects.find((p) => p.slug === slug) ?? null
}

// ─── Artifacts ──────────────────────────────────────────────────────────────

export function getAllArtifacts(): Artifact[] {
  return allArtifacts
}

export function getArtifactsByProject(projectSlug: string): Artifact[] {
  return allArtifacts.filter((a) => a.project === projectSlug)
}

export function getArtifactBySlug(projectSlug: string, artifactSlug: string): Artifact | null {
  return (
    allArtifacts.find(
      (a) => a.project === projectSlug && a.slug === artifactSlug
    ) ?? null
  )
}

// ─── Journal ────────────────────────────────────────────────────────────────

function sortEntriesByDate(entries: JournalEntry[]): JournalEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getAllJournalEntries(): JournalEntry[] {
  return sortEntriesByDate(allJournalEntries)
}

export function getJournalEntriesByProject(projectSlug: string): JournalEntry[] {
  return sortEntriesByDate(
    allJournalEntries.filter((e) => e.project === projectSlug)
  )
}

export function getJournalEntryBySlug(slug: string): JournalEntry | null {
  return allJournalEntries.find((e) => e.slug === slug) ?? null
}

export function getLatestJournalEntries(count = 3): JournalEntry[] {
  return getAllJournalEntries().slice(0, count)
}

export function getAdjacentJournalEntries(slug: string): {
  prev: JournalEntry | null
  next: JournalEntry | null
} {
  const entries = getAllJournalEntries()
  const index = entries.findIndex((e) => e.slug === slug)
  return {
    prev: index < entries.length - 1 ? entries[index + 1] : null,
    next: index > 0 ? entries[index - 1] : null,
  }
}

// ─── Publications ────────────────────────────────────────────────────────────

export function getAllPublications(): Publication[] {
  return [...allPublications].sort((a, b) => {
    if (!a.publicationDate) return 1
    if (!b.publicationDate) return -1
    return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  })
}

export function getPublicationsByProject(projectSlug: string): Publication[] {
  return getAllPublications().filter((p) => p.project === projectSlug)
}

export function getPublicationBySlug(slug: string): Publication | null {
  return allPublications.find((p) => p.slug === slug) ?? null
}
