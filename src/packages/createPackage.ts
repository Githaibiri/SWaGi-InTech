import { PackageService } from "./package.service";
import type { Env } from "./package.types";

const service = new PackageService();

export async function createPackage(
    request: Request,
    env: Env
): Promise<Response> {

    const body = await request.json();

    const result = await service.createPackage(env, body);

    return new Response(
        JSON.stringify(result, null, 2),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}