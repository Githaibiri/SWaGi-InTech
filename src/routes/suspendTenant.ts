import type { Env } from "../auth/auth.types";

export async function suspendTenant(
  env: Env,
  id: string
): Promise<Response> {

  const tenant = await env.swagi_intech_db
    .prepare("SELECT status FROM tenants WHERE id = ?")
    .bind(id)
    .first<{ status: string }>();

  if (!tenant) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Tenant not found."
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  const newStatus =
    tenant.status === "ACTIVE"
      ? "SUSPENDED"
      : "ACTIVE";

  await env.swagi_intech_db
    .prepare(`
      UPDATE tenants
      SET
        status = ?,
        updated_at = ?
      WHERE id = ?
    `)
    .bind(
      newStatus,
      new Date().toISOString(),
      id
    )
    .run();

  return new Response(
    JSON.stringify({
      success: true,
      message: `Tenant ${newStatus.toLowerCase()} successfully.`,
      status: newStatus
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}