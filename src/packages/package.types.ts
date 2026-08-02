import type { D1Database } from "@cloudflare/workers-types";

export interface Env {

    swagi_intech_db: D1Database;

}

export interface CreatePackageRequest {

    tenant_id: string;

    package_name: string;

    description?: string;

    price: number;

    duration_minutes: number;

}

export interface UpdatePackageRequest {

    package_name?: string;

    description?: string;

    price?: number;

    duration_minutes?: number;

    status?: string;

}

export interface PackageResponse {

    success: boolean;

    message: string;

    data?: unknown;

}