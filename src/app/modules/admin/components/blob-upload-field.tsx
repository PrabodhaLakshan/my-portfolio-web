"use client";

import { upload } from "@vercel/blob/client";
import { CheckCircle2, Loader2, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type BlobUploadFieldProps = {
  name: string;
  label: string;
  value?: string | null;
  folder: string;
  accept?: string;
  required?: boolean;
};

export function BlobUploadField({
  name,
  label,
  value,
  folder,
  accept = "image/jpeg,image/png,image/webp,image/gif",
  required,
}: BlobUploadFieldProps) {
  const [url, setUrl] = useState(value ?? "");
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const cleanName = file.name.replace(/[^\w.-]+/g, "-").toLowerCase();
      const pathname = `${folder.replace(/\/?$/, "/")}${cleanName}`;
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
        multipart: true,
      });

      setUrl(blob.url);
      toast.success("File uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="label">{label}</span>
      <input name={name} type="hidden" value={url} required={required} />
      <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-4 text-center transition hover:border-cyan-300/60 hover:bg-cyan-300/[0.03]">
        {uploading ? <Loader2 className="animate-spin text-cyan-300" size={22} /> : url ? <CheckCircle2 className="text-emerald-300" size={22} /> : <UploadCloud className="text-cyan-300" size={22} />}
        <span className="text-sm font-medium text-slate-200">
          {uploading ? "Uploading..." : url ? "Upload another file" : "Choose file to upload"}
        </span>
        <span className="text-xs text-slate-500">Saved automatically to Vercel Blob</span>
        <input
          className="sr-only"
          type="file"
          accept={accept}
          disabled={uploading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void uploadFile(file);
            event.currentTarget.value = "";
          }}
        />
      </label>
      {url && (
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-white/10 bg-slate-950/40 p-2">
          <a className="min-w-0 flex-1 break-all text-xs text-cyan-300 hover:text-cyan-200" href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
          <button
            className="rounded-md p-1 text-slate-500 hover:bg-white/5 hover:text-red-300"
            type="button"
            aria-label={`Clear ${label}`}
            onClick={() => setUrl("")}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
