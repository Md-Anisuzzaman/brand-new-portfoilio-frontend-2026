import { GraduationCap } from 'lucide-react'
import { Education } from '@/lib/types/about'

export function AboutEducation({ educations }: { educations: Education[] }) {
  return (
    <section className="mb-20">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                        flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Education
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Academic background and self-study
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {educations.map(edu => (
          <div key={edu.id}
            className="flex flex-col gap-4 p-6 rounded-2xl
                       bg-white dark:bg-zinc-900
                       border border-zinc-200 dark:border-zinc-800
                       hover:border-indigo-200 dark:hover:border-indigo-800
                       hover:shadow-md transition-all duration-200">

            {/* Icon + degree */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl shrink-0
                              bg-indigo-50 dark:bg-indigo-950
                              flex items-center justify-center">
                <GraduationCap className="w-5 h-5
                                          text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold
                               text-zinc-900 dark:text-white
                               leading-snug mb-1">
                  {edu.degree}
                </h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400
                               font-medium">
                  {edu.school}
                </p>
              </div>
            </div>

            {/* Period + grade */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium
                               text-zinc-400 dark:text-zinc-500
                               bg-zinc-50 dark:bg-zinc-800
                               border border-zinc-200 dark:border-zinc-700
                               px-3 py-1 rounded-lg">
                {edu.period}
              </span>
              {edu.grade && (
                <span className="text-xs font-semibold
                                 text-green-600 dark:text-green-400
                                 bg-green-50 dark:bg-green-950/40
                                 border border-green-200 dark:border-green-900
                                 px-3 py-1 rounded-lg">
                  {edu.grade}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-500 dark:text-zinc-400
                           leading-relaxed">
              {edu.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  )
}