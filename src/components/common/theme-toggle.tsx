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
      className="rounded-xl border border-border bg-card/40 p-2.5 text-foreground transition-all duration-300 hover:scale-105 hover:bg-secondary hover:text-accent"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && theme === "light" ? (
        <Sun size={18} className="transition-transform duration-500 rotate-0 hover:rotate-45" />
      ) : (
        <Moon size={18} className="transition-transform duration-500 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
