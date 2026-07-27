import { createTenantAdminController } from "./tenantAdmin.controller";
import type { Env } from "./tenantAdmin.types";

export async function createTenantAdmin(
    request: Request,
    env: Env
): Promise<Response> {

    return createTenantAdminController(
        request,
        env
    );

}