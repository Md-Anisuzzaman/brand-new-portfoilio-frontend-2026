import { Briefcase } from 'lucide-react'
import { Experience } from '@/lib/types/about'

export function AboutExperience({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="mb-20">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                        flex items-center justify-center shrink-0">
          <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Work Experience
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Where I&apos;ve worked and what I&apos;ve built
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">

        {/* Vertical line */}
        <div className="absolute left-5 top-5 bottom-5 w-px
                        bg-zinc-200 dark:bg-zinc-800
                        hidden sm:block" />

        {experiences.map((exp) => (
          <div key={exp.id}
            className="relative flex gap-6 pb-10 last:pb-0">

            {/* Dot on timeline */}
            <div className="hidden sm:flex flex-col items-center shrink-0">
              <div className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center
                z-10 bg-white dark:bg-zinc-950
                ${exp.current
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                  : 'border-zinc-300 dark:border-zinc-700'
                }
              `}>
                <div className={`
                  w-2.5 h-2.5 rounded-full
                  ${exp.current ? 'bg-indigo-500 animate-pulse' : 'bg-zinc-400 dark:bg-zinc-600'}
                `} />
              </div>
            </div>

            {/* Card */}
            <div className="flex-1 bg-white dark:bg-zinc-900
                            border border-zinc-200 dark:border-zinc-800
                            rounded-2xl p-6
                            hover:border-indigo-200 dark:hover:border-indigo-800
                            hover:shadow-md hover:shadow-zinc-100 dark:hover:shadow-zinc-900
                            transition-all duration-200">

              {/* Top row */}
              <div className="flex flex-col sm:flex-row
                              sm:items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold
                                   text-zinc-900 dark:text-white">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full text-xs
                                       font-semibold
                                       bg-indigo-50 dark:bg-indigo-950
                                       text-indigo-600 dark:text-indigo-400
                                       border border-indigo-200 dark:border-indigo-800">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {exp.company}
                    <span className="text-zinc-400 dark:text-zinc-600 mx-1.5">·</span>
                    <span className="text-zinc-400 dark:text-zinc-500">
                      {exp.type}
                    </span>
                  </p>
                </div>
                <span className="text-xs font-medium text-zinc-400
                                 dark:text-zinc-500 shrink-0
                                 bg-zinc-50 dark:bg-zinc-800
                                 px-3 py-1.5 rounded-lg
                                 border border-zinc-200 dark:border-zinc-700">
                  {exp.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-500 dark:text-zinc-400
                             leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map(tag => (
                  <span key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium
                               bg-zinc-100 dark:bg-zinc-800
                               text-zinc-600 dark:text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}