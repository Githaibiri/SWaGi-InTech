document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("/admin/dashboard", {
            headers: {
                Authorization: "Bearer demo-token"
            }
        });

        const data = await response.json();

        document.getElementById("totalTenants").textContent =
            data.totalTenants;

        document.getElementById("activeTenants").textContent =
            data.activeTenants;

        document.getElementById("trialTenants").textContent =
            data.trialTenants;

    } catch (error) {

        console.error(error);

    }

});