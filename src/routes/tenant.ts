import { createTenantController } from "../controllers/tenant.controller";
import type { CreateTenantRequest } from "../types/tenant.types";
import type { Env } from "../auth/auth.types";

export async function createTenant(
  request: Request,
  env: Env
): Promise<Response> {

  try {

    const body = await request.json() as CreateTenantRequest;

    return await createTenantController(env, body);

  } catch {

    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid request."
      }),

  }