// JavaScript untuk halaman Home saja.
// IIFE menjaga variabel/fungsi agar tidak bercampur dengan halaman lain.
(() => {
  "use strict";

  const homePage = document.querySelector(".sh-home");
  if (!homePage) return;

  const menuButton = homePage.querySelector(".sh-home__menu-toggle");
  const navMenu = homePage.querySelector(".sh-home__nav");
  if (!menuButton || !navMenu) return;

  function setMenuOpen(isOpen) {
    navMenu.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
    );
  }

  // Toggle menu pada layar tablet dan ponsel.
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  // Tutup menu setelah pengunjung memilih tautan.
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  // Tombol Escape menutup menu dan mengembalikan fokus.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  // Tutup menu ketika pengguna klik area luar navbar.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".sh-home__navbar")) {
      setMenuOpen(false);
    }
  });

  // Kembalikan menu ke kondisi awal saat pindah ke desktop.
  const desktopQuery = window.matchMedia("(min-width: 901px)");
  function onScreenChange(event) {
    if (event.matches) setMenuOpen(false);
  }
  desktopQuery.addEventListener("change", onScreenChange);
})();
