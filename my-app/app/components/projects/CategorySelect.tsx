'use client'
import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/lib/constants/project'
import { Category } from '@/lib/types/project'

const CATEGORY_META: Record<Category, { emoji: string; desc: string }> = {
  all:       { emoji: '✦', desc: "Everything I&apos;ve built" },
  frontend:  { emoji: '🎨', desc: 'UI & visual experiences' },
  fullstack: { emoji: '⚡', desc: 'End-to-end applications' },
  backend:   { emoji: '⚙️', desc: 'APIs & server systems' },
  mobile:    { emoji: '📱', desc: 'iOS & Android apps' },
  devops:    { emoji: '🚀', desc: 'CI/CD & Infrastructure' },
  ai:        { emoji: '🤖', desc: 'Machine Learning & AI' }
};

type Props = {
  value: Category
  onChange: (cat: Category) => void
  disabled?: boolean
  total: number
}

export function CategorySelect({ value, onChange, disabled, total }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = CATEGORIES.find(c => c.value === value)!
  const meta     = CATEGORY_META[value]

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full sm:w-auto">

      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(o => !o)}
        disabled={disabled}
        className={cn(
          'group relative flex items-center gap-3',
          'w-full sm:w-72 px-4 py-3 rounded-2xl',
          'bg-white dark:bg-zinc-900',
          'border-2 transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          open
            ? 'border-indigo-500 dark:border-indigo-400 shadow-lg shadow-indigo-500/10'
            : 'border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-600'
        )}
      >
        {/* Left icon */}
        <span className={cn(
          'flex items-center justify-center w-9 h-9 rounded-xl text-base shrink-0',
          'transition-colors duration-200',
          open
            ? 'bg-indigo-600 text-white'
            : 'bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950'
        )}>
          {meta.emoji}
        </span>

        {/* Label + desc */}
        <div className="flex flex-col items-start flex-1 min-w-0">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white leading-none mb-0.5">
            {selected.label}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate w-full text-left">
            {meta.desc}
          </span>
        </div>

        {/* Count badge */}
        <span className={cn(
          'shrink-0 px-2 py-0.5 rounded-full text-xs font-bold',
          'transition-colors duration-200',
          open
            ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
        )}>
          {total}
        </span>

        {/* Chevron */}
        <ChevronDown className={cn(
          'w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-300',
          open && 'rotate-180 text-indigo-500'
        )} />
      </button>

      {/* ── Dropdown panel ── */}
      <div className={cn(
        'absolute top-full left-0 right-0 sm:right-auto sm:min-w-72 mt-2 z-50',
        'bg-white dark:bg-zinc-900',
        'border border-zinc-200 dark:border-zinc-700',
        'rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-zinc-950/50',
        'overflow-hidden',
        'transition-all duration-200 origin-top',
        open
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      )}>

        {/* Dropdown header */}
        <div className="flex items-center gap-2 px-4 py-3
                        border-b border-zinc-100 dark:border-zinc-800">
          <Layers className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500
                           uppercase tracking-wider">
            Filter by category
          </span>
        </div>

        {/* Options */}
        <div className="p-2">
          {CATEGORIES.map((cat, i) => {
            const m       = CATEGORY_META[cat.value as Category]
            const active  = cat.value === value
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => {
                  onChange(cat.value as Category)
                  setOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
                  'transition-all duration-150 text-left group/item',
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-950'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                )}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {/* Emoji icon */}
                <span className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-lg text-sm shrink-0',
                  'transition-colors duration-150',
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 group-hover/item:bg-indigo-50 dark:group-hover/item:bg-indigo-950'
                )}>
                  {m.emoji}
                </span>

                {/* Label + desc */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className={cn(
                    'text-sm font-medium leading-none mb-0.5',
                    active
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : 'text-zinc-800 dark:text-zinc-200'
                  )}>
                    {cat.label}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                    {m.desc}
                  </span>
                </div>

                {/* Check on active */}
                {active && (
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800
                        bg-zinc-50 dark:bg-zinc-800/50">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700
                                  text-zinc-600 dark:text-zinc-300 font-mono text-xs">
              Esc
            </kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}