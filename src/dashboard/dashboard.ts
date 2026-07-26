import { dashboardController } from "./dashboard.controller";
import type { Env } from "./dashboard.types";

export async function dashboard(
    request: Request,
    env: Env
): Promise<Response> {

    return dashboardController(env);

}