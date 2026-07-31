import bcrypt from "bcryptjs";
import type { Env } from "./auth.types";

export class ResetPasswordService {

  async reset(
    env: Env,
    code: string,
    newPassword: string
  ) {

    const token = await env.swagi_intech_db
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

    if (!token) {
      return {
        success: false,
        message: "Invalid verification code."
      };
    }

    if (token.used) {
      return {
        success: false,
        message: "Verification code already used."
      };
    }

    if (new Date(token.expires_at) < new Date()) {
      return {
        success: false,
        message: "Verification code expired."
      };
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await env.swagi_intech_db
      .prepare(`
        UPDATE admin_users
        SET password_hash = ?
        WHERE id = ?
      `)
      .bind(passwordHash, token.user_id)
      .run();

    await env.swagi_intech_db
      .prepare(`
        UPDATE password_reset_tokens
        SET used = 1
        WHERE id = ?
      `)
      .bind(token.id)
      .run();

    return {
      success: true,
      message: "Password reset successfully."
    };

  }

}