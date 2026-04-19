export function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800
                     bg-white dark:bg-zinc-900 overflow-hidden animate-pulse"
        >
          {/* Image placeholder */}
          <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-700" />
          <div className="p-5 flex flex-col gap-3">
            <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-full" />
              <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-4/5" />
            </div>
            <div className="flex gap-2 pt-1">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-6 w-14 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}