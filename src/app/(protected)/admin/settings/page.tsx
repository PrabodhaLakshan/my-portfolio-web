"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2, Youtube, ExternalLink } from "lucide-react";
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

export default function SettingsPage() {
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

  useEffect(() => { fetchSettings(); }, []);

  function addShort() {
    setShorts((prev) => [...prev, { id: generateId(), url: "", title: "" }]);
  }

  function removeShort(id: string) {
    setShorts((prev) => prev.filter((s) => s.id !== id));
  }

  function updateShort(id: string, field: keyof Short, value: string) {
    setShorts((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);

    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const validShorts = shorts.filter((s) => s.url.trim());

    const payload = {
      siteTitle: String(raw.siteTitle ?? settings.siteTitle),
      metaDescription: String(raw.metaDescription ?? settings.metaDescription),
      heroBadgeText: String(raw.heroBadgeText ?? ""),
      primaryColor: String(raw.primaryColor ?? ""),
      accentColor: String(raw.accentColor ?? ""),
      showServicesSection: raw.showServicesSection === "on",
      showCertificatesSection: raw.showCertificatesSection === "on",
      showExperienceSection: raw.showExperienceSection === "on",
      maintenanceMode: raw.maintenanceMode === "on",
      youtubeChannelName: channelName,
      youtubeShorts: validShorts,
    };

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "Settings saved");
        await fetchSettings();
      } else {
        toast.error(result.message || "Could not save settings");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-400 py-12">
        <Loader2 className="animate-spin" size={18} /> Loading settings...
      </div>
    );
  }

  if (!settings) return <p className="text-red-400">Could not load settings.</p>;

  return (
    <>
      <AdminHeading
        title="Site Settings"
        description="Control metadata, visual preferences, homepage section visibility, and your YouTube Shorts."
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── General settings ── */}
        <section className="glass rounded-2xl p-5 sm:p-7">
          <h2 className="mb-5 text-base font-bold text-foreground">General</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="label">Site title</span>
              <input className="input" name="siteTitle" defaultValue={settings.siteTitle} required />
            </label>
            <label className="md:col-span-2">
              <span className="label">Meta description</span>
              <textarea className="input min-h-24" name="metaDescription" defaultValue={settings.metaDescription} required />
            </label>
            <label>
              <span className="label">Hero badge text</span>
              <input className="input" name="heroBadgeText" defaultValue={settings.heroBadgeText ?? ""} />
            </label>
            <label>
              <span className="label">Primary color</span>
              <input className="input" name="primaryColor" defaultValue={settings.primaryColor ?? ""} />
            </label>
            <label>
              <span className="label">Accent color</span>
              <input className="input" name="accentColor" defaultValue={settings.accentColor ?? ""} />
            </label>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {(["showServicesSection", "showCertificatesSection", "showExperienceSection", "maintenanceMode"] as const).map((name) => {
              const labels: Record<string, string> = {
                showServicesSection: "Show services",
                showCertificatesSection: "Show certificates",
                showExperienceSection: "Show experience",
                maintenanceMode: "Maintenance mode",
              };
              return (
                <label key={name} className="flex items-center gap-3 rounded-xl border border-white/10 p-3">
                  <input type="checkbox" name={name} defaultChecked={Boolean(settings[name])} />
                  <span className="text-sm">{labels[name]}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* ── YouTube Shorts ── */}
        <section className="glass rounded-2xl p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <Youtube size={18} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">YouTube Shorts</h2>
              <p className="text-xs text-slate-400">These appear below the Certificates section on the portfolio</p>
            </div>
          </div>

          {/* Channel name */}
          <label className="block mb-6">
            <span className="label">YouTube channel name</span>
            <input
              className="input"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="e.g. W.M. Prabodha Lakshan"
            />
          </label>

          {/* Shorts list */}
          <div className="space-y-3">
            {shorts.map((short, i) => (
              <div key={short.id} className="flex gap-2 items-start rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="mt-3 text-xs font-bold text-muted-foreground w-5 flex-shrink-0">{i + 1}</span>
                <div className="flex-1 grid gap-2 sm:grid-cols-2">
                  <div>
                    <span className="label">YouTube URL</span>
                    <input
                      className="input"
                      type="url"
                      placeholder="https://youtube.com/shorts/..."
                      value={short.url}
                      onChange={(e) => updateShort(short.id, "url", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <span className="label">Title (optional)</span>
                    <input
                      className="input"
                      placeholder="Short title for display"
                      value={short.title ?? ""}
                      onChange={(e) => updateShort(short.id, "title", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-6 flex-shrink-0">
                  {short.url && (
                    <a
                      href={short.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/10 p-2 text-muted-foreground hover:text-foreground transition-colors"
                      title="Open URL"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => removeShort(short.id)}
                    className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition-colors"
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
            className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-red-500/30 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-200"
          >
            <Plus size={16} /> Add YouTube Short
          </button>
        </section>

        {/* Save button */}
        <button
          type="submit"
          disabled={saving || loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 font-semibold text-slate-950 disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save all settings
        </button>
      </form>
    </>
  );
}
