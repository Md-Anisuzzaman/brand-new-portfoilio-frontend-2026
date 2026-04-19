import { cn } from '@/lib/utils'
import { Service } from '@/lib/types/services'
import {
  Monitor, Server, Layers, Database,
  Webhook, Code2, Check, Sparkles,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Layers,
  Database,
  Webhook,
  Code2,
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.icon] ?? Code2

  return (
    <div className={cn(
      'relative flex flex-col rounded-2xl p-6 gap-5',
      'bg-white dark:bg-zinc-900',
      'border-2 transition-all duration-300',
      'hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-100 dark:hover:shadow-zinc-900',
      service.popular
        ? 'border-indigo-500 dark:border-indigo-400'
        : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700'
    )}>

      {/* Popular badge */}
      {service.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="flex items-center gap-1.5 px-4 py-1 rounded-full
                           bg-indigo-600 text-white text-xs font-semibold
                           shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${service.color}18` }}
      >
        <Icon
          className="w-6 h-6"
          style={{ color: service.color }}
        />
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          {service.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2 flex-1">
        {service.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 w-4 h-4 rounded-full flex items-center
                         justify-center shrink-0"
              style={{ backgroundColor: `${service.color}20` }}
            >
              <Check
                className="w-2.5 h-2.5"
                style={{ color: service.color }}
                strokeWidth={3}
              />
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 pt-2
                      border-t border-zinc-100 dark:border-zinc-800">
        {service.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-xs font-medium
                       bg-zinc-50 dark:bg-zinc-800
                       text-zinc-500 dark:text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  )
}