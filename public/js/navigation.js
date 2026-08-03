document.addEventListener("DOMContentLoaded", () => {

    console.log("Navigation JS started");

    /*
    ==========================================
    SIDEBAR NAVIGATION GROUPS
    ==========================================
    */

    const navGroups =
        document.querySelectorAll(".nav-group");

    navGroups.forEach(group => {

        group.addEventListener("click", () => {

            const items =
                group.nextElementSibling;

            if (!items) {
                return;
            }

            items.classList.toggle("open");

        });

    });


    /*
    ==========================================
    MOBILE MENU
    ==========================================
    */

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebar =
        document.querySelector(".sidebar");

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /*
    ==========================================
    SEARCH BOX
    ==========================================
    */

    const searchBox =
        document.getElementById("searchBox");

    if (searchBox) {

        searchBox.addEventListener("input", () => {

            const searchTerm =
                searchBox.value.toLowerCase().trim();

            const rows =
                document.querySelectorAll("tbody tr");

            rows.forEach(row => {

                const text =
                    row.textContent.toLowerCase();

                if (text.includes(searchTerm)) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }

});