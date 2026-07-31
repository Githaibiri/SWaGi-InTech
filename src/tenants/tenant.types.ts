import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
    swagi_intech_db: D1Database;
}