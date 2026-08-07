const modal = document.getElementById("packageModal");

const newPackageButton =
document.getElementById("newPackageButton");

const cancelPackage =
document.getElementById("cancelPackage");

const savePackage =
document.getElementById("savePackage");

const table =
document.getElementById("packagesTable");

let editingPackageId = null;

newPackageButton.addEventListener("click", () => {

    editingPackageId = null;

    document.getElementById("modalTitle").textContent =
        "Create Package";

    document.getElementById("packageName").value = "";

    document.getElementById("packageDescription").value = "";

    document.getElementById("packagePrice").value = "";

    document.getElementById("packageDuration").value = "";

    modal.style.display = "flex";

});

cancelPackage.addEventListener("click", () => {

    modal.style.display = "none";

});

window.onclick = function(event){

    if(event.target === modal){

        modal.style.display = "none";

    }

};

document.addEventListener(
    "DOMContentLoaded",
    loadPackages
);

async function loadPackages(){

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const response = await fetch(

        "/api/tenant/packages?tenant_id=" +
        user.tenant_id,

        {

            credentials:"include"

        }

    );

    const result = await response.json();

    table.innerHTML = "";

    if(!result.success){

        return;

    }

    result.data.forEach(packageItem => {

        table.innerHTML += `

<tr>

<td>${packageItem.package_name}</td>

<td>KES ${packageItem.price}</td>

<td>${packageItem.duration_minutes} Minutes</td>

<td>${
    packageItem.is_active
        ? "Active"
        : "Suspended"
}</td>

<td>

<button
class="btn btn-primary"
onclick="editPackage('${packageItem.id}')">

Edit

</button>

<button
class="btn btn-warning"
onclick="togglePackage('${packageItem.id}')">

${

    packageItem.is_active

        ? "Suspend"

        : "Activate"

}

</button>

<button
class="btn btn-danger"
onclick="deletePackage('${packageItem.id}')">

Delete

</button>

</td>

</tr>

`;

    });

}

savePackage.addEventListener("click", async () => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const request = {

        tenant_id: user.tenant_id,

        package_name:
            document.getElementById("packageName").value,

        description:
            document.getElementById("packageDescription").value,

        price: Number(
            document.getElementById("packagePrice").value
        ),

        duration_minutes: Number(
            document.getElementById("packageDuration").value
        )

    };

    let response;

    if (editingPackageId === null) {

        response = await fetch(
            "/api/tenant/packages",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            }
        );

    } else {

        response = await fetch(
            "/api/tenant/packages/" + editingPackageId,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            }
        );

    }

    const result = await response.json();

    if (!result.success) {

        alert(result.message);

        return;

    }

    alert(result.message);

    modal.style.display = "none";

    editingPackageId = null;

    loadPackages();

});

async function editPackage(packageId){

    editingPackageId = packageId;

    const response = await fetch(

        "/api/tenant/packages/" + packageId,

        {

            credentials:"include"

        }

    );

    const result = await response.json();

    if(!result.success){

        alert(result.message);

        return;

    }

    const packageItem = result.data;

    document.getElementById("modalTitle").textContent =
        "Edit Package";

    document.getElementById("packageName").value =
        packageItem.package_name;

    document.getElementById("packageDescription").value =
        packageItem.description;

    document.getElementById("packagePrice").value =
        packageItem.price;

    document.getElementById("packageDuration").value =
        packageItem.duration_minutes;

    modal.style.display = "flex";

}

async function togglePackage(packageId) {

    const response = await fetch(

        "/api/tenant/packages/" + packageId,

        {
            credentials: "include"
        }

    );

    const result = await response.json();

    if (!result.success) {

        alert(result.message);

        return;

    }

    const packageItem = result.data;

    const newStatus = packageItem.is_active ? 0 : 1;

    const updateResponse = await fetch(

        "/api/tenant/packages/" + packageId,

        {

            method: "PATCH",

            credentials: "include",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                is_active: newStatus

            })

        }

    );

    const updateResult = await updateResponse.json();

    alert(updateResult.message);

    loadPackages();

}



async function deletePackage(packageId) {

    if (

        !confirm(

            "Are you sure you want to delete this package?"

        )

    ) {

        return;

    }

    const response = await fetch(

        "/api/tenant/packages/" + packageId,

        {

            method: "DELETE",

            credentials: "include"

        }

    );

    const result = await response.json();

    alert(result.message);

    loadPackages();

}