import { z } from "zod";
import { orderField } from "./common";

export const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z.coerce.number().int().min(0).max(100),
  icon: z.string().optional().nullable(),
  order: orderField,
});
