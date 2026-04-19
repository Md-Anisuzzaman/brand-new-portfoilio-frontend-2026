'use client'
import { useState, useTransition } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from './ProjectCard'
import { ProjectsSkeleton } from './ProjectsSkeleton'
import { CATEGORIES, PAGE_SIZE } from '@/lib/constants/project'
import { Category, Project, ProjectsResponse } from '@/lib/types/project'
import { fetchProjects } from '@/lib/services/project.services'
import { cn } from '@/lib/utils'

interface Props {
  initialData: ProjectsResponse
}

export function ProjectsGrid({ initialData }: Props) {
  const [category,  setCategory]  = useState<Category>('all')
  const [projects,  setProjects]  = useState<Project[]>(initialData.projects)
  const [total,     setTotal]     = useState(initialData.total)
  const [hasMore,   setHasMore]   = useState(initialData.hasMore)
  const [page,      setPage]      = useState(1)
  const [isPending, startTransition] = useTransition()

  function handleCategory(cat: Category) {
    if (cat === category) return
    setCategory(cat)
    setPage(1)
    startTransition(async () => {
      const res = await fetchProjects({ category: cat, page: 1, pageSize: PAGE_SIZE })
      setProjects(res.projects)
      setTotal(res.total)
      setHasMore(res.hasMore)
    })
  }

  function handleSeeMore() {
    const next = page + 1
    setPage(next)
    startTransition(async () => {
      const res = await fetchProjects({ category, page: next, pageSize: PAGE_SIZE })
      setProjects(prev => [...prev, ...res.projects])
      setTotal(res.total)
      setHasMore(res.hasMore)
    })
  }

  return (
    <div className="flex flex-col gap-8">

      {/* ── Filter section ── */}
      <div className="flex flex-col gap-3">

        {/* ✅ Native select — mobile only */}
        <div className="relative sm:hidden">
          <select
            value={category}
            disabled={isPending}
            onChange={e => handleCategory(e.target.value as Category)}
            className="w-full appearance-none
                       h-11 pl-4 pr-10 rounded-xl
                       text-sm font-medium
                       bg-white dark:bg-zinc-900
                       border border-zinc-200 dark:border-zinc-700
                       text-zinc-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       disabled:opacity-50 cursor-pointer"
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
                                   w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* ✅ Pill tabs — desktop only, always visible */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          {CATEGORIES.map(c => {
            const active = c.value === category
            return (
              <button
                key={c.value}
                onClick={() => handleCategory(c.value as Category)}
                disabled={isPending}
                className={cn(
                  'h-10 px-5 rounded-full text-sm font-medium',
                  'border transition-all duration-150',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  active
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                )}
              >
                {c.label}
              </button>
            )
          })}

          {/* Count + spinner */}
          <span className="ml-2 text-sm text-zinc-400 dark:text-zinc-500">
            {isPending
              ? <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border-2
                                   border-indigo-500 border-t-transparent
                                   animate-spin inline-block" />
                  Loading...
                </span>
              : `${total} project${total !== 1 ? 's' : ''}`
            }
          </span>
        </div>

        {/* Mobile count */}
        <p className="sm:hidden text-sm text-zinc-400 dark:text-zinc-500">
          {isPending ? 'Loading...' : `${total} project${total !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* ── Cards grid ── */}
      {isPending && page === 1 ? (
        <ProjectsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="animate-fade-in"
              style={{ animationDelay: `${(i % PAGE_SIZE) * 80}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      {/* ── See More ── */}
      {hasMore && !isPending && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="lg"
            onClick={handleSeeMore}
            disabled={isPending}
            className="gap-2 rounded-full px-8
                       border-zinc-200 dark:border-zinc-700
                       hover:border-indigo-400 dark:hover:border-indigo-500
                       hover:text-indigo-600 dark:hover:text-indigo-400
                       transition-all"
          >
            <ChevronDown className="w-4 h-4" />
            See More Projects
          </Button>
        </div>
      )}

      {isPending && page > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <div className="w-4 h-4 rounded-full border-2 border-indigo-500
                            border-t-transparent animate-spin" />
            Loading more...
          </div>
        </div>
      )}

      {!hasMore && total > PAGE_SIZE && (
        <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
          All {total} projects shown
        </p>
      )}

    </div>
  )
}