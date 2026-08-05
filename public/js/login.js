const form = document.getElementById("loginForm");

const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    message.textContent = "";

    const identifier =
    document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch("/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        identifier,
        password
    })
});

    const result = await response.json();

    if (response.ok && result.token) {
    localStorage.setItem("token", result.token);
}

if (result.user) {
    localStorage.setItem(
        "user",
        JSON.stringify(result.user)
    );
}

    if (!result.success) {

        message.style.color = "red";

        message.textContent = result.message;

        return;

    }

    message.style.color = "green";

message.textContent = "Login successful...";

// Save the session token

// Save the logged-in user's details (optional but useful)

console.log("User role:", result.user.role);

setTimeout(() => {

    console.log("Redirect code started");

    const role = result.user.role.toLowerCase();

if (role === "super_admin") {

    window.location.href = "/dashboard.html";

}

else if (role === "tenant_admin") {

    window.location.href = "/tenant/dashboard.html";

}

    else {

        console.log("Unknown role:", result.user.role);

    }

}, 1000);

});