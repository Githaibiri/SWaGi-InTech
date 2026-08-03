import { healthResponse } from "./routes/health";
import { login } from "./routes/auth";
import type { Env } from "./auth/auth.types";
import { createSuperAdmin } from "./setup/createSuperAdmin.service";
import { logout } from "./routes/logout";
import { requireSession } from "./auth/session.middleware";
import { createTenant } from "./routes/tenant";
import { listTenants } from "./routes/tenants";
import { updateTenant } from "./routes/updateTenant";
import { suspendTenant } from "./routes/suspendTenant";
import { deleteTenant } from "./routes/deleteTenant";
import { dashboard } from "./dashboard/dashboard";
import { createCustomer } from "./customers/createCustomer";
import { listCustomers } from "./customers/listCustomers";
import { createTenantAdmin } from "./tenantAdmins/createTenantAdmin";
import { listTenantAdmins } from "./tenantAdmins/listTenantAdmins";
import { forgotPassword } from "./routes/forgotPassword";
import { verifyResetCode } from "./routes/verifyResetCode";
import { resetPassword } from "./routes/resetPassword";
import { requireRole } from "./auth/role.middleware";
import { requirePermission } from "./auth/permission.middleware";
import { createPackage } from "./packages/createPackage";
import { listPackages } from "./packages/listPackages";
import { tenantDashboard } from "./tenantDashboard/dashboard";
import { updatePackage } from "./packages/updatePackage";
import { deletePackage } from "./packages/deletePackage";
import { changePackageStatus } from "./packages/changePackageStatus";
import { getPackage } from "./packages/getPackage";


export default {
  async fetch(request: Request, env: Env): Promise<Response> {
  
    const url = new URL(request.url);

    console.log(
  request.method,
  url.pathname
);

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
  return logout(request, env);
}

// Forgot Password
if (
  url.pathname === "/auth/forgot-password" &&
  request.method === "POST"
) {

  return forgotPassword(request, env);

}

if (
  url.pathname === "/auth/verify-reset-code" &&
  request.method === "POST"
) {

  return verifyResetCode(request, env);

}

if (
  url.pathname === "/auth/reset-password" &&
  request.method === "POST"
) {

  return resetPassword(request, env);

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

  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

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

  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

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

  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

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

  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

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

  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

if (auth) {
    return auth;
}

  return dashboard(request, env);

}

// Create Tenant Administrator
if (
  url.pathname === "/admin/tenant-admins" &&
  request.method === "POST"
) {

  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

if (auth) {
    return auth;
}

  return createTenantAdmin(request, env);

}

// List Tenant Administrators
if (
  url.pathname === "/admin/tenant-admins" &&
  request.method === "GET"
) {

  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

if (auth) {
    return auth;
}

  return listTenantAdmins(env);

}

// Create customer
if (
  url.pathname === "/admin/customers" &&
  request.method === "POST"
) {


  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

if (auth) {
    return auth;
}

  return createCustomer(request, env);

}

// List customers
if (
  url.pathname === "/admin/customers" &&
  request.method === "GET"
) {

  const auth = await requireRole(
    request,
    env,
    ["SUPER_ADMIN"]
);

if (auth) {
    return auth;
}

  return listCustomers(env);

}

// Create Package
if (
  url.pathname === "/api/tenant/packages" &&
  request.method === "POST"
) {

  console.log("POST /tenant/packages reached");

  const auth = await requireRole(
    request,
    env,
    ["TENANT_ADMIN"]
  );

  if (auth) {
    return auth;
  }

  return createPackage(request, env);

}

// Get Single Package
if (
    url.pathname.startsWith("/api/tenant/packages/") &&
    request.method === "GET"
) {

    const auth = await requireRole(
        request,
        env,
        ["TENANT_ADMIN"]
    );

    if (auth) {
        return auth;
    }

    const packageId =
        url.pathname.split("/").pop()!;

    return getPackage(
        env,
        packageId
    );

}

// List Packages
if (
  url.pathname === "/api/tenant/packages" &&
  request.method === "GET"
) {

  const auth = await requireRole(
    request,
    env,
    ["TENANT_ADMIN"]
  );

  if (auth) {
    return auth;
  }

  return listPackages(request, env);

}

// Update Package
if (
  url.pathname.startsWith("/api/tenant/packages/") &&
  request.method === "PUT"
) {

  const auth = await requireRole(
    request,
    env,
    ["TENANT_ADMIN"]
  );

  if (auth) {
    return auth;
  }

  const packageId = url.pathname.split("/").pop()!;

  return updatePackage(
    request,
    env,
    packageId
  );

}

// Delete Package
if (
  url.pathname.startsWith("/api/tenant/packages/") &&
  request.method === "DELETE"
) {

  const auth = await requireRole(
    request,
    env,
    ["TENANT_ADMIN"]
  );

  if (auth) {
    return auth;
  }

  const packageId = url.pathname.split("/").pop()!;

  return deletePackage(
    env,
    packageId
  );

}

// Activate / Suspend Package
if (
  url.pathname.startsWith("/api/tenant/packages/") &&
  request.method === "PATCH"
) {

  const auth = await requireRole(
    request,
    env,
    ["TENANT_ADMIN"]
  );

  if (auth) {
    return auth;
  }

  const packageId = url.pathname.split("/").pop()!;

  return changePackageStatus(

    request,
    env,
    packageId

  );

}

// Tenant Dashboard
if (
  url.pathname === "/tenant/dashboard" &&
  request.method === "GET"
) {

  const auth = await requireRole(
    request,
    env,
    ["TENANT_ADMIN"]
  );

  if (auth) {
    return auth;
  }

  return tenantDashboard(request, env);

}

// Unknown route
    return new Response("404 - Route Not Found", {
      status: 404
    });
  }
};