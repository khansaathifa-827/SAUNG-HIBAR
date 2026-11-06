/* JavaScript khusus halaman Gallery. Tidak memakai API atau backend. */
(() => {
  "use strict";

  const page = document.querySelector(".sh-gallery");
  if (!page) return;

  // 1. Navbar untuk tablet dan ponsel.
  const menuToggle = page.querySelector(".sh-gallery__menu-toggle");
  const nav = page.querySelector(".sh-gallery__nav");

  function closeMenu() {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
    );
  });
  nav
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".sh-gallery__navbar")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // 2. Filter kategori dan penyusunan ulang foto sesuai lebar layar.
  const columns = [...page.querySelectorAll(".sh-gallery__column")];
  const photos = [...page.querySelectorAll(".sh-gallery__photo")].sort(
    (a, b) => Number(a.dataset.order) - Number(b.dataset.order),
  );
  const filters = [...page.querySelectorAll(".sh-gallery__filter")];
  const filterStatus = page.querySelector("#sh-gallery-filter-status");
  let activeFilter = "semua";
  let visiblePhotos = photos;

  function layoutPhotos() {
    const count =
      window.innerWidth <= 520 ? 1 : window.innerWidth <= 800 ? 2 : 3;
    const heights = Array(count).fill(0);
    const selected = photos.filter((photo) => {
      const categories = photo.dataset.categories.split(" ");
      const show =
        activeFilter === "semua" || categories.includes(activeFilter);
      photo.hidden = !show;
      return show;
    });
    visiblePhotos = selected;

    if (count === 3 && activeFilter === "semua") {
      // Susunan persis tiga kolom seperti screenshot PDF.
      selected.forEach((photo) =>
        columns[Number(photo.dataset.column) - 1].appendChild(photo),
      );
    } else {
      // Isi kolom terpendek untuk menghindari celah pada tablet/HP/filter.
      selected.forEach((photo) => {
        const shortest = heights.indexOf(Math.min(...heights));
        columns[shortest].appendChild(photo);
        heights[shortest] += Number(photo.dataset.ratio) + 0.035;
      });
    }
    filterStatus.textContent = `Menampilkan ${selected.length} foto.`;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      layoutPhotos();
    });
  });

  const smallScreen = window.matchMedia("(max-width: 520px)");
  const tabletScreen = window.matchMedia("(max-width: 800px)");
  smallScreen.addEventListener("change", layoutPhotos);
  tabletScreen.addEventListener("change", layoutPhotos);
  window
    .matchMedia("(min-width: 1121px)")
    .addEventListener("change", closeMenu);
  layoutPhotos();

  // 3. Lightbox: perbesar gambar dan navigasi dengan tombol/panah keyboard.
  const dialog = page.querySelector("#sh-gallery-lightbox");
  const largeImage = dialog.querySelector(".sh-gallery__lightbox-image");
  const caption = dialog.querySelector(".sh-gallery__lightbox-caption");
  const closeButton = dialog.querySelector(".sh-gallery__lightbox-close");
  let currentIndex = 0;

  function showImage(index) {
    if (!visiblePhotos.length) return;
    currentIndex = (index + visiblePhotos.length) % visiblePhotos.length;
    const photo = visiblePhotos[currentIndex];
    const thumb = photo.querySelector("img");
    largeImage.src = thumb.getAttribute("src");
    largeImage.alt = thumb.alt;
    caption.textContent = photo.dataset.caption;
  }

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      showImage(visiblePhotos.indexOf(photo));
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog
    .querySelector(".sh-gallery__lightbox-prev")
    .addEventListener("click", () => showImage(currentIndex - 1));
  dialog
    .querySelector(".sh-gallery__lightbox-next")
    .addEventListener("click", () => showImage(currentIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showImage(currentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showImage(currentIndex + 1);
    }
  });
})();
