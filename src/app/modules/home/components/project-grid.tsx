"use client";

import type { Project } from "@/app/modules/shared/types/portfolio-data";
import { ExternalLink, Github, ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { GlassCard } from "@/components/common/glass-card";
import Image from "next/image";

// ─── Project Detail Modal ────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const youtubeId = project.video?.youtubeVideoId;
  const blobUrl = project.video?.blobUrl || project.video?.url;
  const hasVideo = project.video?.source !== "none" && (youtubeId || blobUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/50 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-xl border border-white/10 bg-card/80 p-2 text-muted-foreground backdrop-blur-sm hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {hasVideo ? (
          <div className="aspect-video w-full overflow-hidden rounded-t-2xl bg-black">
            {youtubeId && project.video?.source === "youtube" ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=1&rel=0&playsinline=1`}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video className="h-full w-full object-cover" src={blobUrl ?? undefined} autoPlay muted loop controls playsInline />
            )}
          </div>
        ) : project.imageUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-secondary/30">
            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-36 w-full items-center justify-center rounded-t-2xl bg-gradient-to-br from-accent/10 to-secondary/30">
            <span className="rounded-lg bg-card/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent border border-border">
              {project.category}
            </span>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/20">
              {project.category}
            </span>
            {project.featured && (
              <span className="rounded-lg bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-400 border border-amber-500/20">
                Featured
              </span>
            )}
          </div>
          <h2 className="mt-3 font-display text-xl font-bold text-foreground sm:text-2xl">{project.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {project.description || project.shortDescription}
          </p>

          <div className="mt-6">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary hover:text-accent transition-all duration-300">
                <Github size={16} /> View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-background hover:opacity-90 transition-all duration-300">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Project Grid ────────────────────────────────────────────────────────────
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [activeModal, setActiveModal] = useState<Project | null>(null);
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollBounds);
      checkScrollBounds();
      const timer = setTimeout(checkScrollBounds, 150);
      return () => { el.removeEventListener("scroll", checkScrollBounds); clearTimeout(timer); };
    }
  }, [visible, checkScrollBounds]);

  return (
    <div className="relative w-full">
      {/* Modal */}
      {activeModal && <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />}

      {/* Category Pills & Navigation */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleScroll("left")} disabled={!canScrollLeft} aria-label="Scroll left"
            className={`rounded-xl border border-border bg-card/40 p-2.5 text-foreground transition-all duration-300 ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:scale-105 hover:bg-secondary hover:text-accent"}`}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => handleScroll("right")} disabled={!canScrollRight} aria-label="Scroll right"
            className={`rounded-xl border border-border bg-card/40 p-2.5 text-foreground transition-all duration-300 ${!canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:scale-105 hover:bg-secondary hover:text-accent"}`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Cards Carousel */}
      <div
        ref={scrollRef}
        className="scrollbar-none flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-2 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {visible.map((project) => {
          const hasVideo = project.video?.source !== "none" && (project.video?.youtubeVideoId || project.video?.blobUrl || project.video?.url);
          return (
            <div
              key={project.id}
              className="min-w-[290px] w-[290px] sm:min-w-[360px] sm:w-[360px] md:min-w-[380px] md:w-[380px] snap-start flex-shrink-0"
            >
              {/* Clickable wrapper */}
              <div
                className="h-full cursor-pointer"
                onClick={() => setActiveModal(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveModal(project); }}
                aria-label={`View details for ${project.title}`}
              >
                <GlassCard className="group flex h-full flex-col overflow-hidden p-0 hover:shadow-lg hover:-translate-y-1.5 hover:border-accent/30 transition-all duration-500">
                  {/* Card Top — Image or Gradient */}
                  <div className="relative flex h-44 w-full overflow-hidden bg-secondary/30 border-b border-border">
                    <div className="absolute left-4 top-4 z-10 flex gap-1.5 opacity-60">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    </div>

                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
                    )}

                    {hasVideo && (
                      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        <Play size={9} className="fill-white" /> Demo
                      </div>
                    )}

                    <div className="absolute bottom-3 left-4 z-10">
                      <span className="rounded-lg bg-card/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-accent border border-border shadow-sm backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-full bg-accent/90 px-4 py-2 text-xs font-bold text-background">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground min-h-[72px]">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="rounded-lg border border-border bg-secondary/40 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="rounded-lg border border-border bg-secondary/40 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="mt-6 flex gap-2 border-t border-border pt-4" onClick={(e) => e.stopPropagation()}>
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer"
                            className="rounded-xl border border-border p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300"
                            aria-label="GitHub">
                            <Github size={16} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer"
                            className="rounded-xl border border-border p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300"
                            aria-label="Live demo">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
