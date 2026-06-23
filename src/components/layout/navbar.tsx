"use client";

import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/common/theme-toggle";

const links = ["Home", "About", "Skills", "Projects", "Education", "Experience", "Certificates", "Services", "Contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-cyan-400/10 bg-slate-950/85 shadow-lg shadow-cyan-500/5 backdrop-blur-xl"
          : "border-white/5 bg-slate-950/60 backdrop-blur-xl"
      }`}
    >
      <nav className="container-shell flex h-16 items-center justify-between">
        <Link href="#home" className="group flex items-center gap-2 font-semibold text-white">
          <ShieldCheck
            className="text-cyan-300 transition-all group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]"
            size={22}
          />
          <span className="transition-all group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]">
            WMP<span className="text-cyan-300">L.</span>
          </span>
        </Link>
        <div className="hidden items-center gap-5 xl:flex">
          {links.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative text-xs text-slate-400 transition hover:text-cyan-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/admin"
            className="hidden rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] sm:block"
          >
            Admin
          </Link>
          <button
            className="rounded-xl border border-white/10 p-2.5 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="container-shell border-t border-white/5 py-4 xl:hidden">
          {links.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-slate-300 transition hover:text-cyan-300"
            >
              {link}
            </Link>
          ))}
          <Link
            href="/admin"
            className="mt-2 block rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-sm text-cyan-300"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
}

