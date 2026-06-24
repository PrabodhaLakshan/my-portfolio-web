import Link from "next/link";

export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-border py-12 mt-20 bg-card/15">
      <div className="container-shell flex flex-col justify-between gap-6 text-xs font-medium text-muted-foreground sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-bold text-foreground tracking-tight">{name}</p>
          <p className="mt-1 text-xs text-muted-foreground/80">Secure ideas • Thoughtful software</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider font-semibold">
          <Link href="#projects" className="transition-colors hover:text-accent">Projects</Link>
          <Link href="#contact" className="transition-colors hover:text-accent">Contact</Link>
          <Link href="/login" className="transition-colors hover:text-accent">Admin</Link>
        </div>
        <p className="text-xs font-medium">© {new Date().getFullYear()} {name}</p>
      </div>
    </footer>
  );
}
