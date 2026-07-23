import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  Env,
} from "./auth.types";

import { verifyPassword } from "./password";
import { generateSessionToken } from "./session";

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