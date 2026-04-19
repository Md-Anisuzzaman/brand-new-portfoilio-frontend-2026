"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Menu, X, Zap } from "lucide-react";
import { navLinks, socialLinks, navConfig } from "./nav-config";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-72 p-0 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>

          {/* Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-100 dark:border-zinc-800 mt-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white leading-none">
                  {navConfig.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {navConfig.title}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 p-3">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                    "transition-all duration-150",
                    active
                      ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      active
                        ? "bg-indigo-100 dark:bg-indigo-900"
                        : "bg-zinc-100 dark:bg-zinc-800",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  {label}
                </Link>
              );
            })}
          </nav>

          <Separator className="mx-3 bg-zinc-100 dark:bg-zinc-800" />

          {/* Social links */}
          <div className="p-4">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3 px-1">
              Find me on
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                             text-xs font-medium text-zinc-600 dark:text-zinc-400
                             bg-zinc-50 dark:bg-zinc-900
                             hover:bg-zinc-100 dark:hover:bg-zinc-800
                             hover:text-zinc-900 dark:hover:text-white
                             transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-4 pt-0">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full py-3 rounded-xl
                         bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium
                         transition-colors duration-150"
            >
              Hire Me
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
