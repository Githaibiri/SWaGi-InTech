import { DashboardService } from "./dashboard.service";
import type { Env } from "./dashboard.types";

const dashboardService = new DashboardService();

export async function dashboardController(
    env: Env
): Promise<Response> {

    const result = await dashboardService.getStatistics(env);

    return new Response(
        JSON.stringify(result, null, 2),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}