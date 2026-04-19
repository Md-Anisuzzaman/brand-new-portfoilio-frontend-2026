import { DEMO_PROJECTS } from '@/lib/data/projects.demo'
import {
  Project,
  ProjectsParams,
  ProjectsResponse,
  Category,
} from '@/lib/types/project'
// import { PAGE_SIZE } from '@/lib/constants/project'

// ─────────────────────────────────────────────────────────────────
//  HOW TO SWITCH TO REAL API LATER:
//
//  1. Set NEXT_PUBLIC_API_URL in .env.local
//  2. The functions below automatically use real API
//  3. Delete lib/data/projects.demo.ts
//  4. Done — zero changes in components needed
// ─────────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL

// ── Internal: decide demo vs real ────────────────────────────────
function isDemo(): boolean {
  return !API_URL
}

// ── Internal: base fetch (used when API is ready) ─────────────────
async function fetchFromApi<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${API_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }
  const res = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },    // ISR — change to cache:'no-store' for live data
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`)
  return res.json()
}

// ── Internal: demo pagination logic ───────────────────────────────
function paginateDemo(
  all: Project[],
  page: number,
  pageSize: number
): ProjectsResponse {
  const start   = (page - 1) * pageSize
  const sliced  = all.slice(start, start + pageSize)
  return {
    projects: sliced,
    total:    all.length,
    hasMore:  start + pageSize < all.length,
  }
}

// ── Internal: placeholder cards when category has no projects ──────
function makePlaceholders(category: Category): Project[] {
  return Array.from({ length: 3 }, (_, i) => ({
    id:            `placeholder-${category}-${i}`,
    title:         'Project Coming Soon',
    description:   `A new ${category} project is currently in development. Check back soon to see what's being built!`,
    category,
    tags:          ['Coming Soon'],
    liveUrl:       '#',
    githubUrl:     '#',
    color:         '#94a3b8',
    isPlaceholder: true,
  }))
}

// ─────────────────────────────────────────────────────────────────
//  PUBLIC API — components only call these functions
// ─────────────────────────────────────────────────────────────────

// Get paginated projects (called on page load + See More)
export async function fetchProjects(
  params: ProjectsParams
): Promise<ProjectsResponse> {
  const { category, page, pageSize } = params

  // ── DEMO ──────────────────────────────────────────────────────
  if (isDemo()) {
    const filtered =
      category === 'all'
        ? DEMO_PROJECTS
        : DEMO_PROJECTS.filter(p => p.category === category)

    const data = filtered.length > 0
      ? filtered
      : makePlaceholders(category)

    return paginateDemo(data, page, pageSize)
  }

  // ── REAL API (uncomment when backend ready) ────────────────────
  // Backend should accept: GET /projects?category=frontend&page=1&pageSize=3
  // Backend should return: { projects: Project[], total: number, hasMore: boolean }
  return fetchFromApi<ProjectsResponse>('/projects', {
    ...(category !== 'all' && { category }),
    page:     String(page),
    pageSize: String(pageSize),
  })
}

// Get single project by ID
export async function fetchProjectById(id: string): Promise<Project | null> {
  if (isDemo()) {
    return DEMO_PROJECTS.find(p => p.id === id) ?? null
  }

  // Backend: GET /projects/:id
  return fetchFromApi<Project>(`/projects/${id}`)
}


///////////////////////////////////////////////////////////////////////////////

// import { Project,Category } from '@/lib/types/project'
// import { DEMO_PROJECTS } from '@/lib/data/projects.demo'


// ─────────────────────────────────────────────────────────────
// Dashboard CRUD service
// NOW:   operates on in-memory demo data
// LATER: replace each function body with real API call
// Shape stays identical — zero component changes needed
// ─────────────────────────────────────────────────────────────

// In-memory store — simulates DB for demo
let store: Project[] = [...DEMO_PROJECTS]

// ── GET all ───────────────────────────────────────────────────
export async function dashboardGetProjects(): Promise<Project[]> {
  // LATER: return fetch(`${API}/projects`).then(r => r.json())
  return structuredClone(store)
}

// ── GET one ───────────────────────────────────────────────────
export async function dashboardGetProject(id: string): Promise<Project | null> {
  // LATER: return fetch(`${API}/projects/${id}`).then(r => r.json())
  return store.find(p => p.id === id) ?? null
}

// ── CREATE ────────────────────────────────────────────────────
export async function dashboardCreateProject(
  data: Omit<Project, 'id'>
): Promise<Project> {
  // LATER:
  // return fetch(`${API}/projects`, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // }).then(r => r.json())

  const newProject: Project = {
    ...data,
    id: Date.now().toString(),
  }
  store = [newProject, ...store]
  return newProject
}

// ── UPDATE ────────────────────────────────────────────────────
export async function dashboardUpdateProject(
  id: string,
  data: Partial<Omit<Project, 'id'>>
): Promise<Project | null> {
  // LATER:
  // return fetch(`${API}/projects/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(data),
  // }).then(r => r.json())

  const index = store.findIndex(p => p.id === id)
  if (index === -1) return null
  store[index] = { ...store[index], ...data }
  return store[index]
}

// ── DELETE ────────────────────────────────────────────────────
export async function dashboardDeleteProject(id: string): Promise<boolean> {
  // LATER:
  // return fetch(`${API}/projects/${id}`, {
  //   method: 'DELETE',
  // }).then(r => r.ok)

  const before = store.length
  store = store.filter(p => p.id !== id)
  return store.length < before
}