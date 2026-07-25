import { healthResponse } from "./routes/health";
import { login } from "./routes/auth";
import type { Env } from "./auth/auth.types";
import { createSuperAdmin } from "./setup/createSuperAdmin.service";
import { logout } from "./routes/logout";
import { requireSession } from "./auth/session.middleware";
import { createTenant } from "./routes/tenant";
import { dashboardStats } from "./routes/dashboard";
import { listTenants } from "./routes/tenants";
import { updateTenant } from "./routes/updateTenant";
import { suspendTenant } from "./routes/suspendTenant";
import { deleteTenant } from "./routes/deleteTenant";

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

// List all tenants
if (
  url.pathname === "/admin/tenants" &&
  request.method === "GET"
) {

  const auth = await requireSession(request, env);

  if (auth) {
    return auth;
  }

  return listTenants(env);

}

// Update tenant
if (
  url.pathname.startsWith("/admin/tenants/") &&
  request.method === "PUT"
) {

  const auth = await requireSession(request, env);

  if (auth) {
    return auth;
  }

  const id = url.pathname.split("/").pop()!;

  return updateTenant(request, env, id);

}

// Suspend / Activate tenant
if (
  url.pathname.startsWith("/admin/tenants/") &&
  request.method === "PATCH"
) {

  const auth = await requireSession(request, env);

  if (auth) {
    return auth;
  }

  const id = url.pathname.split("/").pop()!;

  return suspendTenant(env, id);

}

// Delete tenant
if (
  url.pathname.startsWith("/admin/tenants/") &&
  request.method === "DELETE"
) {

  const auth = await requireSession(request, env);

  if (auth) {
    return auth;
  }

  const id = url.pathname.split("/").pop()!;

  return deleteTenant(env, id);

}

// Dashboard statistics
if (
  url.pathname === "/admin/dashboard" &&
  request.method === "GET"
) {

  const auth = await requireSession(request, env);

  if (auth) {
    return auth;
  }

  return dashboardStats(env);

}

// Unknown route
    return new Response("404 - Route Not Found", {
      status: 404
    });
  }
};