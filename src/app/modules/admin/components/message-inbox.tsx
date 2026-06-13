"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Message = { id: string; name: string; email: string; subject: string; message: string; status: string; createdAt: string };

export function MessageInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  async function load() { const result = await fetch("/api/messages").then((response) => response.json()); setMessages(result.data ?? []); }
  useEffect(() => { void load(); }, []);
  async function status(item: Message, next: "read" | "unread") {
    const response = await fetch(`/api/messages/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: next }) });
    if (response.ok) { toast.success(`Marked as ${next}`); await load(); }
  }
  async function remove(item: Message) {
    if (!window.confirm("Delete this message?")) return;
    const response = await fetch(`/api/messages/${item.id}`, { method: "DELETE" });
    if (response.ok) { setSelected(null); toast.success("Message deleted"); await load(); }
  }
  return <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="glass overflow-hidden rounded-2xl">{messages.length ? messages.map((item) => <button key={item.id} onClick={() => { setSelected(item); if (item.status === "unread") void status(item, "read"); }} className="flex w-full gap-3 border-b border-white/5 p-4 text-left hover:bg-white/[.03]"><span className={item.status === "unread" ? "text-cyan-300" : "text-slate-600"}>{item.status === "unread" ? <Mail size={17} /> : <MailOpen size={17} />}</span><span className="min-w-0"><span className="block truncate text-sm font-medium">{item.subject}</span><span className="mt-1 block truncate text-xs text-slate-500">{item.name} • {item.email}</span></span></button>) : <p className="p-8 text-center text-sm text-slate-500">No messages yet.</p>}</div><div className="glass min-h-72 rounded-2xl p-6">{selected ? <><div className="flex justify-between gap-4"><div><h2 className="text-xl font-semibold">{selected.subject}</h2><p className="mt-2 text-sm text-slate-500">{selected.name} • <a href={`mailto:${selected.email}`} className="text-cyan-300">{selected.email}</a></p></div><button onClick={() => remove(selected)} className="text-slate-500 hover:text-red-300"><Trash2 size={18} /></button></div><p className="mt-7 whitespace-pre-wrap leading-7 text-slate-300">{selected.message}</p><button onClick={() => status(selected, selected.status === "read" ? "unread" : "read")} className="mt-7 rounded-xl border border-white/10 px-4 py-2 text-sm">{selected.status === "read" ? "Mark unread" : "Mark read"}</button></> : <div className="grid h-full place-items-center text-sm text-slate-600">Select a message to read it.</div>}</div></div>;
}
