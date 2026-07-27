document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("/admin/tenants", {
            headers: {
                Authorization: "Bearer demo-token"
            }
        });

        const tenants = await response.json();

        const body = document.getElementById("tenantBody");

        body.innerHTML = "";

        tenants.forEach(tenant => {

            body.innerHTML += `
                <tr>
                    <td>${tenant.business_name}</td>
                    <td>${tenant.contact_person}</td>
                    <td>${tenant.email}</td>
                    <td>${tenant.phone}</td>
                    <td>${tenant.status}</td>
                    <td>${tenant.subscription_status}</td>
                    <td>
                        <button onclick="editTenant('${tenant.id}')">
    Edit
</button>
                        <button onclick="toggleTenantStatus('${tenant.id}')">
    Suspend
</button>
                        <button onclick="deleteTenant('${tenant.id}')">
    Delete
</button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

});

async function editTenant(id) {

    const response = await fetch("/admin/tenants", {
        headers: {
            Authorization: "Bearer demo-token"
        }
    });

    const tenants = await response.json();

    const tenant = tenants.find(t => t.id === id);

    if (!tenant) {
        alert("Tenant not found.");
        return;
    }

    document.getElementById("editId").value = tenant.id;
    document.getElementById("editBusiness").value = tenant.business_name;
    document.getElementById("editContact").value = tenant.contact_person;
    document.getElementById("editEmail").value = tenant.email;
    document.getElementById("editPhone").value = tenant.phone;

    document.getElementById("editModal").style.display = "block";

}

function closeModal() {

    document.getElementById("editModal").style.display = "none";

}

document
.getElementById("saveTenantButton")
.addEventListener("click", async () => {

    const id = document.getElementById("editId").value;

    const body = {

        business_name:
            document.getElementById("editBusiness").value,

        contact_person:
            document.getElementById("editContact").value,

        email:
            document.getElementById("editEmail").value,

        phone:
            document.getElementById("editPhone").value

    };

    const response = await fetch("/admin/tenants/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer demo-token"
        },

        body: JSON.stringify(body)

    });

    const result = await response.json();

    alert(result.message);

    closeModal();

    location.reload();

});

async function toggleTenantStatus(id) {

    const response = await fetch("/admin/tenants/" + id, {

        method: "PATCH",

        headers: {
            Authorization: "Bearer demo-token"
        }

    });

    const result = await response.json();

    alert(result.message);

    location.reload();

}

async function deleteTenant(id) {

    const confirmed = confirm(
        "Are you sure you want to permanently delete this tenant?"
    );

    if (!confirmed) {
        return;
    }

    const response = await fetch("/admin/tenants/" + id, {

        method: "DELETE",

        headers: {
            Authorization: "Bearer demo-token"
        }

    });

    const result = await response.json();

    alert(result.message);

    location.reload();

}

// Create Tenant Modal

const createTenantModal =
    document.getElementById("createTenantModal");

const createTenantButton =
    document.getElementById("createTenantButton");

const cancelTenantButton =
    document.getElementById("cancelTenantButton");

createTenantButton.addEventListener("click", () => {

    createTenantModal.style.display = "block";

});

cancelTenantButton.addEventListener("click", () => {

    createTenantModal.style.display = "none";

});

const saveTenantCreateButton =
    document.getElementById("saveTenantCreateButton");

saveTenantCreateButton.addEventListener("click", saveTenant);

async function saveTenant() {

    const tenant = {

        business_name:
            document.getElementById("businessName").value,

        contact_person:
            document.getElementById("contactPerson").value,

        email:
            document.getElementById("tenantEmail").value,

        phone:
            document.getElementById("tenantPhone").value

    };

    const response = await fetch("/admin/tenants", {

        method: "POST",

        credentials: "include",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(tenant)

    });

    const result = await response.json();

    if (!result.success) {

        alert(result.message);

        return;

    }

    alert(result.message);

    createTenantModal.style.display = "none";

    location.reload();

}