import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Award, BriefcaseBusiness, Code2, Database, Download, ExternalLink,
  Github, GraduationCap, Linkedin, Mail, MapPin, Phone, Wrench, Youtube,
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
  professionalTitle: "IT Undergraduate & Developer",
  shortBio: "I build modern, responsive, and user-friendly web applications while growing my full-stack development and software engineering skills.",
  aboutText: "I am W.M. Prabodha Lakshan, an IT undergraduate from Sri Lanka with a strong interest in web development, software engineering, and modern web applications. I enjoy building practical projects, learning new technologies, and solving real-world problems through efficient digital solutions.",
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
    return (
      <main className="grid min-h-screen place-items-center px-6 text-center bg-background text-foreground">
        <div className="glass-cyber rounded-2xl p-10 max-w-md shadow-2xl">
          <Wrench className="mx-auto mb-6 text-accent animate-pulse" size={48} />
          <h1 className="font-display text-3xl font-bold tracking-tight">Portfolio maintenance</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A refreshed experience is on the way. Please check back shortly.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section id="home" className="relative flex min-h-screen items-center justify-center pt-20">
          {/* Organic Ambient Glowing Blobs */}
          <div className="ambient-blob left-[10%] top-28 h-72 w-72 bg-accent/10 blur-[100px] animate-float" />
          <div className="ambient-blob bottom-20 right-[10%] h-96 w-96 bg-indigo-500/10 blur-[120px] animate-float-delayed" />
          <div className="ambient-blob left-1/3 top-1/3 h-80 w-80 bg-accent/5 blur-[100px] animate-pulse-soft" />

          <div className="container-shell relative grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {settings?.heroBadgeText ?? "Available for internships and projects"}
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Hi, I am</p>
              <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight">
                <span className="gradient-text">{profile.fullName}</span>
              </h1>
              <h2 className="mt-5 font-display text-lg font-bold tracking-tight text-foreground/85 sm:text-2xl border-l-2 border-accent pl-4">
                {profile.professionalTitle}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.shortBio}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="#projects" className="btn-primary group">
                  View projects 
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="#contact" className="btn-secondary">
                  Contact me
                </Link>
                {profile.cvUrl && (
                  <a
                    href={profile.cvUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="btn-accent-outline group"
                  >
                    <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" /> 
                    Download CV
                  </a>
                )}
              </div>
            </Reveal>

            {/* Profile Image Column */}
            <Reveal className="mx-auto">
              {profile.profileImageUrl ? (
                <div className="profile-container relative p-4">
                  {/* Viewfinder architectural borders */}
                  <div className="viewfinder-corner viewfinder-corner-tl" />
                  <div className="viewfinder-corner viewfinder-corner-tr" />
                  <div className="viewfinder-corner viewfinder-corner-bl" />
                  <div className="viewfinder-corner viewfinder-corner-br" />
                  
                  {/* Ambient back-glow */}
                  <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-accent/25 to-indigo-500/15 opacity-60 blur-xl -z-10 animate-pulse-soft" />
                  
                  {/* Squircle inner frame */}
                  <div className="relative h-72 w-72 overflow-hidden rounded-[2rem] border-2 border-border bg-card shadow-2xl transition-all duration-500 hover:scale-[1.02] sm:h-80 sm:w-80">
                    <Image
                      src={profile.profileImageUrl}
                      alt={profile.fullName}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Premium tag pill */}
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card/90 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-accent shadow-md backdrop-blur-sm">
                    Design • Development • Innovation
                  </span>
                </div>
              ) : (
                <div className="profile-container relative p-4">
                  {/* Viewfinder architectural borders */}
                  <div className="viewfinder-corner viewfinder-corner-tl" />
                  <div className="viewfinder-corner viewfinder-corner-tr" />
                  <div className="viewfinder-corner viewfinder-corner-bl" />
                  <div className="viewfinder-corner viewfinder-corner-br" />

                  {/* Placeholder box */}
                  <div className="relative grid h-72 w-72 place-items-center rounded-[2rem] border-2 border-dashed border-border bg-card/50 backdrop-blur-md shadow-2xl sm:h-80 sm:w-80">
                    <Code2 size={72} strokeWidth={1} className="text-accent animate-pulse" />
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card/90 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-accent shadow-md backdrop-blur-sm">
                      Design • Development • Innovation
                    </span>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container-shell scroll-mt-24 py-24">
          <Reveal>
            <SectionHeading eyebrow="About" title="Building modern software with purpose and detail" />
          </Reveal>
          <Reveal>
            <GlassCard className="grid gap-8 p-8 md:grid-cols-[0.4fr_1fr] md:p-10">
              <div className="rounded-2xl border border-border bg-secondary/30 p-8 flex flex-col justify-between shadow-inner">
                <div>
                  <Code2 className="text-accent" size={48} />
                  <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{profile.location}</p>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Focus</p>
                  <p className="mt-1 text-base font-bold text-foreground font-display">IT Undergraduate</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Learning deeply. Shipping thoughtfully.</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{profile.aboutText}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Web Development", "Full-stack Development", "UI/UX Design", "Modern Software Engineering"].map((item) => (
                    <span key={item} className="rounded-lg border border-border bg-card/50 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24 border-y border-border bg-secondary/15 py-24">
          <div className="container-shell">
            <Reveal>
              <SectionHeading eyebrow="Skills" title="Tools I use to turn ideas into systems" />
            </Reveal>
            {data.skills.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from(skillGroups).map(([category, skills]) => (
                  <Reveal key={category}>
                    <GlassCard className="h-full p-8 shadow-sm hover:shadow-md transition-all duration-300">
                      <h3 className="mb-6 flex items-center gap-2 font-display text-base font-bold text-foreground pb-3 border-b border-border">
                        <Code2 size={18} className="text-accent" /> {category}
                      </h3>
                      <div className="space-y-5">
                        {skills.map((skill) => (
                          <div key={skill.id}>
                            <div className="mb-2 flex justify-between text-xs font-semibold text-foreground">
                              <span>{skill.name}</span>
                              <span className="text-accent">{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                              <div 
                                className="h-full rounded-full skill-bar-fill transition-all duration-500" 
                                style={{ width: `${skill.level}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyCopy text="Skills can be added from the admin panel." />
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container-shell scroll-mt-24 py-24">
          <Reveal>
            <SectionHeading eyebrow="Projects" title="Selected work and active experiments" description="Practical work across web development, software engineering, and academic problem solving." />
          </Reveal>
          {data.projects.find((project) => project.featured && project.video?.source !== "none") && (
            <Reveal className="mx-auto mb-12 max-w-5xl">
              <ProjectVideo video={data.projects.find((project) => project.featured && project.video?.source !== "none")?.video} title={data.projects.find((project) => project.featured && project.video?.source !== "none")?.title ?? "Featured project"} />
            </Reveal>
          )}
          {data.projects.length ? (
            <ProjectGrid projects={data.projects} />
          ) : (
            <EmptyCopy text="Projects can be added from the admin panel." />
          )}
        </section>

        {/* Education Section */}
        <section id="education" className="container-shell scroll-mt-24 py-24">
          <Reveal>
            <SectionHeading eyebrow="Education" title="Academic foundation" />
          </Reveal>
          <div className="mx-auto max-w-3xl space-y-10 relative pl-6 border-l border-border">
            {data.education.length ? (
              data.education.map((item) => (
                <Reveal key={item.id} className="relative">
                  <div className="timeline-dot" />
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:items-baseline">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={18} className="text-accent" />
                      <h3 className="font-display text-xl font-bold text-foreground">{item.program}</h3>
                    </div>
                    <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground self-start sm:self-auto shadow-sm">
                      {item.startYear} - {item.endYear ?? "Present"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-accent">{item.institute}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </Reveal>
              ))
            ) : (
              <EmptyCopy text="Academic details can be added from the admin panel." />
            )}
          </div>
        </section>

        {/* Experience Section */}
        {settings?.showExperienceSection !== false && (
          <section id="experience" className="scroll-mt-24 border-y border-border bg-secondary/15 py-24">
            <div className="container-shell">
              <Reveal>
                <SectionHeading eyebrow="Experience" title="Learning through real work" />
              </Reveal>
              <div className="mx-auto max-w-3xl space-y-10 relative pl-6 border-l border-border">
                {data.experience.length ? (
                  data.experience.map((item) => (
                    <Reveal key={item.id} className="relative">
                      <div className="timeline-dot" />
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:items-baseline">
                        <div className="flex items-center gap-2">
                          <BriefcaseBusiness size={18} className="text-accent" />
                          <h3 className="font-display text-xl font-bold text-foreground">{item.role}</h3>
                        </div>
                        <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground self-start sm:self-auto shadow-sm">
                          {formatDate(item.startDate)} - {item.currentlyWorking ? "Present" : item.endDate ? formatDate(item.endDate) : "Present"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold text-accent">{item.organization} • {item.type}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </Reveal>
                  ))
                ) : (
                  <EmptyCopy text="Experience entries can include internships, clubs, freelance work, and academic projects." />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Certificates Section */}
        {settings?.showCertificatesSection !== false && (
          <section id="certificates" className="container-shell scroll-mt-24 py-24">
            <Reveal>
              <SectionHeading eyebrow="Certificates" title="Continuous learning, documented" />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.certificates.length ? (
                data.certificates.map((item) => (
                  <Reveal key={item.id}>
                    <GlassCard className="h-full p-7 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <Award className="mb-5 text-amber-500" size={24} />
                        <h3 className="font-display text-base font-bold text-foreground tracking-tight">{item.title}</h3>
                        <p className="mt-1.5 text-xs font-bold text-accent">{item.issuer}</p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{formatDate(item.issuedDate)}</span>
                        {item.credentialUrl && (
                          <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-accent transition-colors">
                            Verify <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </GlassCard>
                  </Reveal>
                ))
              ) : (
                <EmptyCopy text="Certificates can be published from the admin panel." />
              )}
            </div>
          </section>
        )}

        {/* Services Section */}
        {settings?.showServicesSection !== false && (
          <section id="services" className="scroll-mt-24 border-y border-border bg-secondary/15 py-24">
            <div className="container-shell">
              <Reveal>
                <SectionHeading eyebrow="Services" title="Ways I can help" />
              </Reveal>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.services.length ? (
                  data.services.map((item) => (
                    <Reveal key={item.id}>
                      <GlassCard className="h-full p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                        <div>
                          <Wrench className="mb-5 text-accent" size={22} />
                          <h3 className="font-display text-base font-bold text-foreground tracking-tight">{item.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        </div>
                        {item.priceText && (
                          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{item.priceText}</p>
                        )}
                      </GlassCard>
                    </Reveal>
                  ))
                ) : (
                  <EmptyCopy text="Service offerings appear here after seeding." />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="container-shell scroll-mt-24 py-24">
          <Reveal>
            <SectionHeading eyebrow="Contact" title="Let’s build something useful" description="Have an internship, project, or collaboration in mind? Send a message." />
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <GlassCard className="h-full p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Contact details</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Feel free to reach out via email, phone, or social networks. I will respond as quickly as possible.</p>
                  <div className="mt-8 space-y-5 text-sm text-muted-foreground font-semibold">
                    {profile.email && (
                      <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-accent transition-colors duration-200">
                        <Mail size={18} className="text-accent" /> {profile.email}
                      </a>
                    )}
                    {profile.phone && (
                      <p className="flex items-center gap-3">
                        <Phone size={18} className="text-accent" /> {profile.phone}
                      </p>
                    )}
                    {profile.location && (
                      <p className="flex items-center gap-3">
                        <MapPin size={18} className="text-accent" /> {profile.location}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-10 flex gap-4 border-t border-border pt-6">
                  {profile.githubUrl && (
                    <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-border p-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300" aria-label="GitHub">
                      <Github size={20} />
                    </a>
                  )}
                  {profile.linkedinUrl && (
                    <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-border p-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300" aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {profile.youtubeUrl && (
                    <a href={profile.youtubeUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-border p-3 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300" aria-label="YouTube">
                      <Youtube size={20} />
                    </a>
                  )}
                </div>
              </GlassCard>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer name={profile.fullName} />
    </>
  );
}

function EmptyCopy({ text }: { text: string }) {
  return (
    <div className="col-span-full rounded-2xl border-2 border-dashed border-border p-12 text-center text-sm font-semibold text-muted-foreground/60 bg-card/10">
      {text}
    </div>
  );
}
