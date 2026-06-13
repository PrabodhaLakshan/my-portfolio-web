import { collectionHandlers } from "@/lib/api";
import { educationSchema } from "@/lib/validations/education";
const handlers = collectionHandlers("education", educationSchema);
export const GET = handlers.GET;
export const POST = handlers.POST;
