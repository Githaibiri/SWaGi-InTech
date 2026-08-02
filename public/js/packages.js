const modal = document.getElementById("packageModal");
const newPackageButton = document.getElementById("newPackageButton");
const cancelPackage = document.getElementById("cancelPackage");
const savePackage = document.getElementById("savePackage");
const table = document.getElementById("packagesTable");

let editingPackageId = null;

newPackageButton.addEventListener("click", () => {
    editingPackageId = null;
    document.getElementById("modalTitle").textContent = "Create Package";
    document.getElementById("packageName").value = "";
    document.getElementById("packageDescription").value = "";
    document.getElementById("packagePrice").value = "";
    document.getElementById("packageDuration").value = "";
    modal.style.display = "flex";
});

cancelPackage.addEventListener("click", () => {
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", loadPackages);

// Helper function to safely get the user session
function getLoggedInUser() {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
        console.error("No user found in localStorage!");
        return null;
    }
    return JSON.parse(userJson);
}

async function loadPackages() {
    const user = getLoggedInUser();
    if (!user) {
        return; // Stop execution if not logged in
    }

    try {
        const response = await fetch(`/tenant/packages?tenant_id=${user.tenant_id}`, {
            credentials: "include"
        });

        const result = await response.json();
        table.innerHTML = "";

        if (!result.success) {
            return;
        }

        result.data.forEach(packageItem => {
            table.innerHTML += `
                <tr>
                    <td>${packageItem.package_name}</td>
                    <td>KES ${packageItem.price}</td>
                    <td>${packageItem.duration_minutes} Minutes</td>
                    <td>${packageItem.status}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editPackage('${packageItem.id}')">Edit</button>
                        <button class="btn btn-warning" onclick="togglePackage('${packageItem.id}')">Suspend</button>
                        <button class="btn btn-danger" onclick="deletePackage('${packageItem.id}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Failed to load packages:", err);
    }
}

savePackage.addEventListener("click", async () => {
    const user = getLoggedInUser();
    if (!user) {
        alert("Session expired. Please log in again.");
        return;
    }

    const request = {
        tenant_id: user.tenant_id,
        package_name: document.getElementById("packageName").value,
        description: document.getElementById("packageDescription").value,
        price: Number(document.getElementById("packagePrice").value),
        duration_minutes: Number(document.getElementById("packageDuration").value)
    };

    let response;

    try {
        if (editingPackageId === null) {
            // Use relative path to match loadPackages()
            response = await fetch("/tenant/packages", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            });
        } else {
            response = await fetch(`/tenant/packages/${editingPackageId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            });
        }

        const result = await response.json();

        if (!result.success) {
            alert(result.message || "Operation failed");
            return;
        }

        alert(result.message);
        modal.style.display = "none";
        editingPackageId = null;
        loadPackages();
    } catch (err) {
        console.error("Network or server error:", err);
        alert("An error occurred while saving the package.");
    }
});

async function editPackage(packageId) {
    editingPackageId = packageId;

    try {
        const response = await fetch(`/tenant/packages/${packageId}`, {
            credentials: "include"
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        const packageItem = result.data;

        document.getElementById("modalTitle").textContent = "Edit Package";
        document.getElementById("packageName").value = packageItem.package_name;
        document.getElementById("packageDescription").value = packageItem.description;
        document.getElementById("packagePrice").value = packageItem.price;
        document.getElementById("packageDuration").value = packageItem.duration_minutes;

        modal.style.display = "flex";
    } catch (err) {
        console.error("Failed to fetch package details:", err);
    }
}