import type { Env } from "./auth.types";

export interface SessionUser {

    id: number;

    tenant_id: string | null;

    full_name: string;

    email: string;

    role: string;

}

export async function getSessionUser(

    request: Request,

    env: Env

): Promise<SessionUser | null> {

    const cookieHeader = request.headers.get("Cookie");

    if (!cookieHeader) {

        return null;

    }

    const cookies = Object.fromEntries(

        cookieHeader

            .split(";")

            .map(cookie => {

                const [key, ...value] = cookie.trim().split("=");

                return [key, value.join("=")];

            })

    );

    const token = cookies.session;

    if (!token) {

        return null;

    }

    const user = await env.swagi_intech_db

        .prepare(`
            SELECT
                admin_users.id,
                admin_users.tenant_id,
                admin_users.full_name,
                admin_users.email,
                admin_users.role
            FROM sessions
            INNER JOIN admin_users
                ON sessions.user_id = admin_users.id
            WHERE sessions.token = ?
            LIMIT 1
        `)

        .bind(token)

        .first<SessionUser>();

    return user ?? null;

}