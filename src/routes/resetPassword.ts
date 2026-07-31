import { resetPasswordController } from "../auth/resetPassword.controller";
import type { Env } from "../auth/auth.types";

export async function resetPassword(
  request: Request,
  env: Env
): Promise<Response> {

  const body = await request.json() as {
    code: string;
    newPassword: string;
  };

  if (!body.code || !body.newPassword) {

    return new Response(
      JSON.stringify({
        success: false,
        message: "Verification code and new password are required."
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }

  return resetPasswordController(
    env,
    body.code,
    body.newPassword
  );

}