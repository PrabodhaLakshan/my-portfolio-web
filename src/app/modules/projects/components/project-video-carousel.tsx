"use client";

import type { Project } from "@/app/modules/shared/types/portfolio-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

type Props = {
  projects: Project[];
};

function getYoutubeEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "1",
    rel: "0",
    playsinline: "1",
    loop: "1",
    playlist: videoId,
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function ProjectVideoCarousel({ projects }: Props) {
  const videoProjets = projects.filter(
    (p) =>
      p.video?.source !== "none" &&
      (p.video?.youtubeVideoId || p.video?.blobUrl || p.video?.url),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning],
  );

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % videoProjets.length);
  }, [currentIndex, videoProjets.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + videoProjets.length) % videoProjets.length);
  }, [currentIndex, videoProjets.length, goTo]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (videoProjets.length <= 1) return;
    timerRef.current = setTimeout(goNext, 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, videoProjets.length, goNext]);

  if (videoProjets.length === 0) return null;

  const current = videoProjets[currentIndex];
  const video = current.video!;
  const youtubeId = video.youtubeVideoId;
  const blobUrl = video.blobUrl || video.url;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10">
      {/* Video frame */}
      <div
        className="aspect-video w-full relative"
        style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 0.35s ease" }}
      >
        {youtubeId && video.source === "youtube" ? (
          <iframe
            key={`yt-${currentIndex}`}
            className="h-full w-full"
            src={getYoutubeEmbedUrl(youtubeId)}
            title={`${current.title} demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : blobUrl && video.source === "vercel" ? (
          <video
            key={`blob-${currentIndex}`}
            className="h-full w-full object-cover"
            src={blobUrl}
            autoPlay
            muted
            loop={video.loop ?? true}
            controls={video.controls ?? true}
            playsInline
            preload="metadata"
          />
        ) : null}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black/20 px-4 py-3 backdrop-blur-sm">
        {/* Project title */}
        <div
          className="flex-1 min-w-0"
          style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 0.35s ease" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/70 mb-0.5">
            Now playing
          </p>
          <p className="truncate text-sm font-semibold text-foreground">
            {current.title}
          </p>
        </div>

        {/* Dot indicators + arrows */}
        {videoProjets.length > 1 && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {videoProjets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-5 bg-cyan-400"
                      : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex gap-1">
              <button
                onClick={goPrev}
                aria-label="Previous video"
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={goNext}
                aria-label="Next video"
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
