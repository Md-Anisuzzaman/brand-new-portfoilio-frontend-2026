// ─────────────────────────────────────────────
// Shared types — match these with your backend
// response shape exactly when API is ready
// ─────────────────────────────────────────────

export type Category =
  | 'all'
  | 'frontend'
  | 'fullstack'
  | 'backend'
  | 'mobile'
  | 'devops'    
  | 'ai'        

export interface Project {
  id: string
  title: string
  thumbnail?: string
  description: string
  category: Category
  tags: string[]
  liveUrl: string
  githubUrl: string
  color: string
  featured?: boolean
  isPlaceholder?: boolean   // true = "coming soon" card
}

// What the service always returns — demo or real API
export interface ProjectsResponse {
  projects: Project[]
  total: number
  hasMore: boolean
}

// What callers pass in to query
export interface ProjectsParams {
  category: Category
  page: number
  pageSize: number
}