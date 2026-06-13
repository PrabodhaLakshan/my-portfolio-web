export function AdminHeading({ title, description }: { title: string; description: string }) {
  return <div className="mb-7"><h1 className="text-2xl font-bold sm:text-3xl">{title}</h1><p className="mt-2 text-sm text-slate-500">{description}</p></div>;
}
