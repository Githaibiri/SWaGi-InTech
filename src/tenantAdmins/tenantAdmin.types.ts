import type { Env } from "../auth/auth.types";

export interface TenantAdmin {

    id: string;

    tenant_id: string;

    full_name: string;

    username: string;

    email: string;

    role: string;

    is_active: number;

    created_at: string;

    updated_at: string;

}

export interface CreateTenantAdminRequest {

    tenant_id: string;

    full_name: string;

    username: string;

    email: string;

    password: string;

}

export interface TenantAdminResponse {

    success: boolean;

    message: string;

    tenantAdmin?: TenantAdmin;

}

export type { Env };