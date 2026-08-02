import { TenantDashboardService } from "./dashboard.service";
import type { Env } from "./dashboard.types";

const service = new TenantDashboardService();

export async function tenantDashboard(
    request: Request,
    env: Env
): Promise<Response> {

    // Temporary tenant ID
    // Later this will come from the logged-in session.
    const tenantId = "TEMP_TENANT_ID";

    const result = await service.getDashboard(
        env,
        tenantId
    );

    return Response.json(result);

}