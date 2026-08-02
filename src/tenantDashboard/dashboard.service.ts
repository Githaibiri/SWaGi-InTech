import type {
    Env,
    TenantDashboardResponse
} from "./dashboard.types";

export class TenantDashboardService {

    async getDashboard(

        env: Env,
        tenantId: string

    ): Promise<TenantDashboardResponse> {

        const tenant = await env.swagi_intech_db
            .prepare(`
                SELECT business_name
                FROM tenants
                WHERE id = ?
            `)
            .bind(tenantId)
            .first();

        const packages = await env.swagi_intech_db
            .prepare(`
                SELECT COUNT(*) AS total
                FROM packages
                WHERE tenant_id = ?
            `)
            .bind(tenantId)
            .first();

        return {

            success: true,

            business_name:
                tenant?.business_name ?? "Unknown Business",

            statistics: {

                packages:
                    Number(packages?.total ?? 0),

                customers: 0,

                active_sessions: 0,

                today_revenue: 0

            }

        };

    }

}