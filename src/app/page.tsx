import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Award, BriefcaseBusiness, Code2, Database, Download, ExternalLink,
  Github, GraduationCap, Linkedin, Mail, MapPin, Phone, ShieldCheck, Wrench,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/common/glass-card";
import { SectionHeading } from "@/components/common/section-heading";
import { ContactForm } from "@/app/modules/home/components/contact-form";
import { ProjectGrid } from "@/app/modules/home/components/project-grid";
import { ProjectVideo } from "@/app/modules/projects/components/project-video";
import { Reveal } from "@/app/modules/home/components/reveal";
import { getPortfolioData } from "@/app/modules/home/actions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const fallbackProfile = {
  fullName: "W.M. Prabodha Lakshan",
  professionalTitle: "Cyber Security Undergraduate",
  shortBio: "I build secure, modern, and user-friendly web applications while continuously improving my cyber security and full-stack development skills.",
  aboutText: "I am W.M. Prabodha Lakshan, an IT undergraduate from Sri Lanka with a strong interest in cyber security, web development, and modern software engineering. I enjoy building practical projects, learning new technologies, and solving real-world problems through secure and efficient digital solutions.",
  email: "admin@portfolio.dev", phone: null, location: "Sri Lanka", cvUrl: null,
  profileImageUrl: null,
  githubUrl: null, linkedinUrl: null, facebookUrl: null, instagramUrl: null, whatsappUrl: null,
};

