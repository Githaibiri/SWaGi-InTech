import type { Env } from "../auth/auth.types";

export class TenantService {

    async getAllTenants(env: Env) {

        const tenants = await env.swagi_intech_db
            .prepare(`
                SELECT
                    id,
                    business_name,
                    contact_person,
                    email,
                    phone,
                    status,
                    subscription_status,
                    created_at
                FROM tenants
                ORDER BY created_at DESC
            `)
            .all();

        return tenants.results;

    }

}