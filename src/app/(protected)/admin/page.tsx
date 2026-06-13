import Link from "next/link";
import { Award, FolderKanban, Mail, Plus, Sparkles, Star, UserRound } from "lucide-react";
import { getPortfolioData } from "@/lib/portfolio-store";
import { AdminHeading } from "@/app/modules/admin/components/admin-heading";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getPortfolioData();
  const stats = {
    projects: data.projects.length,
    skills: data.skills.length,
    certificates: data.certificates.length,
    messages: data.messages.length,
    unread: data.messages.filter((message) => message.status === "unread").length,
    featured: data.projects.filter((project) => project.featured).length,
  };
  const cards = [
    ["Total Projects", stats.projects, FolderKanban], ["Total Skills", stats.skills, Sparkles],
    ["Certificates", stats.certificates, Award], ["Total Messages", stats.messages, Mail],
    ["Unread Messages", stats.unread, Mail], ["Featured Projects", stats.featured, Star],
  ] as const;
  return (
    <>
      <AdminHeading title="Dashboard" description="A quick view of your portfolio content and messages." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label, value, Icon]) => <div key={label} className="glass rounded-2xl p-5"><div className="flex items-center justify-between"><span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300"><Icon size={20} /></span><span className="text-3xl font-bold">{value}</span></div><p className="mt-5 text-sm text-slate-500">{label}</p></div>)}</div>
      <h2 className="mb-4 mt-9 font-semibold">Quick actions</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Quick href="/admin/projects/new" icon={<Plus size={17} />} label="Add New Project" />
        <Quick href="/admin/profile" icon={<UserRound size={17} />} label="Edit Profile" />
        <Quick href="/admin/messages" icon={<Mail size={17} />} label="View Messages" />
        <Quick href="/" icon={<FolderKanban size={17} />} label="Open Website" external />
      </div>
    </>
  );
}

function Quick({ href, icon, label, external }: { href: string; icon: React.ReactNode; label: string; external?: boolean }) {
  return <Link href={href} target={external ? "_blank" : undefined} className="glass flex items-center gap-3 rounded-xl p-4 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-white">{icon}{label}</Link>;
}
