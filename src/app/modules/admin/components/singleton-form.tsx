"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { AdminHeading } from "./admin-heading";
import { BlobUploadField } from "./blob-upload-field";
import type { Field } from "./resource-manager";

type Values = Record<string, string | boolean | null>;

export function SingletonForm({ title, description, endpoint, fields }: { title: string; description: string; endpoint: string; fields: Field[] }) {
  const [values, setValues] = useState<Values>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(endpoint).then((response) => response.json()).then((result) => setValues(result.data ?? {})).finally(() => setLoading(false));
  }, [endpoint]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const data: Values = {};
    for (const field of fields) data[field.name] = field.type === "checkbox" ? raw[field.name] === "on" : String(raw[field.name] ?? "");
    const response = await fetch(endpoint, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json();
    response.ok ? toast.success(result.message) : toast.error(result.message || "Could not save changes");
  }

  return (
    <>
      <AdminHeading title={title} description={description} />
      <form onSubmit={submit} className="glass rounded-2xl p-5 sm:p-7">
        {loading ? <p className="text-slate-500">Loading...</p> : <div className="grid gap-5 md:grid-cols-2">{fields.map((field) => {
          if (field.type === "checkbox") return <label key={field.name} className="flex items-center gap-3 rounded-xl border border-white/10 p-3"><input name={field.name} type="checkbox" defaultChecked={Boolean(values[field.name])} /><span className="text-sm">{field.label}</span></label>;
          if (field.type === "textarea") return <label key={field.name} className="md:col-span-2"><span className="label">{field.label}</span><textarea className="input min-h-32" name={field.name} defaultValue={String(values[field.name] ?? "")} required={field.required} /></label>;
          if (field.type === "upload") return <BlobUploadField key={field.name} name={field.name} label={field.label} value={String(values[field.name] ?? "")} folder={field.uploadFolder ?? "uploads/"} accept={field.accept} required={field.required} />;
          return <label key={field.name}><span className="label">{field.label}</span><input className="input" name={field.name} type={field.type === "url" ? "url" : "text"} defaultValue={String(values[field.name] ?? "")} required={field.required} /></label>;
        })}</div>}
        <button className="mt-7 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950"><Save size={16} /> Save changes</button>
      </form>
    </>
  );
}
