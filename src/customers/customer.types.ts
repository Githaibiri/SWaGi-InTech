import type { Env } from "../auth/auth.types";

export interface Customer {

    id: string;

    tenant_id: string;

    full_name: string;

    phone: string;

    email: string | null;

    status: string;

    created_at: string;

    updated_at: string;

}

export interface CreateCustomerRequest {

    full_name: string;

    phone: string;

    email?: string;

}

export interface CustomerResponse {

    success: boolean;

    message: string;

    customer?: Customer;

}

export type { Env };