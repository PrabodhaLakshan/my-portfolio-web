"use client";

import { upload } from "@vercel/blob/client";
import type { Project } from "@/app/modules/shared/types/portfolio-data";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AdminHeading } from "@/app/modules/admin/components/admin-heading";

export function ProjectEditor({ project }: { project?: Project }) {
  const router = useRouter();
  const [videoSource, setVideoSource] = useState(project?.video?.source ?? "none");
  const [blobUrl, setBlobUrl] = useState(project?.video?.blobUrl ?? project?.video?.url ?? "");
  const [uploading, setUploading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    if (videoSource === "vercel" && !blobUrl) return toast.error("Upload a project video before saving");
    const autoplay = raw.autoplay === "on";
    const data = {
      title: raw.title, slug: raw.slug, shortDescription: raw.shortDescription, description: raw.description,
      techStack: String(raw.techStack).split(",").map((item) => item.trim()).filter(Boolean),
      category: raw.category, imageUrl: raw.imageUrl, githubUrl: raw.githubUrl, liveUrl: raw.liveUrl,
      order: Number(raw.order), featured: raw.featured === "on",
      video: {
        source: videoSource,
        blobUrl: videoSource === "vercel" ? blobUrl : undefined,
        url: videoSource === "vercel" ? blobUrl : undefined,
        youtubeUrl: videoSource === "youtube" ? String(raw.youtubeUrl ?? "") : undefined,
        autoplay,
        muted: true,
        loop: raw.loop === "on",
        controls: raw.controls === "on",
      },
    };
    const response = await fetch(project ? `/api/projects/${project.id}` : "/api/projects", {
      method: project ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) return toast.error(result.message);
    toast.success(result.message);
    router.push("/admin/projects");
    router.refresh();
  }
  return (
    <>
      <AdminHeading title={project ? "Edit Project" : "New Project"} description="Publish complete project details, links, technology tags, and display settings." />
      <form onSubmit={submit} className="glass rounded-2xl p-5 sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <Control name="title" label="Title" value={project?.title} required />
          <Control name="slug" label="Slug" value={project?.slug} required />
          <Area name="shortDescription" label="Short description" value={project?.shortDescription} />
          <Area name="description" label="Full description" value={project?.description} />
          <Control name="techStack" label="Tech stack (comma separated)" value={project?.techStack.join(", ")} required />
          <label><span className="label">Category</span><select className="input" name="category" defaultValue={project?.category ?? "Next.js"}>{["Web Development", "Cyber Security", "MERN", "Next.js", "Academic", "Other"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <Control name="imageUrl" label="Image URL" value={project?.imageUrl} type="url" />
          <Control name="githubUrl" label="GitHub URL" value={project?.githubUrl} type="url" />
          <Control name="liveUrl" label="Live demo URL" value={project?.liveUrl} type="url" />
          <Control name="order" label="Display order" value={String(project?.order ?? 0)} type="number" />
          <label className="flex items-center gap-3 self-end rounded-xl border border-white/10 p-3"><input type="checkbox" name="featured" defaultChecked={project?.featured} /><span className="text-sm">Featured project</span></label>
          <label><span className="label">Video Source</span><select className="input" name="videoSource" value={videoSource} onChange={(event) => setVideoSource(event.target.value as "none" | "vercel" | "youtube")}><option value="none">None</option><option value="vercel">Vercel Upload</option><option value="youtube">YouTube Link</option></select></label>
          {videoSource === "vercel" && <label><span className="label">Video File Upload</span><input className="input" type="file" accept="video/mp4,video/webm,video/quicktime" disabled={uploading} onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setUploading(true);
            try {
              const blob = await upload(`projects/videos/${file.name}`, file, { access: "public", handleUploadUrl: "/api/blob/upload", multipart: true });
              setBlobUrl(blob.url);
              toast.success("Video uploaded");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Video upload failed");
            } finally {
              setUploading(false);
            }
          }} />{blobUrl && <span className="mt-2 block break-all text-xs text-cyan-300">{blobUrl}</span>}</label>}
          {videoSource === "youtube" && <Control name="youtubeUrl" label="YouTube URL" value={project?.video?.youtubeUrl} type="url" required />}
          {videoSource !== "none" && <>
            <label className="flex items-center gap-3 rounded-xl border border-white/10 p-3"><input type="checkbox" name="autoplay" defaultChecked={project?.video?.autoplay ?? true} /><span className="text-sm">Autoplay</span></label>
            <label className="flex items-center gap-3 rounded-xl border border-white/10 p-3"><input type="checkbox" checked readOnly /><span className="text-sm">Muted (required for autoplay)</span></label>
            <label className="flex items-center gap-3 rounded-xl border border-white/10 p-3"><input type="checkbox" name="loop" defaultChecked={project?.video?.loop ?? true} /><span className="text-sm">Loop</span></label>
            <label className="flex items-center gap-3 rounded-xl border border-white/10 p-3"><input type="checkbox" name="controls" defaultChecked={project?.video?.controls ?? true} /><span className="text-sm">Show Controls</span></label>
          </>}
        </div>
        <button disabled={uploading} className="mt-7 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"><Save size={16} /> {uploading ? "Uploading..." : "Save project"}</button>
      </form>
    </>
  );
}

function Control({ name, label, value, required, type = "text" }: { name: string; label: string; value?: string | null; required?: boolean; type?: string }) {
  return <label><span className="label">{label}</span><input className="input" name={name} type={type} defaultValue={value ?? ""} required={required} /></label>;
}
function Area({ name, label, value }: { name: string; label: string; value?: string | null }) {
  return <label className="md:col-span-2"><span className="label">{label}</span><textarea className="input min-h-28" name={name} defaultValue={value ?? ""} required /></label>;
}
