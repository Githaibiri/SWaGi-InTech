import type { Env } from "./auth.types";

export class VerifyResetCodeService {

  async verify(
    env: Env,
    code: string
  ) {

    const record = await env.swagi_intech_db
      .prepare(`
        SELECT
          id,
          user_id,
          expires_at,
          used
        FROM password_reset_tokens
        WHERE reset_code = ?
        LIMIT 1
      `)
      .bind(code)
      .first<{
        id: string;
        user_id: string;
        expires_at: string;
        used: number;
      }>();

    if (!record) {
      return {
        success: false,
        message: "Invalid verification code."
      };
    }

    if (record.used) {
      return {
        success: false,
        message: "Verification code already used."
      };
    }

    if (new Date(record.expires_at) < new Date()) {
      return {
        success: false,
        message: "Verification code expired."
      };
    }

    return {
      success: true,
      user_id: record.user_id
    };

  }

}