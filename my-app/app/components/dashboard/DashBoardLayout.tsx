"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LogOut, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./SideBar";
import { MobileSidebar } from "./MobileSideBar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <Sidebar collapsed={collapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <header
          className="h-14 shrink-0 bg-white border-b border-zinc-200
                           flex items-center px-4 gap-3 z-10"
        >
          {/* ✅ Desktop toggle — always visible, switches icon based on state */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((c) => !c)}
            className="hidden md:flex text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </Button>

          {/* Mobile hamburger */}
          <MobileSidebar />

          <span className="font-semibold text-zinc-800 text-sm">Dashboard</span>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-zinc-500 hidden sm:block">Admin</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Logout</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
