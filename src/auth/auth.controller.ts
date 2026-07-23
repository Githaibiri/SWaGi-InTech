import { AuthService } from "./auth.service";
import type { LoginRequest, Env } from "./auth.types";

const authService = new AuthService();

export async function loginController(
  env: Env,
  request: LoginRequest
): Promise<Response> {

  const result = await authService.login(env, request);

  return new Response(
    JSON.stringify(result, null, 2),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}