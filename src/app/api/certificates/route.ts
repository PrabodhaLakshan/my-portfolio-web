import { collectionHandlers } from "@/lib/api";
import { certificateSchema } from "@/lib/validations/certificate";
const handlers = collectionHandlers("certificate", certificateSchema);
export const GET = handlers.GET;
export const POST = handlers.POST;
