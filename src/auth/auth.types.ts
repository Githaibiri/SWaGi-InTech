import type { D1Database } from "@cloudflare/workers-types";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthUser {
  id: string;
  tenant_id: string | null;
  full_name: string;
  email: string;
  password_hash: string;
  role: "SUPER_ADMIN" | "TENANT_ADMIN";
  is_active: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    tenant_id: string | null;
    full_name: string;
    email: string;
    role: "SUPER_ADMIN" | "TENANT_ADMIN";
  };
  token?: string;
}

export interface Env {
  swagi_intech_db: D1Database;
}