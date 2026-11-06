
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const navigationMenu = document.getElementById("navigationMenu");

  if (!menuButton || !navigationMenu) return;

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const opening = navigationMenu.classList.contains("hidden");

    navigationMenu.classList.toggle("hidden");
    menuButton.setAttribute("aria-expanded", String(opening));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-wrapper")) {
      navigationMenu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});
