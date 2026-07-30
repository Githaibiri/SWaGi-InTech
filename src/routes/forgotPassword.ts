import { forgotPasswordController } from "../auth/forgotPassword.controller";
import type { Env } from "../auth/auth.types";

export async function forgotPassword(
  request: Request,
  env: Env
): Promise<Response> {

  try {

    const body = await request.json() as {
      identifier: string;
    };

    if (!body.identifier) {

      return new Response(
        JSON.stringify({
          success: false,
          message: "Email or phone number is required."
        }, null, 2),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    }

    return forgotPasswordController(
      env,
      body.identifier
    );

  } catch {

    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid request."
      }, null, 2),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }

}