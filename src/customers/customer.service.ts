import { randomUUID } from "crypto";

import type {
    CreateCustomerRequest,
    CustomerResponse,
    Env
} from "./customer.types";

export class CustomerService {

    async createCustomer(
        env: Env,
        request: CreateCustomerRequest
    ): Promise<CustomerResponse> {

        const id = randomUUID();

        const now = new Date().toISOString();

        await env.swagi_intech_db
            .prepare(`
                INSERT INTO customers (
                    id,
                    tenant_id,
                    full_name,
                    phone,
                    email,
                    status,
                    created_at,
                    updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `)
            .bind(
                id,
                request.tenant_id,
                request.full_name,
                request.phone,
                request.email ?? null,
                "active",
                now,
                now
            )
            .run();

        return {

            success: true,

            message: "Customer created successfully.",

            customer: {

                id,

                tenant_id: request.tenant_id,

                full_name: request.full_name,

                phone: request.phone,

                email: request.email ?? null,

                status: "active",

                created_at: now,

                updated_at: now

            }

        };

    }

}