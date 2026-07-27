import type { Env } from "./tenantAdmin.types";

export async function listTenantAdmins(
    env: Env
): Promise<Response> {

    const admins = await env.swagi_intech_db
        .prepare(`
            SELECT
                id,
                tenant_id,
                full_name,
                username,
                email,
                role,
                is_active,
                created_at,
                updated_at
            FROM admin_users
            WHERE role = 'tenant_admin'
            ORDER BY created_at DESC
        `)
        .all();

    return new Response(
        JSON.stringify(
            {
                success: true,
                tenantAdmins: admins.results
            },
            null,
            2
        ),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}