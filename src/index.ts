import { healthResponse } from "./routes/health";
import { login } from "./routes/auth";
import type { Env } from "./auth/auth.types";
import { createSuperAdmin } from "./setup/createSuperAdmin.service";
import { logout } from "./routes/logout";
import { requireAuth } from "./middleware/auth.middleware";
import { createTenant } from "./routes/tenant";

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
   
    // Create Super Admin (temporary setup route)
if (url.pathname === "/setup/create-super-admin") {
  const result = await createSuperAdmin(env);

  return new Response(JSON.stringify(result, null, 2), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

    // Authentication route
if (url.pathname === "/auth/login") {
  return login(request, env);
}

// Logout route
if (url.pathname === "/auth/logout") {
  return logout();
}

// Create Tenant route
if (
  url.pathname === "/admin/tenants" &&
  request.method === "POST"
) {
  return createTenant(request, env);
}

// Protected test route
if (url.pathname === "/admin/dashboard") {

  const auth = await requireAuth(request, env);

  if (auth) {
    return auth;
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Welcome Super Admin!"
    }, null, 2),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

// Unknown route
    return new Response("404 - Route Not Found", {
      status: 404
    });
  }
};