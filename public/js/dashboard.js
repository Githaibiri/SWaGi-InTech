document.addEventListener("DOMContentLoaded", async () => {

    const loadingScreen = document.getElementById("loadingScreen");
    const appContent = document.getElementById("appContent");

    try {

        const response = await fetch("/admin/dashboard", {
            credentials: "include"
        });

        if (response.status === 401) {

            window.location.replace("/login.html");

            return;

        }

        const data = await response.json();

        if (!data.success) {

            window.location.replace("/login.html");

            return;

        }

        document.getElementById("tenantCount").textContent =
            data.statistics.tenants;

        loadingScreen.style.display = "none";

        appContent.style.display = "block";

    }

    catch (error) {

        console.error(error);

        window.location.replace("/login.html");

    }

});