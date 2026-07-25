import type { Env } from "../auth/auth.types";

export async function deleteTenant(
  env: Env,
  id: string
): Promise<Response> {

  await env.swagi_intech_db
    .prepare("DELETE FROM tenants WHERE id = ?")
    .bind(id)
    .run();

  return new Response(
    JSON.stringify({
      success: true,
      message: "Tenant deleted successfully."
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}