import { z } from "zod";

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
});
