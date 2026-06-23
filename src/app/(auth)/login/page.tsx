"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, ShieldCheck, Terminal } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center text-slate-500">Loading...</main>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const result = await signIn("credentials", { ...values, redirect: false });
    if (result?.error) {
      setError("Invalid email or password.");
      setPending(false);
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      {/* Cyber atmosphere */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-float rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 animate-float rounded-full bg-violet-500/10 blur-3xl [animation-delay:2s]" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-cyan-500/5 blur-3xl" />

      <form onSubmit={submit} className="relative w-full max-w-md">
        {/* Card with cyber border glow */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <ShieldCheck className="text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" size={24} />
            </span>
            <div>
              <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
              <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <Terminal size={11} className="text-cyan-500" />
                Secure content management
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-5">
            <label>
              <span className="label">Email address</span>
              <input
                className="input"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@example.com"
                required
              />
            </label>
            <label>
              <span className="label">Password</span>
              <input
                className="input"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </label>
          </div>

          {error && (
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-400/20 bg-red-400/5 p-3.5 text-sm text-red-300">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.8)]" />
              {error}
            </div>
          )}

          <button
            disabled={pending}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3.5 font-semibold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? (
              <><span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" /> Signing in...</>
            ) : (
              <><LockKeyhole size={17} /> Sign in</>
            )}
          </button>

          <a
            href="/"
            className="mt-5 block text-center text-xs text-slate-600 transition hover:text-cyan-400"
          >
            ← Return to portfolio
          </a>

          {/* Bottom accent line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
        </div>
      </form>
    </main>
  );
}

