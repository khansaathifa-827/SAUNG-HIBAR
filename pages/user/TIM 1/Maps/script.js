/* ==========================================================
   SAUNG HIBAR - MAPS
   JavaScript khusus untuk navbar pada halaman Maps.
   Link Google Maps memakai URL biasa, tanpa backend/API key.
   ========================================================== */
(() => {
  "use strict";

  const page = document.querySelector(".sh-map");
  if (!page) return;

  const menuButton = page.querySelector(".sh-map__menu-button");
  const navigation = page.querySelector(".sh-map__nav");
  if (!menuButton || !navigation) return;

  function setMenuOpen(isOpen) {
    navigation.classList.toggle("sh-map__nav--open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
    );
  }

  // Buka / tutup menu dengan tombol hamburger.
  menuButton.addEventListener("click", () => {
    const currentlyOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!currentlyOpen);
  });

  // Setelah memilih tautan, tutup menu.
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  // Tekan Escape untuk menutup menu dan mengembalikan fokus.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navigation.classList.contains("sh-map__nav--open")
    ) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  // Tutup menu jika pengguna mengklik area di luar navbar.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".sh-map__navbar")) {
      setMenuOpen(false);
    }
  });

  // Saat kembali ke desktop, kembalikan status navigasi.
  const desktopScreen = window.matchMedia("(min-width: 1111px)");
  desktopScreen.addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });
})();
