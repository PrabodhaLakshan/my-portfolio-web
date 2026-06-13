"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success("Message sent. Thank you for reaching out.");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send your message.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label><span className="label">Name</span><input className="input" name="name" required /></label>
        <label><span className="label">Email</span><input className="input" name="email" type="email" required /></label>
      </div>
      <label className="mt-5 block"><span className="label">Subject</span><input className="input" name="subject" required /></label>
      <label className="mt-5 block"><span className="label">Message</span><textarea className="input min-h-36 resize-y" name="message" required /></label>
      <button disabled={pending} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.02] disabled:opacity-60">
        <Send size={17} /> {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
