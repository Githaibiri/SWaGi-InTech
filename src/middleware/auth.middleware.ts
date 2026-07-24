import type { Env } from "../auth/auth.types";

export async function requireAuth(
  request: Request,
  env: Env
): Promise<Response | null> {

  const token = request.headers.get("Authorization");

  if (!token) {
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

  return null;
}