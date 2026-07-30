const form = document.getElementById("loginForm");

const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    message.textContent = "";

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch("/auth/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email,
            password

        })

    });

    const result = await response.json();

    if (!result.success) {

        message.style.color = "red";

        message.textContent = result.message;

        return;

    }

    message.style.color = "green";

message.textContent = "Login successful...";

// Save the session token

// Save the logged-in user's details (optional but useful)

setTimeout(() => {

    window.location.href = "/dashboard.html";

}, 1000);

});