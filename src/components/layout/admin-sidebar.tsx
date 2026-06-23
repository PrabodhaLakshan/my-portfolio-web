"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Award, BriefcaseBusiness, FolderKanban, GraduationCap, Home, LayoutDashboard,
  LogOut, Mail, Settings, ShieldCheck, Sparkles, UserRound, Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  ["/admin", "Dashboard", LayoutDashboard],
  ["/admin/profile", "Profile", UserRound],
  ["/admin/projects", "Projects", FolderKanban],
  ["/admin/skills", "Skills", Sparkles],
  ["/admin/education", "Education", GraduationCap],
  ["/admin/experience", "Experience", BriefcaseBusiness],
  ["/admin/certificates", "Certificates", Award],
  ["/admin/services", "Services", Wrench],
  ["/admin/messages", "Messages", Mail],
  ["/admin/settings", "Settings", Settings],
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/5 bg-slate-950/90 p-4 backdrop-blur-xl lg:block">
      {/* Subtle cyber grid on sidebar */}
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgb(34 211 238 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(34 211 238 / 0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Logo */}
      <Link href="/admin" className="relative mb-7 flex items-center gap-3 px-3 py-3 font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          <ShieldCheck size={18} />
        </span>
        <span className="text-sm">
          Portfolio <span className="text-cyan-300">Admin</span>
        </span>
      </Link>
      {/* Nav items */}
      <nav className="relative space-y-0.5">
        {items.map(([href, label, Icon]) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                active
                  ? "bg-cyan-400/10 text-cyan-200 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] border border-cyan-400/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              <Icon
                size={17}
                className={active ? "text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" : ""}
              />
              {label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />}
            </Link>
          );
        })}
      </nav>
      {/* Bottom actions */}
      <div className="absolute inset-x-4 bottom-4 space-y-0.5">
        <div className="mb-2 border-t border-white/5 pt-2" />
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
          <Home size={17} /> Visit website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-red-400/70 transition hover:border-red-400/10 hover:bg-red-400/5 hover:text-red-300"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  );
}

