"use client";

import { Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Short = { id: string; url: string; title?: string };

function getYoutubeShortEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    // Handle youtu.be/ID, youtube.com/shorts/ID, youtube.com/watch?v=ID
    let videoId: string | null = null;
    if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1).split("?")[0];
    } else if (u.pathname.includes("/shorts/")) {
      videoId = u.pathname.split("/shorts/")[1]?.split("?")[0] ?? null;
    } else {
      videoId = u.searchParams.get("v");
    }
    if (!videoId) return null;
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: videoId,
      playsinline: "1",
      controls: "0",
      rel: "0",
      modestbranding: "1",
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  } catch {
    return null;
  }
}

function ShortCard({ short, channelName }: { short: Short; channelName?: string }) {
  const embedUrl = getYoutubeShortEmbedUrl(short.url);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!embedUrl) return null;

  return (
    <div
      ref={containerRef}
      className="group relative flex-shrink-0 w-[200px] sm:w-[220px] snap-start"
    >
      {/* 9:16 Short frame */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl shadow-black/40 transition-all duration-500 group-hover:border-red-500/40 group-hover:shadow-red-500/10 group-hover:-translate-y-1"
        style={{ aspectRatio: "9/16" }}
      >
        {inView ? (
          <iframe
            className="h-full w-full pointer-events-none"
            src={embedUrl}
            title={short.title || "YouTube Short"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-secondary/30 to-black flex items-center justify-center">
            <Youtube size={32} className="text-red-500/40" />
          </div>
        )}

        {/* Overlay with link */}
        <a
          href={short.url}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-10"
          aria-label={short.title || "Watch YouTube Short"}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pointer-events-none">
          {short.title && (
            <p className="text-[11px] font-semibold text-white line-clamp-2 leading-tight">
              {short.title}
            </p>
          )}
        </div>
      </div>

      {/* Channel badge below card */}
      {channelName && (
        <div className="mt-2.5 flex items-center gap-1.5 px-1">
          <Youtube size={12} className="text-red-500 flex-shrink-0" />
          <span className="text-[10px] font-bold text-muted-foreground truncate">{channelName}</span>
        </div>
      )}
    </div>
  );
}

export function YoutubeShorts({
  shorts,
  channelName,
  channelUrl,
}: {
  shorts: Short[];
  channelName?: string;
  channelUrl?: string;
}) {
  if (!shorts || shorts.length === 0) return null;

  return (
    <div className="mt-16">
      {/* Section header */}
      <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
            <Youtube size={20} className="text-red-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              YouTube Shorts
            </p>
            {channelName && (
              <p className="text-sm font-bold text-foreground">
                {channelName}
              </p>
            )}
          </div>
        </div>
        {channelUrl && (
          <a
            href={channelUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300"
          >
            <Youtube size={14} /> Subscribe
          </a>
        )}
      </div>

      {/* Horizontal scroll of short cards */}
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {shorts.map((short) => (
          <ShortCard key={short.id} short={short} channelName={channelName} />
        ))}
      </div>
    </div>
  );
}
