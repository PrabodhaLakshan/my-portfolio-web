import { itemHandlers } from "@/lib/api";
import { experienceSchema } from "@/lib/validations/experience";
const handlers = itemHandlers("experience", experienceSchema);
export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
