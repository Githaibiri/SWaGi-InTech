import { AuthService } from "./auth.service";
import type { LoginRequest, Env } from "./auth.types";

const authService = new AuthService();

export async function loginController(
  env: Env,
  request: LoginRequest
): Promise<Response> {

  const result = await authService.login(env, request);

  const headers = new Headers({
  "Content-Type": "application/json"
});

if (result.success && result.token) {

  headers.append(
    "Set-Cookie",
    `session=${result.token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
  );

}

return new Response(
  JSON.stringify(result, null, 2),
  {
    headers
  }
);
}