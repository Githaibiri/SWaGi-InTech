import type { Env } from "../auth/auth.types";

export interface DashboardStatistics {

    tenants: number;

    customers: number;

    revenue_today: number;

    online_routers: number;

}

export interface DashboardResponse {

    success: boolean;

    statistics: DashboardStatistics;

}

export type { Env };