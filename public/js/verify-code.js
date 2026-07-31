const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    message.textContent = "";

    const code = document.getElementById("code").value;

    const identifier =
        sessionStorage.getItem("reset_identifier");

    if (!identifier) {

        message.style.color = "red";

        message.textContent =
            "Reset session expired. Start again.";

        return;

    }

    const response = await fetch("/auth/verify-reset-code", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            identifier,
            code
        })

    });

    const result = await response.json();

    if (!result.success) {

        message.style.color = "red";

        message.textContent = result.message;

        return;

    }

    sessionStorage.setItem(
        "verified_code",
        code
    );

    window.location.href =
        "/reset-password.html";

});