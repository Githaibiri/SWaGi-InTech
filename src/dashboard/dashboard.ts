import type { Env } from "../auth/auth.types";

export async function dashboard(
    request: Request,
    env: Env
): Promise<Response> {

    const statistics =
        await env.swagi_intech_db
            .prepare(`
                SELECT

                    COUNT(*) AS tenants,

                    SUM(
                        CASE
                            WHEN status = 'ACTIVE'
                            THEN 1
                            ELSE 0
                        END
                    ) AS activeTenants,

                    SUM(
                        CASE
                            WHEN status = 'SUSPENDED'
                            THEN 1
                            ELSE 0
                        END
                    ) AS suspendedTenants,

                    SUM(
                        CASE
                            WHEN subscription_status = 'TRIAL'
                            THEN 1
                            ELSE 0
                        END
                    ) AS trialTenants,

                    SUM(
                        CASE
                            WHEN subscription_status = 'MONTHLY'
                            THEN 1
                            ELSE 0
                        END
                    ) AS monthlyTenants,

                    SUM(
                        CASE
                            WHEN subscription_status = 'YEARLY'
                            THEN 1
                            ELSE 0
                        END
                    ) AS yearlyTenants

                FROM tenants
            `)
            .first();

    return Response.json({

        success: true,

        statistics: {

            tenants:
                Number(statistics?.tenants ?? 0),

            activeTenants:
                Number(statistics?.activeTenants ?? 0),

            suspendedTenants:
                Number(statistics?.suspendedTenants ?? 0),

            trialTenants:
                Number(statistics?.trialTenants ?? 0),

            monthlyTenants:
                Number(statistics?.monthlyTenants ?? 0),

            yearlyTenants:
                Number(statistics?.yearlyTenants ?? 0)

        }

    });

}