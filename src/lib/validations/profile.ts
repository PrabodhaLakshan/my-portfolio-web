import { z } from "zod";
import { optionalUrl } from "./common";

export const profileSchema = z.object({
  fullName: z.string().min(2),
  professionalTitle: z.string().min(2),
  shortBio: z.string().min(10),
  aboutText: z.string().min(20),
  profileImageUrl: optionalUrl,
  cvUrl: optionalUrl,
  email: z.union([z.string().email(), z.literal("")]).optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  facebookUrl: optionalUrl,
  instagramUrl: optionalUrl,
  whatsappUrl: optionalUrl,
});
