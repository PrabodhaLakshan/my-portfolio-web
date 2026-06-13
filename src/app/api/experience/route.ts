import { collectionHandlers } from "@/lib/api";
import { experienceSchema } from "@/lib/validations/experience";
const handlers = collectionHandlers("experience", experienceSchema);
export const GET = handlers.GET;
export const POST = handlers.POST;
