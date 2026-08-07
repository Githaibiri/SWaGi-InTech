import { PackageService } from "./package.service";
import type { Env } from "./package.types";

const service = new PackageService();

export async function changePackageStatus(

    request: Request,
    env: Env,
    packageId: string

): Promise<Response> {

    const body = await request.json() as {

    is_active: number;

};

const result = await service.changePackageStatus(

    env,
    packageId,
    body.is_active

);

    return Response.json(result);

}