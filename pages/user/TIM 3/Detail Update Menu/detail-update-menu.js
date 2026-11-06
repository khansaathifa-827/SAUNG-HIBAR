const MENU_KEY = "saungHibarMenus";
const params = new URLSearchParams(window.location.search);
const menuId = params.get("id");

const form = document.getElementById("menuForm");
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const toast = document.getElementById("toast");

const defaultMenus = [
  { id: "ayam-goreng", name: "Ayam Goreng", category: "Makanan", price: 20000, status: "Tersedia", description: "", image: "../assets/ayam-goreng.jpg" },
  { id: "ikan-goreng", name: "Ikan Goreng", category: "Makanan", price: 25000, status: "Tersedia", description: "", image: "../assets/ikan-goreng.jpg" },
  { id: "kangkung", name: "Kangkung", category: "Makanan", price: 10000, status: "Tidak Tersedia", description: "", image: "../assets/kangkung.jpg" },
  { id: "jengkol-goreng", name: "Jengkol Goreng", category: "Makanan", price: 10000, status: "Tersedia", description: "", image: "../assets/jengkol-goreng.jpg" },
  { id: "sate-sapi", name: "Sate Sapi", category: "Makanan", price: 3500, status: "Tersedia", description: "", image: "../assets/sate-sapi.jpg" },
  { id: "cireng", name: "Cireng", category: "Makanan", price: 5000, status: "Tersedia", description: "", image: "../assets/cireng.jpg" }
];

function getMenus() {
  try {
    const stored = JSON.parse(localStorage.getItem(MENU_KEY));
    if (Array.isArray(stored)) return stored;
  } catch (error) {
    console.warn("Data menu tidak dapat dibaca.", error);
  }
  localStorage.setItem(MENU_KEY, JSON.stringify(defaultMenus));
  return defaultMenus;
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 2500);
}

let menus = getMenus();
let currentMenu = menuId ? menus.find(menu => menu.id === menuId) : null;
let currentImage = currentMenu?.image || "../assets/ikan-goreng.jpg";

if (currentMenu) {
  document.getElementById("menuName").value = currentMenu.name || "";
  document.getElementById("menuCategory").value = currentMenu.category || "";
  document.getElementById("menuPrice").value = currentMenu.price ?? "";
  document.getElementById("menuStatus").value = currentMenu.status || "Tersedia";
  document.getElementById("menuDescription").value = currentMenu.description || "";
  photoPreview.src = currentMenu.image || currentImage;
} else if (menuId) {
  showToast("Data menu tidak ditemukan.");
} else {
  // Default tampilan saat halaman dibuka langsung: data contoh Ikan Goreng.
  currentMenu = menus.find(menu => menu.id === "ikan-goreng") || null;
  if (currentMenu) {
    document.getElementById("menuName").value = currentMenu.name;
    document.getElementById("menuCategory").value = currentMenu.category;
    document.getElementById("menuPrice").value = currentMenu.price;
    document.getElementById("menuStatus").value = currentMenu.status;
    document.getElementById("menuDescription").value = currentMenu.description || "";
    currentImage = currentMenu.image || currentImage;
    photoPreview.src = currentImage;
  }
}

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("Pilih file gambar yang valid.");
    photoInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    currentImage = reader.result;
    photoPreview.src = currentImage;
  };
  reader.readAsDataURL(file);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const updatedMenu = {
    id: currentMenu?.id || menuId || `menu-${Date.now()}`,
    name: document.getElementById("menuName").value.trim(),
    category: document.getElementById("menuCategory").value,
    price: Number(document.getElementById("menuPrice").value),
    status: document.getElementById("menuStatus").value,
    description: document.getElementById("menuDescription").value.trim(),
    image: currentImage
  };

  if (!updatedMenu.name || !updatedMenu.category ||
      !Number.isFinite(updatedMenu.price) || updatedMenu.price < 0) {
    showToast("Lengkapi data menu terlebih dahulu.");
    return;
  }

  menus = getMenus();
  const index = menus.findIndex(menu => menu.id === updatedMenu.id);
  if (index >= 0) menus[index] = updatedMenu;
  else menus.unshift(updatedMenu);

  localStorage.setItem(MENU_KEY, JSON.stringify(menus));
  showToast("Data menu berhasil disimpan.");

  window.setTimeout(() => {
    window.location.href = "../Kelola%20Menu/kelola-menu.html";
  }, 700);
});

function goBack() {
  window.location.href = "../Kelola%20Menu/kelola-menu.html";
}

document.getElementById("backButton").addEventListener("click", goBack);
document.getElementById("cancelButton").addEventListener("click", goBack);

const menuButton = document.getElementById("menuButton");
const navigationMenu = document.getElementById("navigationMenu");

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigationMenu.classList.toggle("hidden", open);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu-wrapper")) {
    menuButton.setAttribute("aria-expanded", "false");
    navigationMenu.classList.add("hidden");
  }
});
