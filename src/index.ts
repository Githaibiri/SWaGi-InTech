import { healthResponse } from "./routes/health";
import { login } from "./routes/auth";
import type { Env } from "./auth/auth.types";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Home route
    if (url.pathname === "/") {
      return new Response(
        JSON.stringify(
          {
            application: "SWaGi InTech...",
            version: "0.1.0",
            status: "Running",
            message: "Welcome to SWaGi InTech Backend API"
          },
          null,
          2
        ),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Health route
    if (url.pathname === "/health") {
      return healthResponse();
    }

    // Authentication route
if (url.pathname === "/auth/login") {
  return login(request, env);
}

// Unknown route
    return new Response("404 - Route Not Found", {
      status: 404
    });
  }
};