"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminHeading } from "./admin-heading";
import { BlobUploadField } from "./blob-upload-field";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "date" | "checkbox" | "list" | "url" | "select" | "upload";
  options?: string[];
  uploadFolder?: string;
  accept?: string;
  required?: boolean;
};

type RecordValue = string | number | boolean | string[] | null;
type Item = { id: string; [key: string]: RecordValue };

export function ResourceManager({ title, description, endpoint, fields, displayKey }: { title: string; description: string; endpoint: string; fields: Field[]; displayKey: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const response = await fetch(endpoint);
    const result = await response.json();
    setItems(result.data ?? []);
    setLoading(false);
  }
  useEffect(() => { void load(); }, [endpoint]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const data: Record<string, unknown> = {};
    for (const field of fields) {
      const value = raw[field.name];
      if (field.type === "checkbox") data[field.name] = value === "on";
      else if (field.type === "number") data[field.name] = Number(value);
      else if (field.type === "list") data[field.name] = String(value ?? "").split(",").map((entry) => entry.trim()).filter(Boolean);
      else data[field.name] = value || null;
    }
    const response = await fetch(editing ? `${endpoint}/${editing.id}` : endpoint, {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) return toast.error(result.message || "Could not save record");
    toast.success(result.message);
    setOpen(false); setEditing(null); await load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) return toast.error(result.message);
    toast.success("Record deleted"); await load();
  }

  function startEdit(item: Item) { setEditing(item); setOpen(true); }
  function startNew() { setEditing(null); setOpen(true); }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4"><AdminHeading title={title} description={description} /><button onClick={startNew} className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950"><Plus size={16} /> Add new</button></div>
      {open && <form onSubmit={submit} className="glass mb-7 rounded-2xl p-5 sm:p-7"><div className="mb-5 flex items-center justify-between"><h2 className="font-semibold">{editing ? `Edit ${title.toLowerCase()}` : `Add ${title.toLowerCase()}`}</h2><button type="button" onClick={() => setOpen(false)}><X size={18} /></button></div><div className="grid gap-5 md:grid-cols-2">{fields.map((field) => <FieldControl key={field.name} field={field} value={editing?.[field.name]} />)}</div><button className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950"><Save size={16} /> Save record</button></form>}
      <div className="glass overflow-hidden rounded-2xl">
        {loading ? <p className="p-8 text-center text-slate-500">Loading...</p> : items.length === 0 ? <p className="p-8 text-center text-slate-500">No records yet. Add the first one.</p> : <div className="divide-y divide-white/5">{items.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 p-4 sm:p-5"><div><p className="font-medium text-slate-200">{String(item[displayKey] ?? "Untitled")}</p><p className="mt-1 text-xs text-slate-600">{item.id}</p></div><div className="flex gap-2"><button onClick={() => startEdit(item)} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-cyan-300" aria-label="Edit"><Pencil size={16} /></button><button onClick={() => remove(item.id)} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-red-300" aria-label="Delete"><Trash2 size={16} /></button></div></div>)}</div>}
      </div>
    </>
  );
}

function FieldControl({ field, value }: { field: Field; value: RecordValue | undefined }) {
  const initial = Array.isArray(value) ? value.join(", ") : field.type === "date" && value ? String(value).slice(0, 10) : String(value ?? "");
  if (field.type === "checkbox") return <label className="flex items-center gap-3 self-end rounded-xl border border-white/10 p-3"><input name={field.name} type="checkbox" defaultChecked={Boolean(value)} /><span className="text-sm">{field.label}</span></label>;
  if (field.type === "textarea") return <label className="md:col-span-2"><span className="label">{field.label}</span><textarea className="input min-h-28" name={field.name} defaultValue={initial} required={field.required} /></label>;
  if (field.type === "select") return <label><span className="label">{field.label}</span><select className="input" name={field.name} defaultValue={initial}>{field.options?.map((option) => <option key={option}>{option}</option>)}</select></label>;
  if (field.type === "upload") return <BlobUploadField name={field.name} label={field.label} value={initial} folder={field.uploadFolder ?? "uploads/"} accept={field.accept} required={field.required} />;
  return <label><span className="label">{field.label}{field.type === "list" && " (comma separated)"}</span><input className="input" name={field.name} type={field.type === "list" ? "text" : field.type ?? "text"} defaultValue={initial} required={field.required} /></label>;
}
