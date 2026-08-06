console.log("Tenant dashboard JS started");

document.addEventListener("DOMContentLoaded", async () => {

    console.log("DOM loaded");

    const loadingScreen =
        document.getElementById("loadingScreen");

    const appContent =
        document.getElementById("appContent");

    try {

        console.log("Requesting dashboard API...");

        const response = await fetch("/api/tenant/dashboard", {
            credentials: "include"
        });

        console.log("Status:", response.status);

        const text = await response.text();

        console.log("Response:", text);

        if (response.status === 401) {

            console.log("Unauthorized");

            window.location.replace("/login.html");

            return;

        }

        const result = JSON.parse(text);

        console.log("Parsed result:", result);

        document.getElementById("businessName").textContent =
            result.business_name;

        console.log("Business name loaded");

        loadingScreen.style.display = "none";

        console.log("Loading screen hidden");

        appContent.style.display = "block";

        console.log("Dashboard displayed");

    }

    catch (error) {

        console.error("Dashboard error:", error);

    }

});