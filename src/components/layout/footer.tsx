import Link from "next/link";

export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-shell flex flex-col justify-between gap-5 text-sm text-slate-500 sm:flex-row">
        <div>
          <p className="font-semibold text-slate-200">{name}</p>
          <p className="mt-1">Secure ideas. Thoughtful software.</p>
        </div>
        <div className="flex gap-5">
          <Link href="#projects" className="hover:text-cyan-300">Projects</Link>
          <Link href="#contact" className="hover:text-cyan-300">Contact</Link>
          <Link href="/login" className="hover:text-cyan-300">Admin</Link>
        </div>
        <p>© {new Date().getFullYear()} {name}</p>
      </div>
    </footer>
  );
}
