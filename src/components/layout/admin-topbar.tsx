"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["/admin", "Dashboard"], ["/admin/profile", "Profile"], ["/admin/projects", "Projects"],
  ["/admin/skills", "Skills"], ["/admin/education", "Education"], ["/admin/experience", "Experience"],
  ["/admin/certificates", "Certificates"], ["/admin/services", "Services"],
  ["/admin/messages", "Messages"], ["/admin/settings", "Settings"],
] as const;

export function AdminTopbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3"><button onClick={() => setOpen(!open)} className="rounded-xl border border-white/10 p-2 lg:hidden" aria-label="Open admin navigation">{open ? <X size={17} /> : <Menu size={17} />}</button><div><p className="text-sm font-semibold">Content dashboard</p><p className="hidden text-xs text-slate-500 sm:block">Manage your public portfolio</p></div></div>
        <div className="flex items-center gap-2">
          <Link href="/" target="_blank" className="rounded-xl border border-white/10 p-2.5 text-slate-400 hover:text-cyan-300" aria-label="Open website"><ExternalLink size={17} /></Link>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="rounded-xl border border-white/10 p-2.5 text-slate-400 hover:text-red-300" aria-label="Logout"><LogOut size={17} /></button>
        </div>
      </div>
      {open && <nav className="grid grid-cols-2 gap-1 border-t border-white/5 p-3 lg:hidden">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white">{label}</Link>)}</nav>}
    </header>
  );
}
