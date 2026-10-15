/* JavaScript untuk halaman Fasilitas saja; tanpa library tambahan. */
(() => {
  "use strict";

  const page = document.querySelector(".sh-fas");
  if (!page) return;

  // 1. Navigasi mobile / tablet.
  const menuButton = page.querySelector(".sh-fas__menu-toggle");
  const navigation = page.querySelector(".sh-fas__nav");

  function setMenuOpen(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
    );
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".sh-fas__navbar")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  const desktop = window.matchMedia("(min-width: 1111px)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) setMenuOpen(false);
  });

  // 2. Lightbox foto: interaksi tambahan tanpa mengubah tampilan PDF.
  const galleryItems = [...page.querySelectorAll(".sh-fas__gallery-item")];
  const lightbox = page.querySelector("#sh-fas-lightbox");
  const largeImage = lightbox.querySelector(".sh-fas__lightbox-image");
  const caption = lightbox.querySelector(".sh-fas__lightbox-caption");
  let currentIndex = 0;
  let previousFocus = null;

  function showPhoto(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const thumbnail = item.querySelector("img");
    largeImage.src = thumbnail.getAttribute("src");
    largeImage.alt = thumbnail.alt;
    caption.textContent = item.dataset.caption || thumbnail.alt;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      previousFocus = item;
      showPhoto(index);
      if (typeof lightbox.showModal === "function") lightbox.showModal();
    });
  });

  lightbox
    .querySelector(".sh-fas__lightbox-close")
    .addEventListener("click", () => lightbox.close());
  lightbox
    .querySelector(".sh-fas__lightbox-prev")
    .addEventListener("click", () => showPhoto(currentIndex - 1));
  lightbox
    .querySelector(".sh-fas__lightbox-next")
    .addEventListener("click", () => showPhoto(currentIndex + 1));

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(currentIndex + 1);
    }
    // Escape sudah ditangani otomatis oleh elemen dialog HTML.
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => previousFocus?.focus());
})();
