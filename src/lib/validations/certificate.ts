import { z } from "zod";
import { optionalUrl, orderField } from "./common";

export const certificateSchema = z.object({
  title: z.string().min(2),
  issuer: z.string().min(2),
  issuedDate: z.coerce.date(),
  credentialUrl: optionalUrl,
  imageUrl: optionalUrl,
  description: z.string().optional().nullable(),
  order: orderField,
});
