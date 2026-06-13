import { z } from "zod";
import { optionalUrl, orderField } from "./common";

const projectVideoSchema = z
  .object({
    source: z.enum(["none", "vercel", "youtube"]),
    url: optionalUrl,
    youtubeUrl: optionalUrl,
    youtubeVideoId: z.string().optional().nullable(),
    blobUrl: optionalUrl,
    autoplay: z.boolean().default(true),
    muted: z.boolean().default(true),
    loop: z.boolean().default(true),
    controls: z.boolean().default(true),
  })
  .optional();

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug"),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  techStack: z.array(z.string().min(1)).min(1),
  category: z.string().min(2),
  imageUrl: optionalUrl,
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  featured: z.boolean().default(false),
  order: orderField,
  video: projectVideoSchema,
});
