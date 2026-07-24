import type {
  CreateTenantRequest,
  TenantResponse
} from "../types/tenant.types";

import type { Env } from "../auth/auth.types";

export class TenantService {

  async create(
    env: Env,
    request: CreateTenantRequest
  ): Promise<TenantResponse> {

    const existing = await env.swagi_intech_db
      .prepare("SELECT id FROM tenants WHERE email = ?")
      .bind(request.email)
      .first();

    if (existing) {
      return {
        success: false,
        message: "Tenant already exists."
      };
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await env.swagi_intech_db
      .prepare(`
        INSERT INTO tenants (
          id,
          business_name,
          contact_person,
          email,
          phone,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        id,
        request.business_name,
        request.contact_person,
        request.email,
        request.phone,
        now,
        now
      )
      .run();

    return {
      success: true,
      message: "Tenant created successfully.",
      tenant: {
        id,
        business_name: request.business_name,
        contact_person: request.contact_person,
        email: request.email,
        phone: request.phone,
        status: "ACTIVE",
        subscription_status: "TRIAL",
        created_at: now,
        updated_at: now
      }
    };
  }
}