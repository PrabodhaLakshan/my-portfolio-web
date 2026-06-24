"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Terminal } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center text-muted-foreground bg-background">Loading...</main>}>
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
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 bg-background">
      {/* Dynamic ambient blobs */}
      <div className="ambient-blob left-1/4 top-1/4 h-72 w-72 bg-accent/10 blur-[100px] animate-float" />
      <div className="ambient-blob bottom-1/4 right-1/4 h-80 w-80 bg-indigo-500/10 blur-[110px] animate-float-delayed" />

      <form onSubmit={submit} className="relative w-full max-w-md z-10">
        {/* Theme-adaptive glass card */}
        <div className="glass rounded-3xl p-8 shadow-xl border border-border bg-card/60 backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-secondary/50 text-accent shadow-sm">
              <LockKeyhole size={22} />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground tracking-tight">Portfolio Admin</h1>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 font-semibold">
                <Terminal size={12} className="text-accent" />
                Content management dashboard
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-5">
            <label className="block">
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
            <label className="block">
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
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-500/10 bg-red-500/5 p-3.5 text-xs font-semibold text-red-500 dark:text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              {error}
            </div>
          )}

          <button
            disabled={pending}
            className="btn-primary group w-full mt-7"
          >
            {pending ? (
              <><span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" /> Signing in...</>
            ) : (
              <>Sign in</>
            )}
          </button>

          <a
            href="/"
            className="mt-5 block text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            ← Return to portfolio
          </a>
        </div>
      </form>
    </main>
  );
}
