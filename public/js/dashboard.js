document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("/admin/dashboard");

        const data = await response.json();

        if (!data.success) return;

        document.getElementById("tenantCount").textContent =
            data.statistics.tenants;

    }

    catch (error) {

        console.error(error);

    }

});