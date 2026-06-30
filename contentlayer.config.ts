import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

// ─── Project ────────────────────────────────────────────────────────────────

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
      description: 'Full project title',
    },
    slug: {
      type: 'string',
      required: true,
      description: 'URL-safe identifier (e.g. project-001-biso)',
    },
    projectNumber: {
      type: 'string',
      required: true,
      description: 'Display number (e.g. 001)',
    },
    shortTitle: {
      type: 'string',
      required: false,
      description: 'Short display label used in badges and navigation (e.g. BISO Governance)',
    },
    status: {
      type: 'enum',
      options: ['active', 'completed', 'planned', 'paused'],
      required: true,
    },
    stage: {
      type: 'enum',
      options: [
        'concept',
        'literature-review',
        'proposal',
        'interviews',
        'analysis',
        'draft',
        'publication',
      ],
      required: true,
    },
    researchQuestion: {
      type: 'string',
      required: true,
    },
    workingThesis: {
      type: 'string',
      required: true,
    },
    thesisVersion: {
      type: 'number',
      required: true,
    },
    researchGap: {
      type: 'string',
      required: true,
      description: 'Why this research matters — used for Why This Matters section',
    },
    methodology: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    startDate: {
      type: 'string',
      required: true,
    },
    updatedDate: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    featured: {
      type: 'boolean',
      required: true,
      description: 'Controls homepage prominence',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/research/${doc.slug}`,
    },
  },
}))

// ─── Artifact ───────────────────────────────────────────────────────────────

export const Artifact = defineDocumentType(() => ({
  name: 'Artifact',
  filePathPattern: 'artifacts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    artifactType: {
      type: 'enum',
      options: [
        'research-proposal',
        'literature-matrix',
        'annotated-bibliography',
        'research-insights',
        'research-data',
        'interview-guide',
        'interview-pool',
        'interview-analysis',
        'paper-outline',
        'draft-paper',
        'final-paper',
        'presentation',
      ],
      required: true,
    },
    version: {
      type: 'number',
      required: true,
      description: 'Current version number — history tracked in Git',
    },
    status: {
      type: 'enum',
      options: ['stub', 'draft', 'active', 'superseded', 'published'],
      required: true,
    },
    project: {
      type: 'string',
      required: true,
      description: 'Parent project slug',
    },
    description: {
      type: 'string',
      required: true,
      description: '1-2 sentence description for listing views',
    },
    createdDate: {
      type: 'string',
      required: true,
    },
    updatedDate: {
      type: 'string',
      required: true,
    },
    downloadUrl: {
      type: 'string',
      required: false,
      description: 'Path to PDF in /public/downloads/',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/research/${doc.project}/artifacts/${doc.slug}`,
    },
  },
}))

// ─── Journal Entry ──────────────────────────────────────────────────────────

export const JournalEntry = defineDocumentType(() => ({
  name: 'JournalEntry',
  filePathPattern: 'journal/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
      description: 'ISO date — drives sort order',
    },
    category: {
      type: 'enum',
      options: ['milestone', 'reflection', 'update', 'observation'],
      required: true,
    },
    project: {
      type: 'string',
      required: true,
      description: 'Parent project slug — enables project-scoped filtering',
    },
    summary: {
      type: 'string',
      required: true,
      description: '1-2 sentence abstract shown in listing views',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/journal/${doc.slug}`,
    },
  },
}))

// ─── Publication ────────────────────────────────────────────────────────────

export const Publication = defineDocumentType(() => ({
  name: 'Publication',
  filePathPattern: 'publications/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    authors: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    publicationDate: {
      type: 'string',
      required: false,
      description: 'Optional — may not exist until submitted or published',
    },
    version: {
      type: 'number',
      required: true,
    },
    status: {
      type: 'enum',
      options: ['draft', 'submitted', 'published'],
      required: true,
    },
    abstract: {
      type: 'string',
      required: true,
    },
    downloadUrl: {
      type: 'string',
      required: false,
    },
    citationText: {
      type: 'string',
      required: false,
      description: 'Formatted citation — populated at submission/publication',
    },
    project: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/publications/${doc.slug}`,
    },
  },
}))

// ─── Source ─────────────────────────────────────────────────────────────────

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, Artifact, JournalEntry, Publication],
})
