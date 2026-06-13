import { itemHandlers } from "@/lib/api";
import { skillSchema } from "@/lib/validations/skill";
const handlers = itemHandlers("skill", skillSchema);
export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
