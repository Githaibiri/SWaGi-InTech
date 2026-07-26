import type {
    DashboardResponse,
    Env
} from "./dashboard.types";

export class DashboardService {

    async getStatistics(
        env: Env
    ): Promise<DashboardResponse> {

        const tenantResult = await env.swagi_intech_db
            .prepare(`
                SELECT COUNT(*) AS total
                FROM tenants
            `)
            .first<{ total: number }>();

        return {

            success: true,

            statistics: {

                tenants: Number(tenantResult?.total ?? 0),

                customers: 0,

                revenue_today: 0,

                online_routers: 0

            }

        };

    }

}