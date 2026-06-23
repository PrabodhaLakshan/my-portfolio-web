import { z } from "zod";

function isValidUrlOrPath(value: string) {
  if (value === "") return true;

  const trimmed = value.trim();
  if (trimmed.startsWith("/")) return true;
  if (trimmed.startsWith("data:")) return true;

  return z.string().url().safeParse(trimmed).success;
}

export const optionalUrl = z
  .string()
  .trim()
  .refine((value) => isValidUrlOrPath(value), "Enter a valid URL")
  .optional()
  .nullable();

export const orderField = z.coerce.number().int().min(0).default(0);
