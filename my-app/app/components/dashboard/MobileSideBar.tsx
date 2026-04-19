'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, FileText, Image,
  Users, Settings, Globe, Menu, Zap, X,Briefcase,Code2
} from 'lucide-react'

// const links = [
//   { href: '/dashboard',                  label: 'Dashboard',  icon: LayoutDashboard },
//   { href: '/dashboard/pages/home',       label: 'Home Page',  icon: FileText },
//   { href: '/dashboard/pages/about',      label: 'About Page', icon: Users },
//   { href: '/dashboard/pages/projects',   label: 'Projects',   icon: Image },
//   { href: '/dashboard/pages/contact',    label: 'Contact',    icon: Settings },
//   { href: '/dashboard/blog',             label: 'Blog Posts', icon: FileText },
// ]

const links = [
  { href: '/dashboard',                label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/dashboard/pages/home',      label: 'Home Page',   icon: FileText },
  { href: '/dashboard/pages/about',     label: 'About Page',  icon: Users },
  { href: '/dashboard/pages/projects',  label: 'Projects',    icon: Image },
  { href: '/dashboard/pages/skills',    label: 'Skills',      icon: Code2 },     // New
  { href: '/dashboard/pages/services',  label: 'Services',    icon: Briefcase }, // New
  { href: '/dashboard/pages/contact',   label: 'Contact',     icon: Settings },
  { href: '/dashboard/pages/blog',      label: 'Blog Posts',  icon: FileText },
];

export function MobileSidebar() {
  const pathname = usePathname()

  // ✅ Never open on desktop from the start — no effect needed for init
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')

    // ✅ Only setState inside the event callback — NOT in effect body
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)

    // ✅ No setOpen() call here in the effect body — ESLint happy
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden shrink-0"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-zinc-900 border-zinc-800">

          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>

          <div className="h-14 flex items-center justify-between px-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-white text-base">MyCMS</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <nav className="flex flex-col gap-1 py-3 px-2">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </Link>
              )
            })}
          </nav>

          <Separator className="bg-zinc-800" />

          <div className="p-2">
            <Link
              href="/"
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                         text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Live Site ↗</span>
            </Link>
          </div>

        </SheetContent>
      </Sheet>
    </>
  )
}