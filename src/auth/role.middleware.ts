import type { Env } from "./auth.types";
import { requireSession } from "./session.middleware";

export async function requireRole(
    request: Request,
    env: Env,
    allowedRoles: string[]
): Promise<Response | null> {

    const auth = await requireSession(request, env);

if (auth) {
    return auth;
}

    const cookieHeader = request.headers.get("Cookie")!;

    const cookies = Object.fromEntries(
        cookieHeader
            .split(";")
            .map(cookie => {
                const [key, ...value] = cookie.trim().split("=");
                return [key, value.join("=")];
            })
    );

    const token = cookies.session;

    const user = await env.swagi_intech_db
        .prepare(`
            SELECT admin_users.role
            FROM sessions
            JOIN admin_users
            ON sessions.user_id = admin_users.id
            WHERE sessions.token = ?
            LIMIT 1
        `)
        .bind(token)
        .first<{ role: string }>();

        console.log("Role from database:", user?.role);

console.log("Allowed roles:", allowedRoles);

    if (!user) {

        return new Response(
            JSON.stringify({
                success: false,
                message: "Unauthorized."
            }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    }

    console.log(
    "Role comparison:",
    user.role,
    allowedRoles.includes(user.role)
);

    const userRole =
    user.role.toUpperCase();

const allowed =
    allowedRoles.map(role => role.toUpperCase());

if (!allowed.includes(userRole)) {

    return new Response(
        JSON.stringify({
            success: false,
            message: "Forbidden."
        }),
        {
            status: 403,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}

    return null;

}