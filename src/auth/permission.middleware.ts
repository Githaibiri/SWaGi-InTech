import type { Env } from "./auth.types";
import { requireRole } from "./role.middleware";

export async function requirePermission(
    request: Request,
    env: Env,
    allowedRoles: string[]
): Promise<Response | null> {

    return requireRole(
        request,
        env,
        allowedRoles
    );

}