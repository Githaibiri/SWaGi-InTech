import { TenantService } from "../services/tenant.service";
import type { CreateTenantRequest } from "../types/tenant.types";
import type { Env } from "../auth/auth.types";

const tenantService = new TenantService();

export async function createTenantController(
  env: Env,
  request: CreateTenantRequest
): Promise<Response> {

  const result = await tenantService.create(env, request);

  return new Response(
    JSON.stringify(result, null, 2),
    {
      status: result.success ? 201 : 400,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}