import type { ProjectVideo } from "@/app/modules/shared/types/portfolio-data";
import { getYouTubeVideoId } from "@/lib/youtube";

export function normalizeProjectVideo(video?: ProjectVideo) {
  const base = {
    source: video?.source ?? "none" as const,
    autoplay: video?.autoplay ?? true,
    muted: true,
    loop: video?.loop ?? true,
    controls: video?.controls ?? true,
  };

  if (base.source === "none") return { success: true as const, data: base };

  if (base.source === "vercel") {
    const blobUrl = video?.blobUrl || video?.url;
    return blobUrl
      ? { success: true as const, data: { ...base, blobUrl, url: blobUrl } }
      : { success: false as const, message: "Upload a project video before saving" };
  }

  const youtubeUrl = video?.youtubeUrl;
  const youtubeVideoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;
  return youtubeUrl && youtubeVideoId
    ? { success: true as const, data: { ...base, youtubeUrl, youtubeVideoId } }
    : { success: false as const, message: "Enter a valid YouTube video URL" };
}
