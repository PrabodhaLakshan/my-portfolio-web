import { itemHandlers } from "@/lib/api";
import { educationSchema } from "@/lib/validations/education";
const handlers = itemHandlers("education", educationSchema);
export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
