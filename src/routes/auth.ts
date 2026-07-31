import { loginController } from "../auth/auth.controller";
import type { LoginRequest, Env } from "../auth/auth.types";

export async function login(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const body = await request.json() as LoginRequest;
    console.log(body)
    console.log("LOGIN BODY:", body);

    return await loginController(env, body);

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error 
? error.message 
: String(error)
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}