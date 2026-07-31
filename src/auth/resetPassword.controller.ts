import { ResetPasswordService } from "./resetPassword.service";
import type { Env } from "./auth.types";

const resetPasswordService = new ResetPasswordService();

export async function resetPasswordController(
  env: Env,
  code: string,
  newPassword: string
): Promise<Response> {

  const result = await resetPasswordService.reset(
    env,
    code,
    newPassword
  );

  return new Response(
    JSON.stringify(result, null, 2),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

}