import { PackageService } from "./package.service";
import type { Env } from "./package.types";

const service = new PackageService();

export async function changePackageStatus(

    request: Request,
    env: Env,
    packageId: string

): Promise<Response> {

    const body = await request.json() as {

        status: string;

    };

    const result = await service.changePackageStatus(

        env,
        packageId,
        body.status

    );

    return Response.json(result);

}