import { cn } from '@/lib/utils'

export const inputCls = cn(
  'w-full px-4 py-2.5 rounded-xl text-sm',
  'bg-zinc-50 dark:bg-zinc-800',
  'border border-zinc-200 dark:border-zinc-700',
  'text-zinc-900 dark:text-white placeholder:text-zinc-400',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
  'transition-colors'
)

export const labelCls =
  'text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide'

export const sectionCls = cn(
  'rounded-2xl border border-zinc-200 dark:border-zinc-800',
  'bg-white dark:bg-zinc-900 overflow-hidden'
)

export const sectionHeaderCls = cn(
  'flex items-center justify-between px-6 py-4',
  'border-b border-zinc-100 dark:border-zinc-800',
  'bg-zinc-50 dark:bg-zinc-800/50'
)