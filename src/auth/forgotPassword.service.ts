import type { Env } from "./auth.types";

export class ForgotPasswordService {

  async requestReset(

    env: Env,

    identifier: string

  ) {

    const user = await env.swagi_intech_db
      .prepare(`
        SELECT
          id,
          email,
          phone,
          full_name
        FROM admin_users
        WHERE email = ?
           OR phone = ?
        LIMIT 1
      `)
      .bind(identifier, identifier)
      .first<{
        id: string;
        email: string;
        phone: string;
        full_name: string;
      }>();

    if (!user) {

      return {

        success: false,

        message: "Account not found."

      };

    }

    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expires = new Date();

    expires.setMinutes(
      expires.getMinutes() + 15
    );

    await env.swagi_intech_db
      .prepare(`
        INSERT INTO password_reset_tokens(

          id,

          user_id,

          reset_code,

          expires_at,

          used,

          created_at

        )

        VALUES (?, ?, ?, ?, 0, ?)

      `)
      .bind(

        crypto.randomUUID(),

        user.id,

        code,

        expires.toISOString(),

        new Date().toISOString()

      )
      .run();

    return {

      success: true,

      message: "Verification code generated.",

      verification_code: code

    };

  }

}