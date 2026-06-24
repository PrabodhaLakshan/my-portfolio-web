"use client";

import type { Project } from "@/app/modules/shared/types/portfolio-data";
import { ExternalLink, Github } from "lucide-react";
import { useMemo, useState } from "react";
import { GlassCard } from "@/components/common/glass-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);
  const visible = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      {/* Category Pills Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-2.5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`rounded-xl px-4.5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm ${
              filter === category
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <GlassCard 
            key={project.id} 
            className="group flex h-full flex-col overflow-hidden p-0 hover:shadow-lg hover:-translate-y-1.5 hover:border-accent/30 transition-all duration-500"
          >
            {/* Mock Dashboard/Browser Window Header */}
            <div className="relative flex h-36 flex-col justify-between bg-secondary/30 p-4 border-b border-border">
              {/* Window Controls */}
              <div className="flex gap-1.5 opacity-60">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              </div>
              
              {/* Subtle accent glow in background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />

              <div className="flex items-end justify-between z-10 mt-auto">
                <span className="rounded-lg bg-card/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-accent border border-border shadow-sm backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Project Card Body */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.shortDescription}
                </p>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="rounded-lg border border-border bg-secondary/40 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="mt-6 flex gap-2 border-t border-border pt-4">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="rounded-xl border border-border p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="rounded-xl border border-border p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
