'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SkillCategory } from '@/lib/types/skill'
import { SkillCard } from './SkillCard'

export function SkillsTabs({ categories }: { categories: SkillCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? '')

  const current = categories.find(c => c.id === active)

  return (
    <div className="flex flex-col gap-8">

      {/* ── Tabs ── */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={cn(
              'h-10 px-5 rounded-full text-sm font-medium',
              'border transition-all duration-150',
              active === cat.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
            )}
          >
            {cat.label}
            {/* skill count badge */}
            <span className={cn(
              'ml-2 px-1.5 py-0.5 rounded-full text-xs',
              active === cat.id
                ? 'bg-indigo-500 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
            )}>
              {cat.skills.length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Skills grid for active tab ── */}
      {current && (
        <div
          key={active}   // ✅ key change triggers fade-in on tab switch
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8
                     gap-3 animate-fade-in"
        >
          {current.skills.map(skill => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
            />
          ))}
        </div>
      )}

    </div>
  )
}