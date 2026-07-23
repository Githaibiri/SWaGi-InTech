import type { D1Database } from "@cloudflare/workers-types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  tenant_id: number | null;
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
    id: number;
    full_name: string;
    email: string;
    role: string;
  };
  token?: string;
}

export interface Env {
  swagi_intech_db: D1Database;
}