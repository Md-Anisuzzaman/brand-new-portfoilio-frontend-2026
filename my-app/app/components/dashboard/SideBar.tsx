"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  Globe,
  Zap,
  Briefcase,
  Code2,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/pages/home", label: "Home Page", icon: FileText },
  { href: "/dashboard/pages/about", label: "About Page", icon: Users },
  { href: "/dashboard/pages/projects", label: "Projects", icon: Image },
  { href: "/dashboard/pages/skills", label: "Skills", icon: Code2 }, // New
  { href: "/dashboard/pages/services", label: "Services", icon: Briefcase }, // New
  { href: "/dashboard/pages/contact", label: "Contact", icon: Settings },
  { href: "/dashboard/pages/blog", label: "Blog Posts", icon: FileText },
];

// ✅ removed onToggle — topbar handles toggle now
type Props = {
  collapsed: boolean;
};

export function Sidebar({ collapsed }: Props) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen",
          "bg-zinc-900 text-white border-r border-zinc-800",
          "transition-all duration-300 ease-in-out shrink-0 overflow-hidden",
          collapsed ? "w-14" : "w-56",
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "h-14 flex items-center border-b border-zinc-800 shrink-0",
            collapsed ? "justify-center" : "px-4",
          )}
        >
          <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
          {!collapsed && (
            <span className="ml-2 font-bold text-base whitespace-nowrap">
              MyCMS
            </span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-3 px-2 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            const linkEl = (
              <Link
                href={href}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium",
                  "transition-colors duration-150 whitespace-nowrap overflow-hidden",
                  collapsed
                    ? "justify-center w-10 h-10 mx-auto"
                    : "gap-3 px-3 py-2.5",
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );

            return collapsed ? (
              <Tooltip key={href}>
                <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <span key={href}>{linkEl}</span>
            );
          })}
        </nav>

        <Separator className="bg-zinc-800" />

        {/* Live site */}
        <div className="p-2">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  target="_blank"
                  className="flex justify-center items-center w-10 h-10 mx-auto
                             rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Live Site ↗</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                         text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Live Site ↗</span>
            </Link>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
