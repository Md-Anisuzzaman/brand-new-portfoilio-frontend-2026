import { Project } from '@/lib/types/project'
import { Layers, Globe, Server, Smartphone, Monitor, Star } from 'lucide-react'

const STAT_CONFIG = [
  { key: 'all',       label: 'Total Projects', icon: Layers,    color: 'indigo' },
  { key: 'fullstack', label: 'Full-Stack',      icon: Globe,     color: 'violet' },
  { key: 'frontend',  label: 'Frontend',        icon: Monitor,   color: 'amber'  },
  { key: 'backend',   label: 'Backend',         icon: Server,    color: 'red'    },
  { key: 'mobile',    label: 'Mobile',          icon: Smartphone,color: 'pink'   },
  { key: 'featured',  label: 'Featured',        icon: Star,      color: 'green'  },
]

const COLOR_MAP: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400',
  violet: 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
  amber:  'bg-amber-50  dark:bg-amber-950  text-amber-600  dark:text-amber-400',
  red:    'bg-red-50    dark:bg-red-950    text-red-600    dark:text-red-400',
  pink:   'bg-pink-50   dark:bg-pink-950   text-pink-600   dark:text-pink-400',
  green:  'bg-green-50  dark:bg-green-950  text-green-600  dark:text-green-400',
}

export function ProjectsStats({ projects }: { projects: Project[] }) {
  function count(key: string) {
    if (key === 'all')      return projects.length
    if (key === 'featured') return projects.filter(p => p.featured).length
    return projects.filter(p => p.category === key).length
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {STAT_CONFIG.map(({ key, label, icon: Icon, color }) => (
        <div key={key}
          className="flex flex-col gap-3 p-4 rounded-2xl
                     bg-white dark:bg-zinc-900
                     border border-zinc-200 dark:border-zinc-800">
          <div className={`w-9 h-9 rounded-xl flex items-center
                           justify-center ${COLOR_MAP[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {count(key)}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}