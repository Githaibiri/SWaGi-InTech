document.addEventListener("DOMContentLoaded", () => {

    loadTenants();

    const createTenantButton =
        document.getElementById("createTenantButton");

    const cancelTenantButton =
        document.getElementById("cancelTenantButton");

    const saveTenantButton =
        document.getElementById("saveTenantButton");

    const updateTenantButton =
        document.getElementById("updateTenantButton");

    if (createTenantButton) {

        createTenantButton.addEventListener(
            "click",
            openCreateTenantModal
        );

    }

    if (cancelTenantButton) {

        cancelTenantButton.addEventListener(
            "click",
            closeCreateTenantModal
        );

    }

    if (saveTenantButton) {

        saveTenantButton.addEventListener(
            "click",
            saveTenant
        );

    }

    if (updateTenantButton) {

        updateTenantButton.addEventListener(
            "click",
            updateTenant
        );

    }

});


/* ================================
   LOAD TENANTS
================================ */

async function loadTenants() {

    try {

        const response = await fetch(
            "/admin/tenants",
            {
                credentials: "include"
            }
        );

        if (response.status === 401) {

            window.location.replace("/login.html");

            return;

        }

        if (!response.ok) {

            throw new Error(
                `Failed to load tenants. Status: ${response.status}`
            );

        }

        const tenants = await response.json();

        const body =
            document.getElementById("tenantBody");

        if (!body) {
            return;
        }

        body.innerHTML = "";

        tenants.forEach(tenant => {

            body.innerHTML += `

                <tr>

                    <td>
                        ${tenant.business_name ?? "-"}
                    </td>

                    <td>
                        ${tenant.contact_person ?? "-"}
                    </td>

                    <td>
                        ${tenant.email ?? "-"}
                    </td>

                    <td>
                        ${tenant.phone ?? "-"}
                    </td>

                    <td>

                        <span class="badge badge-${String(
                            tenant.status ?? ""
                        ).toLowerCase()}">

                            ${tenant.status ?? "-"}

                        </span>

                    </td>

                    <td>

                        <span class="badge badge-${String(
                            tenant.subscription_status ?? ""
                        ).toLowerCase()}">

                            ${tenant.subscription_status ?? "-"}

                        </span>

                    </td>

                    <td>

                        <button
                            class="btn btn-primary"
                            onclick="editTenant('${tenant.id}')">

                            ✏ Edit

                        </button>

                        <button
                            class="btn btn-warning"
                            onclick="toggleTenantStatus('${tenant.id}')">

                            ⏸ Suspend

                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="deleteTenant('${tenant.id}')">

                            🗑 Delete

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(
            "Unable to load tenants:",
            error
        );

        alert(
            "Unable to load tenants. Please try again."
        );

    }

}


/* ================================
   EDIT TENANT
================================ */

async function editTenant(id) {

    try {

        const response = await fetch(
            "/admin/tenants",
            {
                credentials: "include"
            }
        );

        if (response.status === 401) {

            window.location.replace("/login.html");

            return;

        }

        const tenants =
            await response.json();

        const tenant =
            tenants.find(
                item => item.id === id
            );

        if (!tenant) {

            alert(
                "Tenant not found."
            );

            return;

        }

        document.getElementById(
            "editId"
        ).value = tenant.id;

        document.getElementById(
            "editBusiness"
        ).value = tenant.business_name ?? "";

        document.getElementById(
            "editContact"
        ).value = tenant.contact_person ?? "";

        document.getElementById(
            "editEmail"
        ).value = tenant.email ?? "";

        document.getElementById(
            "editPhone"
        ).value = tenant.phone ?? "";

        document.getElementById(
            "editModal"
        ).style.display = "block";

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to load tenant information."
        );

    }

}


/* ================================
   UPDATE TENANT
================================ */

async function updateTenant() {

    const id =
        document.getElementById(
            "editId"
        ).value;

    const body = {

        business_name:
            document.getElementById(
                "editBusiness"
            ).value,

        contact_person:
            document.getElementById(
                "editContact"
            ).value,

        email:
            document.getElementById(
                "editEmail"
            ).value,

        phone:
            document.getElementById(
                "editPhone"
            ).value

    };

    try {

        const response = await fetch(
            "/admin/tenants/" + id,
            {

                method: "PUT",

                credentials: "include",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(body)

            }
        );

        if (response.status === 401) {

            window.location.replace(
                "/login.html"
            );

            return;

        }

        const result =
            await response.json();

        if (!response.ok) {

            alert(
                result.message ||
                "Unable to update tenant."
            );

            return;

        }

        alert(
            result.message ||
            "Tenant updated successfully."
        );

        closeModal();

        await loadTenants();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to update tenant."
        );

    }

}


/* ================================
   SUSPEND / ACTIVATE TENANT
================================ */

async function toggleTenantStatus(id) {

    try {

        const response = await fetch(
            "/admin/tenants/" + id,
            {

                method: "PATCH",

                credentials: "include"

            }
        );

        if (response.status === 401) {

            window.location.replace(
                "/login.html"
            );

            return;

        }

        const result =
            await response.json();

        if (!response.ok) {

            alert(
                result.message ||
                "Unable to change tenant status."
            );

            return;

        }

        alert(
            result.message ||
            "Tenant status updated."
        );

        await loadTenants();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to change tenant status."
        );

    }

}


/* ================================
   DELETE TENANT
================================ */

async function deleteTenant(id) {

    const confirmed =
        confirm(
            "Are you sure you want to permanently delete this tenant?"
        );

    if (!confirmed) {

        return;

    }

    try {

        const response = await fetch(
            "/admin/tenants/" + id,
            {

                method: "DELETE",

                credentials: "include"

            }
        );

        if (response.status === 401) {

            window.location.replace(
                "/login.html"
            );

            return;

        }

        const result =
            await response.json();

        if (!response.ok) {

            alert(
                result.message ||
                "Unable to delete tenant."
            );

            return;

        }

        alert(
            result.message ||
            "Tenant deleted successfully."
        );

        await loadTenants();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to delete tenant."
        );

    }

}


/* ================================
   CREATE TENANT MODAL
================================ */

function openCreateTenantModal() {

    const modal =
        document.getElementById(
            "tenantModal"
        );

    if (modal) {

        modal.style.display = "block";

    }

}


function closeCreateTenantModal() {

    const modal =
        document.getElementById(
            "tenantModal"
        );

    if (modal) {

        modal.style.display = "none";

    }

}


/* ================================
   CREATE TENANT
================================ */

async function saveTenant() {

    const tenant = {

        business_name:
            document.getElementById(
                "businessName"
            ).value.trim(),

        contact_person:
            document.getElementById(
                "contactPerson"
            ).value.trim(),

        email:
            document.getElementById(
                "email"
            ).value.trim(),

        phone:
            document.getElementById(
                "phone"
            ).value.trim(),

        subscription_status:
            document.getElementById(
                "subscription"
            ).value

    };


    if (!tenant.business_name) {

        alert(
            "Please enter the business name."
        );

        return;

    }


    if (!tenant.contact_person) {

        alert(
            "Please enter the contact person."
        );

        return;

    }


    if (!tenant.email) {

        alert(
            "Please enter the tenant email."
        );

        return;

    }


    if (!tenant.phone) {

        alert(
            "Please enter the phone number."
        );

        return;

    }


    try {

        const response = await fetch(
            "/admin/tenants",
            {

                method: "POST",

                credentials: "include",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(tenant)

            }
        );

        if (response.status === 401) {

            window.location.replace(
                "/login.html"
            );

            return;

        }

        const result =
            await response.json();

        if (!response.ok || !result.success) {

            alert(
                result.message ||
                "Unable to create tenant."
            );

            return;

        }

        alert(
            result.message ||
            "Tenant created successfully."
        );

        closeCreateTenantModal();

        document.getElementById(
            "businessName"
        ).value = "";

        document.getElementById(
            "contactPerson"
        ).value = "";

        document.getElementById(
            "email"
        ).value = "";

        document.getElementById(
            "phone"
        ).value = "";

        document.getElementById(
            "subscription"
        ).value = "trial";

        await loadTenants();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to create tenant."
        );

    }

}


/* ================================
   CLOSE EDIT MODAL
================================ */

function closeModal() {

    const modal =
        document.getElementById(
            "editModal"
        );

    if (modal) {

        modal.style.display = "none";

    }

}