import { PackageService } from "./package.service";
import type { Env } from "./package.types";

const service = new PackageService();

export async function getPackage(
    env: Env,
    packageId: string
): Promise<Response> {

    const result = await service.getPackageById(
        env,
        packageId
    );

    return Response.json(result);

}