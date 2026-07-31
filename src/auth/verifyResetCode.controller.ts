import { VerifyResetCodeService } from "./verifyResetCode.service";
import type { Env } from "./auth.types";

const verifyResetCodeService = new VerifyResetCodeService();

export async function verifyResetCodeController(
  env: Env,
  code: string
): Promise<Response> {

  const result = await verifyResetCodeService.verify(
    env,
    code
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