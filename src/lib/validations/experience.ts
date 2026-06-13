import { z } from "zod";
import { orderField } from "./common";

export const experienceSchema = z.object({
  role: z.string().min(2),
  organization: z.string().min(2),
  type: z.string().min(2),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  currentlyWorking: z.boolean().default(false),
  description: z.string().min(10),
  technologies: z.array(z.string()),
  order: orderField,
});
