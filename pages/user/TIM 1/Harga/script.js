
/* =========================================
   SAUNG HIBAR - HALAMAN HARGA
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.querySelector(
        ".sh-harga__menu-toggle"
    );

    const navMenu = document.querySelector(
        ".sh-harga__nav"
    );


    if (menuToggle && navMenu) {

        // Membuka dan menutup menu
        menuToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("is-open");

            menuToggle.classList.toggle("is-active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
            );

        });


        // Menutup menu ketika link dipilih
        const navLinks = navMenu.querySelectorAll(
            ".sh-harga__nav-link"
        );

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("is-open");

                menuToggle.classList.remove("is-active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Buka menu navigasi"
                );

            });

        });


        // Menutup menu ketika klik di luar navbar
        document.addEventListener("click", function (event) {

            const clickedInsideMenu = navMenu.contains(event.target);

            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {

                navMenu.classList.remove("is-open");

                menuToggle.classList.remove("is-active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Buka menu navigasi"
                );

            }

        });


        // Menutup menu ketika kembali ke desktop
        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {

                navMenu.classList.remove("is-open");

                menuToggle.classList.remove("is-active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }

});
