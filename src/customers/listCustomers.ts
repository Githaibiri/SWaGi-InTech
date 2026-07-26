import { CustomerService } from "./customer.service";
import type { Env } from "./customer.types";

const customerService = new CustomerService();

export async function listCustomers(
    env: Env
): Promise<Response> {

    const result = await customerService.listCustomers(env);

    return new Response(
        JSON.stringify(result, null, 2),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}