document.addEventListener("DOMContentLoaded", loadCustomers);

async function loadCustomers() {

    try {

        const response = await fetch("/admin/customers", {
            credentials: "include"
        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        const tbody = document.querySelector("#customersTable tbody");

        tbody.innerHTML = "";

        data.customers.forEach(customer => {

            tbody.innerHTML += `
                <tr>
                    <td>${customer.full_name}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.email ?? "-"}</td>
                    <td>${customer.account_status}</td>
                    <td>
                        <button>Edit</button>
                        <button>Suspend</button>
                        <button>Delete</button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load customers.");

    }

}

// Customer modal

const modal = document.getElementById("customerModal");

const addCustomerButton =
    document.getElementById("addCustomerButton");

const cancelCustomerButton =
    document.getElementById("cancelCustomerButton");

addCustomerButton.addEventListener("click", () => {

    modal.style.display = "flex";

});

cancelCustomerButton.addEventListener("click", () => {

    modal.style.display = "none";

});

const saveCustomerButton =
    document.getElementById("saveCustomerButton");

saveCustomerButton.addEventListener("click", saveCustomer);

async function saveCustomer() {

    const customer = {

        tenant_id: "YOUR_TENANT_ID",

        full_name:
            document.getElementById("customerName").value,

        phone:
            document.getElementById("customerPhone").value,

        email:
            document.getElementById("customerEmail").value,

        username:
            document.getElementById("customerUsername").value,

        password:
            document.getElementById("customerPassword").value

    };

    const response = await fetch("/admin/customers", {

        method: "POST",

        credentials: "include",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(customer)

    });

    const result = await response.json();

    if (!result.success) {

        alert(result.message);

        return;

    }

    modal.style.display = "none";

    loadCustomers();

}