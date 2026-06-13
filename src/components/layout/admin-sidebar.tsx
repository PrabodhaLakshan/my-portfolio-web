"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Award, BriefcaseBusiness, FolderKanban, GraduationCap, Home, LayoutDashboard,
  LogOut, Mail, Settings, Sparkles, UserRound, Wrench,
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
    <aside className="glass fixed inset-y-0 left-0 z-40 hidden w-64 rounded-none border-y-0 border-l-0 p-4 lg:block">
      <Link href="/admin" className="mb-7 flex items-center gap-3 px-3 py-3 font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 text-slate-950">P</span> Portfolio Admin</Link>
      <nav className="space-y-1">
        {items.map(([href, label, Icon]) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white", active && "bg-cyan-400/10 text-cyan-200")}><Icon size={17} /> {label}</Link>;
        })}
      </nav>
      <div className="absolute bottom-4 inset-x-4 space-y-1">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"><Home size={17} /> Visit website</Link>
        <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-300 hover:bg-red-400/5"><LogOut size={17} /> Logout</button>
      </div>
    </aside>
  );
}
