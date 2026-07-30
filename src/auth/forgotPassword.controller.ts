import { ForgotPasswordService } from "./forgotPassword.service";
import type { Env } from "./auth.types";

const forgotPasswordService = new ForgotPasswordService();

export async function forgotPasswordController(

  env: Env,

  identifier: string

): Promise<Response> {

  const result = await forgotPasswordService.requestReset(

    env,

    identifier

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