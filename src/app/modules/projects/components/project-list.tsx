"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Project } from "@/app/modules/shared/types/portfolio-data";

export function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter();

  async function remove(project: Project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    const response = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) return toast.error(result.message || "Could not delete project");
    toast.success("Project deleted");
    router.refresh();
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Link href="/admin/projects/new" className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950">
          <Plus size={16} /> Add new
        </Link>
      </div>
      <div className="glass overflow-hidden rounded-2xl">
        {projects.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No projects yet.</p>
        ) : (
          <div className="divide-y divide-white/5">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div>
                  <p className="font-medium text-slate-200">{project.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{project.category} · {project.video?.source ?? "none"}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/projects/${project.id}/edit`} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-cyan-300" aria-label="Edit">
                    <Pencil size={16} />
                  </Link>
                  <button onClick={() => remove(project)} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-red-300" aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
