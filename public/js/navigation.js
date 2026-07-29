document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const toggle = document.getElementById("menuToggle");

    toggle.addEventListener("click", () => {

        sidebar.classList.toggle("hidden");

    });

});