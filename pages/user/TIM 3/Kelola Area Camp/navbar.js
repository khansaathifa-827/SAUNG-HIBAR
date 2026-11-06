
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const navigationMenu = document.getElementById("navigationMenu");

  if (!menuButton || !navigationMenu) {
    console.error("Tombol burger atau menu navigasi tidak ditemukan.");
    return;
  }

  menuButton.addEventListener("click", function (event) {
    event.stopPropagation();

    navigationMenu.classList.toggle("hidden");

    const isOpen = !navigationMenu.classList.contains("hidden");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".menu-wrapper")) {
      navigationMenu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});
