import {
  Code2, Zap, Users,
  Shield, RefreshCw, MessageSquare,
} from 'lucide-react'
import { Value } from '@/lib/types/about'

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Zap, Users, Shield, RefreshCw, MessageSquare,
}

export function AboutValues({ values }: { values: Value[] }) {
  return (
    <section className="mb-20">

      {/* Section header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
                        flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            How I Work
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Principles that guide every project I take on
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {values.map((val) => {
          const Icon = ICON_MAP[val.icon] ?? Code2
          return (
            <div key={val.id}
              className="flex flex-col gap-4 p-6 rounded-2xl
                         bg-white dark:bg-zinc-900
                         border border-zinc-200 dark:border-zinc-800
                         hover:border-indigo-200 dark:hover:border-indigo-800
                         hover:-translate-y-0.5 hover:shadow-md
                         hover:shadow-zinc-100 dark:hover:shadow-zinc-900
                         transition-all duration-200 group">

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl
                              bg-indigo-50 dark:bg-indigo-950
                              flex items-center justify-center
                              group-hover:bg-indigo-100
                              dark:group-hover:bg-indigo-900
                              transition-colors">
                <Icon className="w-5 h-5
                                 text-indigo-600 dark:text-indigo-400" />
              </div>

              <div>
                <h3 className="text-sm font-bold
                               text-zinc-900 dark:text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400
                               leading-relaxed">
                  {val.desc}
                </p>
              </div>

            </div>
          )
        })}
      </div>
    </section>
  )
}