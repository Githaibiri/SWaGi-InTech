const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", async (event) => {

        event.preventDefault();

        const confirmed = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await fetch("/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            window.location.href = "/login.html";

        } catch (error) {

            alert("Logout failed.");

            console.error(error);

        }

    });

}