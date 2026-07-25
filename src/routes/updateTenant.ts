import type { Env } from "../auth/auth.types";

export async function updateTenant(
  request: Request,
  env: Env,
  id: string
): Promise<Response> {

  const body = await request.json();

  await env.swagi_intech_db
    .prepare(`
      UPDATE tenants
      SET
        business_name = ?,
        contact_person = ?,
        email = ?,
        phone = ?,
        updated_at = ?
      WHERE id = ?
    `)
    .bind(
      body.business_name,
      body.contact_person,
      body.email,
      body.phone,
      new Date().toISOString(),
      id
    )
    .run();

  return new Response(
    JSON.stringify({
      success: true,
      message: "Tenant updated successfully."
    }, null, 2),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}