export default async function HomePage() {
  const data = await getPortfolioData();
  const profile = data.profile ?? fallbackProfile;
  const settings = data.settings;
  const skillGroups = Map.groupBy(data.skills, (skill) => skill.category);

  if (settings?.maintenanceMode) {
    return <main className="grid min-h-screen place-items-center px-6 text-center"><div><ShieldCheck className="mx-auto mb-5 text-cyan-300" size={42} /><h1 className="text-3xl font-bold">Portfolio maintenance</h1><p className="mt-3 text-slate-400">A refreshed experience is on the way.</p></div></main>;
  }

  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
          {/* Cyber ambient glows */}
          <div className="absolute left-[8%] top-32 h-64 w-64 animate-float rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-16 right-[8%] h-80 w-80 animate-float rounded-full bg-violet-500/10 blur-3xl [animation-delay:2s]" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute right-[20%] top-20 h-32 w-32 animate-float rounded-full bg-cyan-400/8 blur-2xl [animation-delay:1s]" />
          <div className="container-shell relative grid items-center gap-12 py-24 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
                {settings?.heroBadgeText ?? "Available for internships and projects"}
              </div>
              <p className="text-lg text-slate-400">Hi, I am</p>
              <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="gradient-text">{profile.fullName}</span>
              </h1>
              <h2 className="mt-5 text-xl font-semibold text-slate-200 sm:text-2xl">{profile.professionalTitle}</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">{profile.shortBio}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">View projects <ArrowRight size={17} /></Link>
                <Link href="#contact" className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-cyan-400/30">Contact me</Link>
                {profile.cvUrl && (
                  <a
                    href={profile.cvUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400/20 hover:scale-[1.02]"
                  >
                    <Download size={17} /> Download CV
                  </a>
                )}
              </div>
            </Reveal>
            <Reveal className="mx-auto">
              {profile.profileImageUrl ? (
                <div className="relative">
                  {/* Outer animated glow rings */}
                  <div className="absolute inset-0 rounded-full animate-ping-slow opacity-20 bg-cyan-400/30 blur-xl" />
                  <div className="absolute -inset-3 rounded-full border border-cyan-400/20 animate-spin-slow" />
                  <div className="absolute -inset-6 rounded-full border border-violet-500/10 animate-spin-slower" />
                  {/* Glow halo */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 to-violet-500/30 blur-2xl" />
                  {/* Profile image */}
                  <div className="profile-ring relative h-72 w-72 overflow-hidden shadow-2xl sm:h-80 sm:w-80">
                    <Image
                      src={profile.profileImageUrl}
                      alt={profile.fullName}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Badge */}
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-slate-950/90 px-4 py-2 text-xs text-cyan-300 shadow-lg">
                    Security • Code • Curiosity
                  </span>
                </div>
              ) : (
                <div className="relative grid h-72 w-72 place-items-center rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:h-96 sm:w-96">
                  <div className="absolute inset-5 rounded-[2rem] border border-white/10" />
                  <ShieldCheck size={100} strokeWidth={1} className="text-cyan-300" />
                  <span className="absolute bottom-8 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-xs text-slate-300">Security • Code • Curiosity</span>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        <section id="about" className="container-shell scroll-mt-24 py-24">
          <Reveal><SectionHeading eyebrow="About" title="Building with purpose and security in mind" /></Reveal>
          <Reveal>
            <GlassCard className="grid gap-8 p-8 md:grid-cols-[.45fr_1fr] md:p-10">
              <div className="rounded-2xl bg-gradient-to-br from-cyan-400/15 to-violet-500/15 p-8"><ShieldCheck className="text-cyan-300" size={55} /><p className="mt-8 text-sm uppercase tracking-[.25em] text-slate-500">Sri Lanka</p><p className="mt-2 text-xl font-semibold">IT Undergraduate</p></div>
              <div><h3 className="text-2xl font-semibold">Learning deeply. Shipping thoughtfully.</h3><p className="mt-5 leading-8 text-slate-400">{profile.aboutText}</p><div className="mt-7 flex flex-wrap gap-2">{["Cyber Security", "Full-stack Development", "Networking", "Modern Software Engineering"].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">{item}</span>)}</div></div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="skills" className="scroll-mt-24 border-y border-white/5 bg-white/[0.015] py-24">
          <div className="container-shell">
            <Reveal><SectionHeading eyebrow="Skills" title="Tools I use to turn ideas into systems" /></Reveal>
            {data.skills.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{Array.from(skillGroups).map(([category, skills]) => <Reveal key={category}><GlassCard className="h-full p-6"><h3 className="mb-5 flex items-center gap-2 font-semibold text-cyan-200"><Code2 size={18} /> {category}</h3><div className="space-y-4">{skills.map((skill) => <div key={skill.id}><div className="mb-2 flex justify-between text-sm"><span>{skill.name}</span><span className="text-slate-500">{skill.level}%</span></div><div className="h-1.5 rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${skill.level}%` }} /></div></div>)}</div></GlassCard></Reveal>)}</div> : <EmptyCopy text="Skills can be added from the admin panel." />}
          </div>
        </section>

        <section id="projects" className="container-shell scroll-mt-24 py-24">
          <Reveal><SectionHeading eyebrow="Projects" title="Selected work and active experiments" description="Practical work across web development, security, and academic problem solving." /></Reveal>
          {data.projects.find((project) => project.featured && project.video?.source !== "none") && <Reveal className="mx-auto mb-10 max-w-5xl"><ProjectVideo video={data.projects.find((project) => project.featured && project.video?.source !== "none")?.video} title={data.projects.find((project) => project.featured && project.video?.source !== "none")?.title ?? "Featured project"} /></Reveal>}
          {data.projects.length ? <ProjectGrid projects={data.projects} /> : <EmptyCopy text="Projects can be added from the admin panel." />}
        </section>

        <section id="education" className="container-shell scroll-mt-24 py-24">
          <Reveal><SectionHeading eyebrow="Education" title="Academic foundation" /></Reveal>
          <div className="mx-auto max-w-4xl space-y-4">{data.education.length ? data.education.map((item) => <Reveal key={item.id}><GlassCard className="p-6"><GraduationCap className="mb-4 text-cyan-300" /><div className="flex flex-wrap justify-between gap-2"><h3 className="text-xl font-semibold">{item.program}</h3><span className="text-sm text-slate-500">{item.startYear} - {item.endYear ?? "Present"}</span></div><p className="mt-2 text-cyan-200">{item.institute}</p><p className="mt-4 text-sm leading-6 text-slate-400">{item.description}</p></GlassCard></Reveal>) : <EmptyCopy text="Academic details can be added from the admin panel." />}</div>
        </section>

        {settings?.showExperienceSection !== false && <section id="experience" className="scroll-mt-24 border-y border-white/5 bg-white/[0.015] py-24"><div className="container-shell"><Reveal><SectionHeading eyebrow="Experience" title="Learning through real work" /></Reveal><div className="grid gap-5 md:grid-cols-2">{data.experience.length ? data.experience.map((item) => <Reveal key={item.id}><GlassCard className="h-full p-6"><BriefcaseBusiness className="mb-4 text-violet-300" /><h3 className="text-lg font-semibold">{item.role}</h3><p className="mt-1 text-sm text-cyan-200">{item.organization} • {item.type}</p><p className="mt-3 text-xs text-slate-500">{formatDate(item.startDate)} - {item.currentlyWorking ? "Present" : item.endDate ? formatDate(item.endDate) : "Present"}</p><p className="mt-4 text-sm leading-6 text-slate-400">{item.description}</p></GlassCard></Reveal>) : <EmptyCopy text="Experience entries can include internships, clubs, freelance work, and academic projects." />}</div></div></section>}

        {settings?.showCertificatesSection !== false && <section id="certificates" className="container-shell scroll-mt-24 py-24"><Reveal><SectionHeading eyebrow="Certificates" title="Continuous learning, documented" /></Reveal><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{data.certificates.length ? data.certificates.map((item) => <Reveal key={item.id}><GlassCard className="h-full p-6"><Award className="mb-5 text-amber-300" /><h3 className="font-semibold">{item.title}</h3><p className="mt-2 text-sm text-cyan-200">{item.issuer}</p><p className="mt-2 text-xs text-slate-500">{formatDate(item.issuedDate)}</p>{item.credentialUrl && <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300">View credential <ExternalLink size={15} /></a>}</GlassCard></Reveal>) : <EmptyCopy text="Certificates can be published from the admin panel." />}</div></section>}

        {settings?.showServicesSection !== false && <section id="services" className="scroll-mt-24 border-y border-white/5 bg-white/[0.015] py-24"><div className="container-shell"><Reveal><SectionHeading eyebrow="Services" title="Ways I can help" /></Reveal><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{data.services.length ? data.services.map((item) => <Reveal key={item.id}><GlassCard className="h-full p-6"><Wrench className="mb-5 text-cyan-300" /><h3 className="font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>{item.priceText && <p className="mt-4 text-sm text-violet-300">{item.priceText}</p>}</GlassCard></Reveal>) : <EmptyCopy text="Service offerings appear here after seeding." />}</div></div></section>}

        <section id="contact" className="container-shell scroll-mt-24 py-24">
          <Reveal><SectionHeading eyebrow="Contact" title="Let’s build something useful" description="Have an internship, project, or collaboration in mind? Send a message." /></Reveal>
          <div className="grid gap-6 lg:grid-cols-[.65fr_1.35fr]">
            <Reveal><GlassCard className="h-full p-7"><h3 className="text-xl font-semibold">Contact details</h3><div className="mt-7 space-y-5 text-sm text-slate-400">{profile.email && <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-cyan-300"><Mail size={18} /> {profile.email}</a>}{profile.phone && <p className="flex items-center gap-3"><Phone size={18} /> {profile.phone}</p>}{profile.location && <p className="flex items-center gap-3"><MapPin size={18} /> {profile.location}</p>}</div><div className="mt-8 flex gap-3">{profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github /></a>}{profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin /></a>}</div></GlassCard></Reveal>
            <Reveal><ContactForm /></Reveal>
          </div>
        </section>
      </main>
      <Footer name={profile.fullName} />
    </>
  );
}

function EmptyCopy({ text }: { text: string }) {
  return <div className="col-span-full rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">{text}</div>;
}
