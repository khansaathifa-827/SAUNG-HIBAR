const MENU_KEY = "saungHibarMenus";
const params = new URLSearchParams(window.location.search);
const menuId = params.get("id");
const pageType = document.body.dataset.page;

const menuTambah = document.getElementById("menuTambah");
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const photoPicker = document.getElementById("photoPicker");
const toast = document.getElementById("toast");
const menuButton = document.getElementById("menuButton");
const navigationMenu = document.getElementById("navigationMenu");

function getMenus() {
  try {
    const saved = JSON.parse(localStorage.getItem(MENU_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (error) {
    console.warn("Data menu belum dapat dibaca.", error);
  }
  return [
    { id: "ayam-goreng", name: "Ayam Goreng", category: "Makanan", price: 20000, unit: "", status: "Tersedia", description: "", image: "../assets/ayam-goreng.jpg" },
    { id: "ikan-goreng", name: "Ikan Goreng", category: "Makanan", price: 25000, unit: "", status: "Tersedia", description: "", image: "../assets/ikan-goreng.jpg" },
    { id: "kangkung", name: "Kangkung", category: "Makanan", price: 10000, unit: "", status: "Tidak Tersedia", description: "", image: "../assets/kangkung.jpg" },
    { id: "jengkol-goreng", name: "Jengkol Goreng", category: "Makanan", price: 10000, unit: "", status: "Tersedia", description: "", image: "../assets/jengkol-goreng.jpg" },
    { id: "sate-sapi", name: "Sate Sapi", category: "Makanan", price: 3500, unit: "/tusuk", status: "Tersedia", description: "", image: "../assets/sate-sapi.jpg" },
    { id: "cireng", name: "Cireng", category: "Makanan", price: 5000, unit: "", status: "Tersedia", description: "", image: "../assets/cireng.jpg" }
  ];
}

let currentImage = "";
let currentMenu = null;

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 2400);
}

if (menuButton && navigationMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigationMenu.classList.toggle("hidden", isOpen);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-wrapper")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigationMenu.classList.add("hidden");
    }
  });
}

if (menuId) {
  currentMenu = getMenus().find((item) => item.id === menuId) || null;
  if (currentMenu) {
    document.getElementById("menuName").value = currentMenu.name || "";
    document.getElementById("menuCategory").value = currentMenu.category || "";
    document.getElementById("menuPrice").value = currentMenu.price ?? "";
    document.getElementById("menuUnit").value = currentMenu.unit || "";
    document.getElementById("menuStatus").value = currentMenu.status || "Tersedia";
    document.getElementById("menuDescription").value = currentMenu.description || "";
    currentImage = currentMenu.image || "";
    if (currentImage) {
      photoPreview.src = currentImage;
      photoPicker.classList.add("has-image");
    }
  } else {
    showToast("Menu tidak ditemukan. Isi formulir untuk membuat menu baru.");
  }
} else if (pageType === "detail-menu") {
  // Tombol "Menu Baru" membuka halaman detail/update dalam mode data baru.
  document.getElementById("menuStatus").value = "Tersedia";
}

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("File yang dipilih harus berupa gambar.");
    photoInput.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    currentImage = reader.result;
    photoPreview.src = currentImage;
    photoPicker.classList.add("has-image");
  };
  reader.readAsDataURL(file);
});

menuTambah.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("menuName").value.trim();
  const category = document.getElementById("menuCategory").value;
  const price = Number(document.getElementById("menuPrice").value);
  const unit = document.getElementById("menuUnit").value.trim();
  const status = document.getElementById("menuStatus").value;
  const description = document.getElementById("menuDescription").value.trim();

  if (!name || !category || !Number.isFinite(price) || price < 0 || !status) {
    showToast("Periksa kembali data menu yang wajib diisi.");
    return;
  }

  const menus = getMenus();
  const newMenu = {
    id: currentMenu?.id || `menu-${Date.now()}`,
    name, category, price, unit, status, description,
    image: currentImage || "../assets/ayam-goreng.jpg"
  };

  const existingIndex = menus.findIndex((item) => item.id === newMenu.id);
  if (existingIndex >= 0) menus[existingIndex] = newMenu;
  else menus.unshift(newMenu);

  localStorage.setItem(MENU_KEY, JSON.stringify(menus));
  showToast("Data menu berhasil disimpan.");
  window.setTimeout(() => {
    window.location.href = "../Kelola%20Menu/kelola-menu.html";
  }, 650);
});

document.getElementById("cancelButton").addEventListener("click", () => {
  window.location.href = "../Kelola%20Menu/kelola-menu.html";
});
