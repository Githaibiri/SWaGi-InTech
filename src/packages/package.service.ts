import { randomUUID } from "crypto";

import type {

    CreatePackageRequest,
    PackageResponse,
    Env

} from "./package.types";

export class PackageService {

    async createPackage(

        env: Env,
        request: CreatePackageRequest

    ): Promise<PackageResponse> {

        const id = randomUUID();

        const now = new Date().toISOString();

        await env.swagi_intech_db.prepare(

            `
            INSERT INTO packages (

                id,
                tenant_id,
                package_name,
                description,
                price,
                duration_minutes,
                status,
                created_at,
                updated_at

            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `

        )

        .bind(

            id,
            request.tenant_id,
            request.package_name,
            request.description ?? "",
            request.price,
            request.duration_minutes,
            "ACTIVE",
            now,
            now

        )

        .run();

        return {

            success: true,

            message: "Package created successfully.",

            data: {

                id

            }

        };

    }

    async listPackages(

    env: Env,
    tenantId: string

): Promise<PackageResponse> {

    const result = await env.swagi_intech_db

        .prepare(

            `
            SELECT *

            FROM packages

            WHERE tenant_id = ?

            ORDER BY created_at DESC
            `
        )

        .bind(tenantId)

        .all();

    return {

        success: true,

        message: "Packages retrieved successfully.",

        data: result.results

    };

}

async updatePackage(

    env: Env,
    packageId: string,
    request: {
        package_name?: string;
        description?: string;
        price?: number;
        duration_minutes?: number;
    }

): Promise<PackageResponse> {

    const now = new Date().toISOString();

    await env.swagi_intech_db.prepare(

        `
        UPDATE packages

        SET

            package_name = ?,
            description = ?,
            price = ?,
            duration_minutes = ?,
            updated_at = ?

        WHERE id = ?
        `

    )

    .bind(

        request.package_name,

        request.description ?? "",

        request.price,

        request.duration_minutes,

        now,

        packageId

    )

    .run();

    return {

        success: true,

        message: "Package updated successfully."

    };

}

async deletePackage(

    env: Env,
    packageId: string

): Promise<PackageResponse> {

    await env.swagi_intech_db.prepare(

        `
        DELETE FROM packages

        WHERE id = ?
        `

    )

    .bind(packageId)

    .run();

    return {

        success: true,

        message: "Package deleted successfully."

    };

}

async changePackageStatus(

    env: Env,
    packageId: string,
    status: string

): Promise<PackageResponse> {

    const now = new Date().toISOString();

    await env.swagi_intech_db.prepare(

        `
        UPDATE packages

        SET

            status = ?,
            updated_at = ?

        WHERE id = ?
        `

    )

    .bind(

        status,
        now,
        packageId

    )

    .run();

    return {

        success: true,

        message: "Package status updated successfully."

    };

}

async getPackageById(
    env: Env,
    id: string
): Promise<PackageResponse> {

    const result = await env.swagi_intech_db
        .prepare(
            `
            SELECT *
            FROM packages
            WHERE id = ?
            `
        )
        .bind(id)
        .first();

    return {

        success: true,

        message: "Package retrieved successfully.",

        data: result

    };

}

}