import { itemHandlers } from "@/lib/api";
import { serviceSchema } from "@/lib/validations/service";
const handlers = itemHandlers("service", serviceSchema);
export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
