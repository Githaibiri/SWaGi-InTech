import { randomUUID } from "crypto";

import type { Env } from "../auth/auth.types";

export interface CreateTenantRequest {
    business_name: string;
    contact_person: string;
    email: string;
    phone: string;
}

export class TenantService {

    async createTenant(
        env: Env,
        request: CreateTenantRequest
    ) {

        const now = new Date().toISOString();

        const id = randomUUID();

        await env.swagi_intech_db
            .prepare(`
                INSERT INTO tenants (
                    id,
                    business_name,
                    contact_person,
                    email,
                    phone,
                    status,
                    subscription_status,
                    created_at,
                    updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `)
            .bind(
                id,
                request.business_name,
                request.contact_person,
                request.email,
                request.phone,
                "ACTIVE",
                "TRIAL",
                now,
                now
            )
            .run();

        return {
            success: true,
            message: "Tenant created successfully.",
            tenant: {
                id,
                ...request,
                status: "ACTIVE",
                subscription_status: "TRIAL",
                created_at: now,
                updated_at: now
            }
        };

    }

}