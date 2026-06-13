"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
