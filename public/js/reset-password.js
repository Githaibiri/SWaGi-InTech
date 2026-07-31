const form = document.getElementById("resetPasswordForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    message.textContent = "";

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        message.style.color = "red";

        message.textContent =
            "Passwords do not match.";

        return;

    }

    const identifier =
        sessionStorage.getItem("reset_identifier");

    const code =
        sessionStorage.getItem("verified_code");

    if (!identifier || !code) {

        message.style.color = "red";

        message.textContent =
            "Reset session expired. Start again.";

        return;

    }

    const response = await fetch("/auth/reset-password", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
    code,
    newPassword: password
})

    });

    const result = await response.json();

    if (!result.success) {

        message.style.color = "red";

        message.textContent = result.message;

        return;

    }

    sessionStorage.removeItem("reset_identifier");
    sessionStorage.removeItem("verified_code");

    message.style.color = "green";
    message.textContent =
        "Password reset successful. Redirecting to login...";

    setTimeout(() => {

        window.location.href = "/login.html";

    }, 1500);

});