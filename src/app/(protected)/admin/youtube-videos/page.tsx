"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2, Youtube, ExternalLink, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AdminHeading } from "@/app/modules/admin/components/admin-heading";

type Short = { id: string; url: string; title?: string };
type Settings = {
  siteTitle: string;
  metaDescription: string;
  heroBadgeText?: string;
  primaryColor?: string;
  accentColor?: string;
  showServicesSection: boolean;
  showCertificatesSection: boolean;
  showExperienceSection: boolean;
  maintenanceMode: boolean;
  youtubeChannelName?: string;
  youtubeShorts?: Short[];
};

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function YoutubeVideosPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [shorts, setShorts] = useState<Short[]>([]);
  const [channelName, setChannelName] = useState("");

  async function fetchSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      const result = await res.json();
      if (result.data) {
        setSettings(result.data);
        setShorts(result.data.youtubeShorts ?? []);
        setChannelName(result.data.youtubeChannelName ?? "");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  function addShort() {
    setShorts((prev) => [...prev, { id: generateId(), url: "", title: "" }]);
  }

  function removeShort(id: string) {
    setShorts((prev) => prev.filter((item) => item.id !== id));
  }

  function updateShort(id: string, field: keyof Short, value: string) {
    setShorts((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    const validShorts = shorts.filter((item) => item.url.trim());

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settings,
          youtubeChannelName: channelName.trim(),
          youtubeShorts: validShorts,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Shorts updated");
        await fetchSettings();
      } else {
        toast.error(result.message || "Could not save YouTube videos");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-slate-400">
        <Loader2 className="animate-spin" size={18} /> Loading YouTube videos...
      </div>
    );
  }

  if (!settings) return <p className="text-red-400">Could not load YouTube videos.</p>;

  return (
    <>
      <AdminHeading
        title="YouTube Videos"
        description="Manage your channel name and Shorts links from one place. They appear beneath the Certificates section on the public portfolio."
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="glass rounded-2xl p-5 sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
              <Youtube size={18} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Shorts & channel display</h2>
              <p className="mt-1 text-sm text-slate-400">
                Add your real YouTube Shorts links and show your channel name with a polished badge on the site.
              </p>
            </div>
          </div>

          <label className="mb-6 block">
            <span className="label">YouTube channel name</span>
            <input
              className="input"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="e.g. W.M. Prabodha Lakshan"
            />
          </label>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
            <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
              <Sparkles size={15} className="text-cyan-400" /> Supported links
            </div>
            <p>Use direct Shorts URLs such as youtube.com/shorts/..., youtu.be/..., or youtube.com/watch?v=....</p>
          </div>

          <div className="mt-6 space-y-3">
            {shorts.map((short, index) => (
              <div key={short.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-start">
                <div className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-xs font-bold text-muted-foreground">
                  {index + 1}
                </div>
                <div className="grid flex-1 gap-3 md:grid-cols-2">
                  <div>
                    <span className="label">YouTube URL</span>
                    <input
                      className="input"
                      type="url"
                      placeholder="https://www.youtube.com/shorts/..."
                      value={short.url}
                      onChange={(e) => updateShort(short.id, "url", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <span className="label">Display title</span>
                    <input
                      className="input"
                      placeholder="Optional title"
                      value={short.title ?? ""}
                      onChange={(e) => updateShort(short.id, "title", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:mt-6">
                  {short.url && (
                    <a
                      href={short.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/10 p-2 text-muted-foreground transition-colors hover:text-foreground"
                      title="Open URL"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => removeShort(short.id)}
                    className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addShort}
            className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-cyan-400/30 bg-cyan-400/5 px-4 py-3 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-400/10"
          >
            <Plus size={16} /> Add another YouTube Short
          </button>
        </section>

        <button
          type="submit"
          disabled={saving || loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 font-semibold text-slate-950 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save YouTube videos
        </button>
      </form>
    </>
  );
}
