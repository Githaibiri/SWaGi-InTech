import { verifyResetCodeController } from "../auth/verifyResetCode.controller";
import type { Env } from "../auth/auth.types";

export async function verifyResetCode(
  request: Request,
  env: Env
): Promise<Response> {

  const body = await request.json() as {
    code: string;
  };

  if (!body.code) {

    return new Response(
      JSON.stringify({
        success: false,
        message: "Verification code is required."
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }

  return verifyResetCodeController(
    env,
    body.code
  );

}