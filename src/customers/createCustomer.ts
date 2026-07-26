import { createCustomerController } from "./customer.controller";
import type { Env } from "./customer.types";

export async function createCustomer(
    request: Request,
    env: Env
): Promise<Response> {

    return createCustomerController(request, env);

}