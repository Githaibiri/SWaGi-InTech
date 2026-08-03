document.addEventListener("DOMContentLoaded", async () => {

    console.log("Dashboard JS started");

    const loadingScreen =
        document.getElementById("loadingScreen");

    const appContent =
        document.getElementById("appContent");

    try {

        console.log("Requesting /admin/dashboard");

        const response = await fetch("/admin/dashboard", {
            credentials: "include"
        });

        console.log(
            "Dashboard response status:",
            response.status
        );

        const data = await response.json();

        console.log(
            "Dashboard response data:",
            data
        );

        if (!response.ok || !data.success) {

            console.error(
                "Dashboard authentication failed",
                data
            );

            window.location.replace("/login.html");

            return;

        }

        document.getElementById("tenantCount").textContent =
            data.statistics.tenants;

        document.getElementById("activeTenantCount").textContent =
            data.statistics.activeTenants;

        document.getElementById("suspendedTenantCount").textContent =
            data.statistics.suspendedTenants;

        document.getElementById("trialTenantCount").textContent =
            data.statistics.trialTenants;

        document.getElementById("monthlyTenantCount").textContent =
            data.statistics.monthlyTenants;

        document.getElementById("yearlyTenantCount").textContent =
            data.statistics.yearlyTenants;

        loadingScreen.style.display = "none";

        appContent.style.display = "block";

        console.log("Dashboard loaded successfully");

    } catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );

        window.location.replace("/login.html");

    }

});