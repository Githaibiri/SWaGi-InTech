import bcrypt from "bcryptjs";
import type { Env } from "../auth/auth.types";

export async function createSuperAdmin(env: Env) {
  const existing = await env.swagi_intech_db
    .prepare("SELECT id FROM admin_users WHERE role = ?")
    .bind("SUPER_ADMIN")
    .first();

  if (existing) {
    return {
      success: false,
      message: "Super Admin already exists."
    };
  }

  const passwordHash = await bcrypt.hash("admin123", 10);

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await env.swagi_intech_db
    .prepare(`
      INSERT INTO admin_users (
        id,
        tenant_id,
        username,
        email,
        password_hash,
        full_name,
        role,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      id,
      null,
      "SWaGi...",
      "wanjohisteven02@gmail.com",
      passwordHash,
      "Steven Githaibiri",
      "SUPER_ADMIN",
      now,
      now
    )
    .run();

  return {
    success: true,
    message: "Super Admin created successfully."
  };
}