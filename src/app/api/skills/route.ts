import { collectionHandlers } from "@/lib/api";
import { skillSchema } from "@/lib/validations/skill";
const handlers = collectionHandlers("skill", skillSchema);
export const GET = handlers.GET;
export const POST = handlers.POST;
