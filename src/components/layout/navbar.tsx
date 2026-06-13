"use client";

import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/common/theme-toggle";

const links = ["Home", "About", "Skills", "Projects", "Education", "Experience", "Certificates", "Services", "Contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <nav className="container-shell flex h-16 items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 font-semibold text-white">
          <ShieldCheck className="text-cyan-300" size={22} />
          <span>WMP<span className="text-cyan-300">L.</span></span>
        </Link>
        <div className="hidden items-center gap-5 xl:flex">
          {links.map((link) => (
            <Link key={link} href={`#${link.toLowerCase()}`} className="text-xs text-slate-400 transition hover:text-cyan-300">
              {link}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 sm:block">
            Admin
          </Link>
          <button className="rounded-xl border border-white/10 p-2.5 xl:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="container-shell border-t border-white/5 py-4 xl:hidden">
          {links.map((link) => (
            <Link key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} className="block py-2 text-sm text-slate-300">
              {link}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
