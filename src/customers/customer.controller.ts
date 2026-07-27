import { CustomerService } from "./customer.service";
import type {
    CreateCustomerRequest,
    Env
} from "./customer.types";

import { getSessionUser } from "../auth/sessionUser";

const customerService = new CustomerService();

export async function createCustomerController(
    request: Request,
    env: Env
): Promise<Response> {

    const sessionUser = await getSessionUser(request, env);

    if (!sessionUser) {

        return new Response(
            JSON.stringify({
                success: false,
                message: "Unauthorized."
            }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    }

    if (!sessionUser.tenant_id) {

        return new Response(
            JSON.stringify({
                success: false,
                message: "Super Admin cannot create customers. Please log in as a Tenant Admin."
            }),
            {
                status: 403,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    }

    const body =
        await request.json() as CreateCustomerRequest;

    const result =
        await customerService.createCustomer(
            env,
            sessionUser.tenant_id,
            body
        );

    return new Response(
        JSON.stringify(result, null, 2),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}