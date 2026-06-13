"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center text-slate-500">Loading login...</main>}>
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
    <main className="grid min-h-screen place-items-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-3xl p-8">
        <div className="mb-8 flex items-center gap-3"><span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300"><ShieldCheck /></span><div><h1 className="text-xl font-bold">Portfolio Admin</h1><p className="text-sm text-slate-500">Secure content management</p></div></div>
        <label><span className="label">Email</span><input className="input" name="email" type="email" autoComplete="email" required /></label>
        <label className="mt-5 block"><span className="label">Password</span><input className="input" name="password" type="password" autoComplete="current-password" minLength={8} required /></label>
        {error && <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-300">{error}</p>}
        <button disabled={pending} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60"><LockKeyhole size={17} /> {pending ? "Signing in..." : "Sign in"}</button>
        <a href="/" className="mt-5 block text-center text-sm text-slate-500 hover:text-cyan-300">Return to portfolio</a>
      </form>
    </main>
  );
}
