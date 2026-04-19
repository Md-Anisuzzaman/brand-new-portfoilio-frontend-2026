'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navLinks } from './nav-config'

export function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={cn(
              'group relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium',
              'transition-all duration-200',
              active
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            )}
          >
            <Icon className={cn(
              'w-4 h-4 transition-transform duration-200 group-hover:scale-110',
              active && 'text-indigo-600 dark:text-indigo-400'
            )} />
            <span>{label}</span>

            {/* ✅ Active underline indicator */}
            {active && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}

            {/* ✅ Hover background */}
            <span className={cn(
              'absolute inset-0 rounded-lg transition-colors duration-200',
              'group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800',
              active && 'bg-indigo-50 dark:bg-indigo-950',
              '-z-10'
            )} />
          </Link>
        )
      })}
    </>
  )
}