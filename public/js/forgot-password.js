const form = document.getElementById("forgotPasswordForm");

const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    message.textContent = "";

    const identifier =
        document.getElementById("identifier").value;

    const response = await fetch("/auth/forgot-password", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            identifier

        })

    });

    const result = await response.json();

    if (!result.success) {

        message.style.color = "red";

        message.textContent = result.message;

        return;

    }

    sessionStorage.setItem(
        "resetIdentifier",
        identifier
    );

    message.style.color = "green";

    message.textContent =
        "Verification code generated.";

    setTimeout(() => {

        sessionStorage.setItem(
    "reset_identifier",
    identifier
);

        window.location.href =
            "/verify-code.html";

    }, 1000);

});