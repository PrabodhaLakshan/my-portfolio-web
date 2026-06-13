import { z } from "zod";
import { orderField } from "./common";

export const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string().optional().nullable(),
  priceText: z.string().optional().nullable(),
  order: orderField,
  active: z.boolean().default(true),
});
