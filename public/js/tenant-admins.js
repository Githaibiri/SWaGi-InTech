document.addEventListener("DOMContentLoaded", loadTenantAdmins);

async function loadTenantAdmins() {

    try {

        const response = await fetch("/admin/tenant-admins", {
            credentials: "include"
        });

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        const tbody =
            document.getElementById("tenantBody");

        tbody.innerHTML = "";

        data.tenantAdmins.forEach(admin => {

            tbody.innerHTML += `
                <tr>

                    <td>${admin.full_name}</td>

                    <td>${admin.email}</td>

                    <td>${admin.username}</td>

                    <td>${admin.tenant_name ?? "-"}</td>

                    <td>${admin.role}</td>

                    <td>${admin.is_active ? "Active" : "Suspended"}</td>

                    <td>

                        <button>Edit</button>

                        <button>Suspend</button>

                        <button>Reset Password</button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load tenant administrators.");

    }

}