"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { socialLinks, navConfig } from "./nav-config";
import { Zap } from "lucide-react";
import { NavLinks } from "./navLinks";
import { MobileMenu } from "./mobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // ✅ Add border + backdrop on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16",
        "transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
          : "bg-transparent",
      )}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* ─── Logo ─── */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="lg:w-[40] lg:h-[50] w-8 h-8 m:w-8 m:h-8 rounded-lg bg-indigo-600 flex items-center justify-center
                          transition-transform duration-200 group-hover:scale-110"
          >
            <Zap className="w-50 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-zinc-900 dark:text-white leading-none">
              {navConfig.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {navConfig.title}
            </p>
          </div>
        </Link>

        {/* ─── Desktop nav ─── */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLinks />
        </nav>

        {/* ─── Desktop right side ─── */}
        <div className="hidden md:flex items-center gap-2">
          {/* Social icons */}
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400
                         hover:text-zinc-900 dark:hover:text-white
                         hover:bg-zinc-100 dark:hover:bg-zinc-800
                         transition-all duration-150 hover:scale-110"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}

          {/* CTA */}
          <Button
            asChild
            size="sm"
            className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white
                       transition-transform duration-150 hover:scale-105"
          >
            <Link href="/contact">Hire Me</Link>
          </Button>
        </div>

        {/* ─── Mobile hamburger ─── */}
        <MobileMenu />
      </div>
    </header>
  );
}
