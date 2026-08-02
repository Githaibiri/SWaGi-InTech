export interface Env {

    swagi_intech_db: D1Database;

}

export interface TenantDashboardResponse {

    success: boolean;

    business_name: string;

    statistics: {

        packages: number;

        customers: number;

        active_sessions: number;

        today_revenue: number;

    };

}