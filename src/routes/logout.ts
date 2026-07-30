import type { Env } from "../auth/auth.types";

export async function logout(request: Request, env: Env): Promise<Response> {

  const cookieHeader = request.headers.get("Cookie");

  if (cookieHeader) {

    const cookies = Object.fromEntries(
      cookieHeader
        .split(";")
        .map(cookie => {
          const [key, ...value] = cookie.trim().split("=");
          return [key, value.join("=")];
        })
    );

    const token = cookies.session;

    if (token) {

      await env.swagi_intech_db
        .prepare(`
          DELETE FROM sessions
          WHERE token = ?
        `)
        .bind(token)
        .run();

    }

  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Logout successful."
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie":
          "session=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict"
      }
    }
  );

}