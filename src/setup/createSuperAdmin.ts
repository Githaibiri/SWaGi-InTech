/// <reference types="@cloudflare/workers-types" />
import bcrypt from 'bcryptjs';

export interface Env {
  DB: D1Database;
}

export async function handleCreateSuperAdmin(env: Env): Promise<Response> {
  try {
    const email = 'wanjohisteven02@gmail.com';
    const plainPassword = 'admin123';
    
    // Generate secure bcrypt hash
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const userId = crypto.randomUUID();

    // Insert or update Super Admin in D1 database
    const query = `
      INSERT INTO users (id, email, password_hash, role, created_at)
      VALUES (?, ?, ?, 'super_admin', datetime('now'))
      ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash;
    `;

    await env.DB.prepare(query)
      .bind(userId, email, hashedPassword)
      .run();

    return Response.json({
      success: true,
      message: 'Super Admin created/updated successfully!',
      email: email
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}