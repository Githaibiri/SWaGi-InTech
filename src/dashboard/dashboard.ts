import type { Env } from "../auth/auth.types";

export async function dashboard(
    request: Request,
    env: Env
): Promise<Response> {

    const tenants = await env.swagi_intech_db
        .prepare(`
            SELECT COUNT(*) AS total
            FROM tenants
        `)
        .first();

    const activeTenants = await env.swagi_intech_db
        .prepare(`
            SELECT COUNT(*) AS total
            FROM tenants
            WHERE status='ACTIVE'
        `)
        .first();

    const suspendedTenants = await env.swagi_intech_db
        .prepare(`
            SELECT COUNT(*) AS total
            FROM tenants
            WHERE status='SUSPENDED'
        `)
        .first();

    const trialTenants = await env.swagi_intech_db
        .prepare(`
            SELECT COUNT(*) AS total
            FROM tenants
            WHERE subscription_status='TRIAL'
        `)
        .first();

    const monthlyTenants = await env.swagi_intech_db
        .prepare(`
            SELECT COUNT(*) AS total
            FROM tenants
            WHERE subscription_status='MONTHLY'
        `)
        .first();

    const yearlyTenants = await env.swagi_intech_db
        .prepare(`
            SELECT COUNT(*) AS total
            FROM tenants
            WHERE subscription_status='YEARLY'
        `)
        .first();

    return Response.json({

        success: true,

        statistics: {

            tenants: Number(tenants?.total ?? 0),

            activeTenants:
                Number(activeTenants?.total ?? 0),

            suspendedTenants:
                Number(suspendedTenants?.total ?? 0),

            trialTenants:
                Number(trialTenants?.total ?? 0),

            monthlyTenants:
                Number(monthlyTenants?.total ?? 0),

            yearlyTenants:
                Number(yearlyTenants?.total ?? 0)

        }

    });

}