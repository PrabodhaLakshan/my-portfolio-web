import { z } from "zod";

const youtubeShortsItemSchema = z.object({
  id: z.string(),
  url: z.string().url("Enter a valid YouTube URL"),
  title: z.string().optional(),
});

export const settingsSchema = z.object({
  siteTitle: z.string().min(2),
  metaDescription: z.string().min(20),
  heroBadgeText: z.string().optional().nullable(),
  primaryColor: z.string().optional().nullable(),
  accentColor: z.string().optional().nullable(),
  showServicesSection: z.boolean(),
  showCertificatesSection: z.boolean(),
  showExperienceSection: z.boolean(),
  maintenanceMode: z.boolean(),
  youtubeChannelName: z.string().optional().nullable(),
  youtubeShorts: z.array(youtubeShortsItemSchema).optional().nullable(),
});

