import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  Env,
} from "./auth.types";

import { verifyPassword } from "./password";
import {
  generateSessionToken,
  getSessionExpiry
} from "./session";

export class AuthService {
  async login(
    env: Env,
    request: LoginRequest
  ): Promise<LoginResponse> {

    const user = await env.swagi_intech_db
      .prepare(
        `
        SELECT
          id,
          tenant_id,
          full_name,
          email,
          password_hash,
          role,
          is_active
        FROM admin_users
        WHERE email = ?
        LIMIT 1
      `
      )
      .bind(request.email)
      .first<AuthUser>();

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password."
      };
    }

    if (!user.is_active) {
      return {
        success: false,
        message: "Account is disabled."
      };
    }

    const validPassword = await verifyPassword(
      request.password,
      user.password_hash
    );

    if (!validPassword) {
      return {
        success: false,
        message: "Invalid email or password."
      };
    }

    const token = generateSessionToken();

    const expiresAt = getSessionExpiry();

await env.swagi_intech_db
  .prepare(`
    INSERT INTO sessions (
      id,
      user_id,
      token,
      expires_at,
      created_at
    )
    VALUES (?, ?, ?, ?, ?)
  `)
  .bind(
    crypto.randomUUID(),
    user.id,
    token,
    expiresAt.toISOString(),
    new Date().toISOString()
  )
  .run();

    return {
      success: true,
      message: "Login successful.",
      user: {
        id: Number(user.id),
        full_name: user.full_name,
        email: user.email,
        role: user.role
      },
      token
    };
  }
}