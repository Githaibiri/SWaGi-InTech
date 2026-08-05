import type { Env } from "./auth.types";

export async function requireSession(
  request: Request,
  env: Env
): Promise<Response | null> {

  const cookieHeader = request.headers.get("Cookie");

if (!cookieHeader) {
  return unauthorized();
}

const cookies = Object.fromEntries(
  cookieHeader
    .split(";")
    .map(cookie => {
      const [key, ...value] = cookie.trim().split("=");
      return [key, value.join("=")];
    })
);

const token = cookies.session;

if (!token) {
  return unauthorized();
}

  const session = await env.swagi_intech_db
    .prepare(`
      SELECT
        token,
        expires_at
      FROM sessions
      WHERE token = ?
      LIMIT 1
    `)
    .bind(token)
    .first<{ token: string; expires_at: string }>();

  if (!session) {
    return unauthorized();
  }

  if (new Date(session.expires_at) < new Date()) {
    return unauthorized();
  }

  return null;

}

export async function getCurrentUser(
  request: Request,
  env: Env
): Promise<{
  id: string;
  tenant_id: string | null;
  role: string;
  full_name: string;
  email: string;
} | null> {

  const cookieHeader = request.headers.get("Cookie");

  if (!cookieHeader) {
    return null;
  }

  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map(cookie => {
        const [key, ...value] = cookie.trim().split("=");
        return [key, value.join("=")];
      })
  );

  const token = cookies.session;

  if (!token) {
    return null;
  }

  return await env.swagi_intech_db
    .prepare(`
      SELECT
        admin_users.id,
        admin_users.tenant_id,
        admin_users.role,
        admin_users.full_name,
        admin_users.email
      FROM sessions
      JOIN admin_users
        ON sessions.user_id = admin_users.id
      WHERE sessions.token = ?
      LIMIT 1
    `)
    .bind(token)
    .first<{
      id: string;
      tenant_id: string | null;
      role: string;
      full_name: string;
      email: string;
    }>();

}

function unauthorized(): Response {

  return new Response(

    JSON.stringify({

      success: false,
      message: "Unauthorized."

    }),

    {

      status: 401,

      headers: {

        "Content-Type": "application/json"

      }

    }

  );

}