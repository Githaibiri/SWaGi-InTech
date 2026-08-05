import { TenantDashboardService } from "./dashboard.service";
import type { Env } from "./dashboard.types";
import { getCurrentUser } from "../auth/session.middleware";

const service = new TenantDashboardService();

export async function tenantDashboard(
    request: Request,
    env: Env
): Promise<Response> {

    const currentUser =
        await getCurrentUser(
            request,
            env
        );

    if (!currentUser) {

        return Response.json(
            {
                success: false,
                message: "Unauthorized."
            },
            {
                status: 401
            }
        );

    }

    const result =
        await service.getDashboard(
            env,
            currentUser.tenant_id!
        );

    return Response.json(result);

}