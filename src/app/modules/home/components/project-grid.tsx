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
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`rounded-full px-4 py-2 text-xs transition ${filter === category ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <GlassCard key={project.id} className="group flex h-full flex-col overflow-hidden p-6 transition hover:-translate-y-1 hover:border-cyan-400/30">
            <div className="mb-5 flex h-36 items-end rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 p-4">
              <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs text-cyan-200">{project.category}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{project.shortDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => <span key={tech} className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-slate-300">{tech}</span>)}
            </div>
            <div className="mt-5 flex gap-3">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Live demo"><ExternalLink size={18} /></a>}
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
