import { randomUUID } from "crypto";

import { hashPassword } from "../auth/password";

import type {
    CreateTenantAdminRequest,
    TenantAdminResponse,
    Env
} from "./tenantAdmin.types";

export class TenantAdminService {

    async createTenantAdmin(
        env: Env,
        request: CreateTenantAdminRequest
    ): Promise<TenantAdminResponse> {

        const id = randomUUID();

        const now = new Date().toISOString();

        const passwordHash =
            await hashPassword(request.password);

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
                    is_active,
                    created_at,
                    updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `)
            .bind(
                id,
                request.tenant_id,
                request.username,
                request.email,
                passwordHash,
                request.full_name,
                "tenant_admin",
                1,
                now,
                now
            )
            .run();

        return {

            success: true,

            message: "Tenant Administrator created successfully.",

            tenantAdmin: {

                id,

                tenant_id: request.tenant_id,

                full_name: request.full_name,

                username: request.username,

                email: request.email,

                role: "tenant_admin",

                is_active: 1,

                created_at: now,

                updated_at: now

            }

        };

    }

}