import { PackageService } from "./package.service";
import type {
    Env,
    UpdatePackageRequest
} from "./package.types";

const service = new PackageService();

export async function updatePackage(

    request: Request,
    env: Env,
    packageId: string

): Promise<Response> {

    const body =
        await request.json() as UpdatePackageRequest;

    const result =
        await service.updatePackage(

            env,

            packageId,

            body

        );

    return Response.json(result);

}