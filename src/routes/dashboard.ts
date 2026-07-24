import type { Env } from "../auth/auth.types";

export async function dashboardStats(
  env: Env
): Promise<Response> {

  const total = await env.swagi_intech_db
    .prepare("SELECT COUNT(*) AS total FROM tenants")
    .first<{ total: number }>();

  const active = await env.swagi_intech_db
    .prepare("SELECT COUNT(*) AS total FROM tenants WHERE status = 'ACTIVE'")
    .first<{ total: number }>();

  const trial = await env.swagi_intech_db
    .prepare("SELECT COUNT(*) AS total FROM tenants WHERE subscription_status = 'TRIAL'")
    .first<{ total: number }>();

  return new Response(
    JSON.stringify(
      {
        totalTenants: total?.total ?? 0,
        activeTenants: active?.total ?? 0,
        trialTenants: trial?.total ?? 0
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