import { GatewayResponse } from "@/interfaces/api_shapes";

export function isGatewayResponse(obj: unknown): obj is GatewayResponse {
  return typeof obj === "object" &&
         obj !== null &&
         "message" in obj &&
         typeof obj.message === "string" &&
         ("error" in obj ? typeof obj.error === "string" : true);
}
