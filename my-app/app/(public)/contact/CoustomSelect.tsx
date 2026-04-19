'use client'
import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  id:          string
  value:       string
  onChange:    (val: string) => void
  options:     string[]
  placeholder: string
  error?:      string
}

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}: Props) {
  const [open, setOpen] = useState(false)
  const ref             = useRef<HTMLDivElement>(null)

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

  const selected = value || ''

  return (
    <div ref={ref} className="relative w-full">

      {/* ── Trigger ── */}
      <button
        type="button"
        id={id}
        onClick={() => setOpen(o => !o)}
        className={cn(
          'w-full flex items-center justify-between gap-2',
          'px-4 py-2.5 rounded-xl text-sm text-left',
          'bg-zinc-50 dark:bg-zinc-800/50',
          'border transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
          open && 'ring-2 ring-indigo-500 border-transparent',
          error
            ? 'border-red-400 dark:border-red-500'
            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
        )}
      >
        <span className={cn(
          'truncate',
          selected
            ? 'text-zinc-900 dark:text-white'
            : 'text-zinc-400 dark:text-zinc-500'
        )}>
          {selected || placeholder}
        </span>
        <ChevronDown className={cn(
          'w-4 h-4 shrink-0 transition-transform duration-200',
          open
            ? 'rotate-180 text-indigo-500'
            : 'text-zinc-400'
        )} />
      </button>

      {/* ── Dropdown ── */}
      <div className={cn(
        'absolute z-50 w-full mt-1.5',
        'bg-white dark:bg-zinc-900',
        'border border-zinc-200 dark:border-zinc-700',
        'rounded-xl shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50',
        'overflow-hidden',
        'transition-all duration-200 origin-top',
        open
          ? 'opacity-100 scale-y-100 translate-y-0'
          : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none'
      )}>
        <ul className="py-1 max-h-56 overflow-y-auto
                       scrollbar-thin scrollbar-thumb-zinc-200
                       dark:scrollbar-thumb-zinc-700">
          {options.map(opt => {
            const active = opt === selected
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center justify-between gap-3',
                    'px-4 py-2.5 text-sm text-left',
                    'transition-colors duration-100',
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  )}
                >
                  <span>{opt}</span>
                  {active && (
                    <Check className="w-3.5 h-3.5 text-indigo-600
                                      dark:text-indigo-400 shrink-0" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  )
}