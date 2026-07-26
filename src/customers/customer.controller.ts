import { CustomerService } from "./customer.service";
import type {
    CreateCustomerRequest,
    Env
} from "./customer.types";

const customerService = new CustomerService();

export async function createCustomerController(
    request: Request,
    env: Env
): Promise<Response> {

    const body =
        await request.json() as CreateCustomerRequest;

    const result =
        await customerService.createCustomer(env, body);

    return new Response(
        JSON.stringify(result, null, 2),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}