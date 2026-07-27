import { TenantAdminService } from "./tenantAdmin.service";

import type {
    CreateTenantAdminRequest,
    Env
} from "./tenantAdmin.types";

const tenantAdminService = new TenantAdminService();

export async function createTenantAdminController(
    request: Request,
    env: Env
): Promise<Response> {

    const body =
        await request.json() as CreateTenantAdminRequest;

    const result =
        await tenantAdminService.createTenantAdmin(
            env,
            body
        );

    return new Response(
        JSON.stringify(result, null, 2),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}