import { z } from "zod";

export const optionalUrl = z
  .string()
  .trim()
  .refine((value) => value === "" || z.string().url().safeParse(value).success, "Enter a valid URL")
  .optional()
  .nullable();

export const orderField = z.coerce.number().int().min(0).default(0);
