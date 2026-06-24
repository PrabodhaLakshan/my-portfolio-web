"use client";

import Link from "next/link";
import { Menu, Code2, X } from "lucide-react";
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
          ? "border-border bg-background/85 shadow-sm shadow-black/5 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="container-shell flex h-16 items-center justify-between">
        <Link href="#home" className="group flex items-center gap-2 font-display font-bold text-foreground text-sm tracking-tight">
          <Code2
            className="text-accent transition-all group-hover:scale-105"
            size={20}
          />
          <span>
            WMP<span className="text-accent">L.</span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="rounded-xl border border-border bg-card/40 p-2.5 text-foreground hover:bg-secondary xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="container-shell border-t border-border bg-background/95 py-4 shadow-lg xl:hidden">
          {links.map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

