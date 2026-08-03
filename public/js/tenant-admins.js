document.addEventListener("DOMContentLoaded", () => {

    console.log("Tenant Administrators JS started");

    loadTenantAdmins();

    loadTenants();

    const createButton =
        document.getElementById("createAdminButton");

    if (createButton) {

        createButton.addEventListener(
            "click",
            openCreateModal
        );

    }

    const cancelAdminButton =
        document.getElementById("cancelAdminButton");

    if (cancelAdminButton) {

        cancelAdminButton.addEventListener(
            "click",
            closeCreateModal
        );

    }

    const saveAdminButton =
        document.getElementById("saveAdminButton");

    if (saveAdminButton) {

        saveAdminButton.addEventListener(
            "click",
            createTenantAdmin
        );

    }

    const cancelEditButton =
        document.getElementById("cancelEditAdminButton");

    if (cancelEditButton) {

        cancelEditButton.addEventListener(
            "click",
            closeEditModal
        );

    }

});


/*
==========================================
LOAD TENANT ADMINISTRATORS
==========================================
*/

async function loadTenantAdmins() {

    try {

        console.log(
            "Requesting /admin/tenant-admins"
        );

        const response =
            await fetch(
                "/admin/tenant-admins",
                {
                    credentials: "include"
                }
            );

        console.log(
            "Tenant admin response status:",
            response.status
        );

        const data =
            await response.json();

        console.log(
            "Tenant admin response data:",
            data
        );

        const tbody =
            document.getElementById(
                "tenantAdminBody"
            );

        if (!tbody) {

            console.error(
                "Element #tenantAdminBody was not found."
            );

            return;

        }

        tbody.innerHTML = "";


        if (!response.ok || !data.success) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        ${data.message || "Unable to load tenant administrators."}
                    </td>
                </tr>
            `;

            return;

        }


        const tenantAdmins =
            data.tenantAdmins || [];


        /*
        ==========================================
        UPDATE STATISTICS
        ==========================================
        */

        const totalAdmins =
            tenantAdmins.length;

        const activeAdmins =
            tenantAdmins.filter(
                admin => admin.is_active
            ).length;

        const suspendedAdmins =
            tenantAdmins.filter(
                admin => !admin.is_active
            ).length;


        const totalAdminsElement =
            document.getElementById(
                "totalAdmins"
            );

        if (totalAdminsElement) {

            totalAdminsElement.textContent =
                totalAdmins;

        }


        const activeAdminsElement =
            document.getElementById(
                "activeAdmins"
            );

        if (activeAdminsElement) {

            activeAdminsElement.textContent =
                activeAdmins;

        }


        const suspendedAdminsElement =
            document.getElementById(
                "suspendedAdmins"
            );

        if (suspendedAdminsElement) {

            suspendedAdminsElement.textContent =
                suspendedAdmins;

        }


        /*
        ==========================================
        NO ADMINISTRATORS
        ==========================================
        */

        if (tenantAdmins.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        No Tenant Administrators Found
                    </td>
                </tr>
            `;

            return;

        }


        /*
        ==========================================
        DISPLAY ADMINISTRATORS
        ==========================================
        */

        tenantAdmins.forEach(admin => {

            tbody.innerHTML += `

                <tr>

                    <td>
                        ${admin.full_name || "-"}
                    </td>

                    <td>
                        ${admin.username || "-"}
                    </td>

                    <td>
                        ${admin.email || "-"}
                    </td>

                    <td>
                        ${admin.tenant_name || "-"}
                    </td>

                    <td>
                        ${
                            admin.is_active
                            ? "Active"
                            : "Suspended"
                        }
                    </td>

                    <td>

                        <button
                            class="btn btn-primary"
                            onclick="editTenantAdmin('${admin.id}')">

                            Edit

                        </button>

                        <button
                            class="btn btn-warning"
                            onclick="toggleTenantAdminStatus('${admin.id}')">

                            ${
                                admin.is_active
                                ? "Suspend"
                                : "Activate"
                            }

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(
            "Tenant administrator loading error:",
            error
        );

    }

}


/*
==========================================
LOAD TENANTS INTO DROPDOWN
==========================================
*/

async function loadTenants() {

    try {

        const response =
            await fetch(
                "/admin/tenants",
                {
                    credentials: "include"
                }
            );

        const tenants =
            await response.json();


        const createTenantSelect =
            document.getElementById(
                "adminTenant"
            );


        const editTenantSelect =
            document.getElementById(
                "editAdminTenant"
            );


        if (!Array.isArray(tenants)) {

            console.error(
                "Unexpected tenant response:",
                tenants
            );

            return;

        }


        /*
        ==========================================
        CREATE ADMIN TENANT DROPDOWN
        ==========================================
        */

        if (createTenantSelect) {

            createTenantSelect.innerHTML = `
                <option value="">
                    Select Tenant
                </option>
            `;

            tenants.forEach(tenant => {

                createTenantSelect.innerHTML += `

                    <option value="${tenant.id}">

                        ${tenant.business_name}

                    </option>

                `;

            });

        }


        /*
        ==========================================
        EDIT ADMIN TENANT DROPDOWN
        ==========================================
        */

        if (editTenantSelect) {

            editTenantSelect.innerHTML = `
                <option value="">
                    Select Tenant
                </option>
            `;

            tenants.forEach(tenant => {

                editTenantSelect.innerHTML += `

                    <option value="${tenant.id}">

                        ${tenant.business_name}

                    </option>

                `;

            });

        }


        /*
        ==========================================
        UPDATE TENANT COUNT
        ==========================================
        */

        const tenantCount =
            document.getElementById(
                "tenantCount"
            );

        if (tenantCount) {

            tenantCount.textContent =
                tenants.length;

        }

    }

    catch (error) {

        console.error(
            "Tenant loading error:",
            error
        );

    }

}


/*
==========================================
OPEN CREATE ADMIN MODAL
==========================================
*/

function openCreateModal() {

    const modal =
        document.getElementById(
            "createAdminModal"
        );

    if (modal) {

        modal.style.display = "block";

    }

}


/*
==========================================
CLOSE CREATE ADMIN MODAL
==========================================
*/

function closeCreateModal() {

    const modal =
        document.getElementById(
            "createAdminModal"
        );

    if (modal) {

        modal.style.display = "none";

    }

}


/*
==========================================
CREATE TENANT ADMINISTRATOR
==========================================
*/

async function createTenantAdmin() {

    try {

        const body = {

            full_name:
                document.getElementById(
                    "adminFullName"
                ).value.trim(),

            username:
                document.getElementById(
                    "adminUsername"
                ).value.trim(),

            email:
                document.getElementById(
                    "adminEmail"
                ).value.trim(),

            password:
                document.getElementById(
                    "adminPassword"
                ).value,

            tenant_id:
                document.getElementById(
                    "adminTenant"
                ).value

        };


        if (
            !body.full_name ||
            !body.username ||
            !body.email ||
            !body.password ||
            !body.tenant_id
        ) {

            alert(
                "Please complete all fields."
            );

            return;

        }


        const response =
            await fetch(
                "/admin/tenant-admins",
                {

                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(body)

                }
            );


        const result =
            await response.json();


        alert(
            result.message ||
            "Request completed."
        );


        if (!response.ok || !result.success) {

            return;

        }


        closeCreateModal();


        /*
        Clear form
        */

        document.getElementById(
            "adminFullName"
        ).value = "";

        document.getElementById(
            "adminUsername"
        ).value = "";

        document.getElementById(
            "adminEmail"
        ).value = "";

        document.getElementById(
            "adminPassword"
        ).value = "";

        document.getElementById(
            "adminTenant"
        ).value = "";


        /*
        Reload administrators
        */

        loadTenantAdmins();

    }

    catch (error) {

        console.error(
            "Create tenant administrator error:",
            error
        );

        alert(
            "Unable to create tenant administrator."
        );

    }

}


/*
==========================================
EDIT TENANT ADMINISTRATOR
==========================================
*/

async function editTenantAdmin(id) {

    alert(
        "Edit functionality will be connected after we confirm the current tenant administrator API."
    );

}


/*
==========================================
TOGGLE ADMIN STATUS
==========================================
*/

async function toggleTenantAdminStatus(id) {

    alert(
        "Suspend/Activate functionality will be connected after we confirm the current tenant administrator API."
    );

}


/*
==========================================
CLOSE EDIT MODAL
==========================================
*/

function closeEditModal() {

    const modal =
        document.getElementById(
            "editAdminModal"
        );

    if (modal) {

        modal.style.display = "none";

    }

}