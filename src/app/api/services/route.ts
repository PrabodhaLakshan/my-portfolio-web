import { collectionHandlers } from "@/lib/api";
import { serviceSchema } from "@/lib/validations/service";
const handlers = collectionHandlers("service", serviceSchema);
export const GET = handlers.GET;
export const POST = handlers.POST;
