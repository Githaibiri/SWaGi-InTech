import { PackageService } from "./package.service";
import type { Env } from "./package.types";

const service = new PackageService();

export async function listPackages(
    request: Request,
    env: Env
): Promise<Response> {

    const url = new URL(request.url);

    const tenantId = url.searchParams.get("tenant_id");

    if (!tenantId) {

        return Response.json(
            {
                success: false,
                message: "tenant_id is required."
            },
            {
                status: 400
            }
        );

    }

    const result = await service.listPackages(
        env,
        tenantId
    );

    return Response.json(result);

}