import { PackageService } from "./package.service";
import type { Env } from "./package.types";

const service = new PackageService();

export async function deletePackage(

    env: Env,
    packageId: string

): Promise<Response> {

    const result =
        await service.deletePackage(
            env,
            packageId
        );

    return Response.json(result);

}