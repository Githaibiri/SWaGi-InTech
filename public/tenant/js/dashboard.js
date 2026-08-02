document.addEventListener("DOMContentLoaded", async () => {

    const loadingScreen = document.getElementById("loadingScreen");
    const appContent = document.getElementById("appContent");

    try {

        const response = await fetch("/tenant/dashboard", {
            credentials: "include"
        });

        if (response.status === 401) {

            window.location.replace("/login.html");
            return;

        }

        const result = await response.json();

        if (!result.success) {

            window.location.replace("/login.html");
            return;

        }

        document.getElementById("businessName").textContent =
            result.business_name;

        loadingScreen.style.display = "none";
        appContent.style.display = "block";

    } catch (error) {

        console.error(error);

        window.location.replace("/login.html");

    }

});