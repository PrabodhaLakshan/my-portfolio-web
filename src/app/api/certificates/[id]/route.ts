import { itemHandlers } from "@/lib/api";
import { certificateSchema } from "@/lib/validations/certificate";
const handlers = itemHandlers("certificate", certificateSchema);
export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
