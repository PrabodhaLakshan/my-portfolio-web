import { z } from "zod";
import { orderField } from "./common";

export const educationSchema = z.object({
  program: z.string().min(2),
  institute: z.string().min(2),
  startYear: z.string().min(4),
  endYear: z.string().optional().nullable(),
  description: z.string().min(10),
  achievements: z.array(z.string()),
  order: orderField,
});
