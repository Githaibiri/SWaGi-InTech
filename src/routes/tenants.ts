import type { Env } from "../auth/auth.types";

export async function listTenants(
  env: Env
): Promise<Response> {

  const result = await env.swagi_intech_db
    .prepare(`
      SELECT
        id,
        business_name,
        contact_person,
        email,
        phone,
        status,
        subscription_status,
        created_at
      FROM tenants
      ORDER BY created_at DESC
    `)
    .all();

  return new Response(
    JSON.stringify(result.results, null, 2),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}