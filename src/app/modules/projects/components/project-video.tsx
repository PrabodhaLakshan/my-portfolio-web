import type { ProjectVideo as ProjectVideoType } from "@/app/modules/shared/types/portfolio-data";

type Props = {
  video?: ProjectVideoType;
  title: string;
};

export function ProjectVideo({ video, title }: Props) {
  if (!video || video.source === "none") return null;

  if (video.source === "youtube" && video.youtubeVideoId) {
    const params = new URLSearchParams({
      autoplay: video.autoplay ? "1" : "0",
      mute: "1",
      controls: video.controls ? "1" : "0",
      rel: "0",
      playsinline: "1",
    });

    if (video.loop) {
      params.set("loop", "1");
      params.set("playlist", video.youtubeVideoId);
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeVideoId}?${params.toString()}`}
            title={`${title} demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  if (video.source === "vercel" && (video.blobUrl || video.url)) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10">
        <video
          className="aspect-video h-full w-full object-cover"
          src={video.blobUrl || video.url}
          autoPlay={video.autoplay ?? true}
          muted
          loop={video.loop ?? true}
          controls={video.controls ?? true}
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  return null;
}
