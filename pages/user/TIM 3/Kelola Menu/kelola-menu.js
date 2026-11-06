
const MENU_KEY = "saungHibarMenus";

const defaultMenus = [
  { id: "ayam-goreng", name: "Ayam Goreng", category: "Makanan", price: 20000, unit: "", status: "Tersedia", description: "", image: "../Kelola Menu/assets/ayam-goreng.png" },
  { id: "ikan-goreng", name: "Ikan Goreng", category: "Makanan", price: 25000, unit: "", status: "Tersedia", description: "", image: "../Kelola Menu/assets/ikan-goreng.png" },
  { id: "kangkung", name: "Kangkung", category: "Makanan", price: 10000, unit: "", status: "Tidak Tersedia", description: "", image: "../Kelola Menu/assets/kangkung.png" },
  { id: "jengkol-goreng", name: "Jengkol Goreng", category: "Makanan", price: 10000, unit: "", status: "Tersedia", description: "", image: "../Kelola Menu/assets/jengkol-goreng.png" },
  { id: "sate-sapi", name: "Sate Sapi", category: "Makanan", price: 3500, unit: "/tusuk", status: "Tersedia", description: "", image: "../Kelola Menu/assets/sate-sapi.png" },
  { id: "cireng", name: "Cireng", category: "Makanan", price: 5000, unit: "", status: "Tersedia", description: "", image: "../Kelola Menu/ assets/cireng.png" }
];

// Membaca data menu dari localStorage
function readMenus() {
  try {
    const saved = JSON.parse(localStorage.getItem(MENU_KEY));

    if (Array.isArray(saved)) return saved;
  } catch (error) {
    console.warn("Data menu belum dapat dibaca.", error);
  }

  localStorage.setItem(MENU_KEY, JSON.stringify(defaultMenus));
  return defaultMenus;
}

function fixImagePaths() {
  const menus = readMenus();

  const imagePaths = {
    "ayam-goreng": "assets/ayam-goreng.png",
    "ikan-goreng": "assets/ikan-goreng.png",
    "kangkung": "assets/kangkung.png",
    "jengkol-goreng": "assets/jengkol-goreng.png",
    "sate-sapi": "assets/sate-sapi.png",
    "cireng": "assets/cireng.png"
  };

  menus.forEach((menu) => {
    if (
      menu.image &&
      (menu.image.startsWith("../assets/") || menu.image.endsWith(".jpg"))
    ) {
      menu.image = imagePaths[menu.id] || menu.image;
    }
  });

  localStorage.setItem(MENU_KEY, JSON.stringify(menus));
}

// Mengubah angka menjadi format rupiah
function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(value) || 0).replace(/\s/g, " ");
}

// Mengambil elemen HTML
const menuCards = document.querySelectorAll(".menu-card");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");
const menuCount = document.getElementById("menuCount");
const menuList = document.getElementById("menuList");
const menuTemplate = document.getElementById("menuTemplate");

const menuButton = document.getElementById("menuButton");
const navigationMenu = document.getElementById("navigationMenu");

// Memperbarui isi kartu HTML berdasarkan localStorage
function updateMenuCards() {
  const menus = readMenus();

  menus.forEach((menu) => {
    // Cari kartu berdasarkan ID menu
    let card = [...menuList.querySelectorAll(".menu-card")]
      .find((item) => item.dataset.menuId === menu.id);

    // Kalau belum ada, buat dari template
    if (!card) {
      const clone = menuTemplate.content.cloneNode(true);
      card = clone.querySelector(".menu-card");

      card.dataset.menuId = menu.id;
      menuList.appendChild(clone);
    }

    // Perbarui isi kartu
    const image = card.querySelector(".menu-photo img");
    const name = card.querySelector(".menu-name");
    const price = card.querySelector(".menu-price");
    const category = card.querySelector(".menu-category");
    const status = card.querySelector(".status");
    const editButton = card.querySelector(".edit-button");

    if (image) {
      image.src = menu.image || "";
      image.alt = `Foto ${menu.name}`;
    }

    if (name) name.textContent = menu.name;

    if (price) {
      price.textContent = `${rupiah(menu.price)}${menu.unit || ""}`;
    }

    if (category) category.textContent = menu.category;

    if (status) {
      status.textContent = menu.status;
      status.classList.toggle(
        "unavailable",
        menu.status === "Tidak Tersedia"
      );
    }

    if (editButton) {
      editButton.href =
        `../Detail%20Update%20Menu/detail-update-menu.html?id=${encodeURIComponent(menu.id)}`;
    }
  });
}

// Pencarian dan filter menu
function filterMenus() {
  const keyword = searchInput.value.trim().toLowerCase();
  const menuCards = menuList.querySelectorAll(".menu-card");
  const selectedStatus = statusFilter.value;
  const selectedCategory = categoryFilter.value;

  let totalMenu = 0;

  menuCards.forEach((card) => {
    const name = card.querySelector(".menu-name")?.textContent.toLowerCase() || "";
    const category = card.querySelector(".menu-category")?.textContent.trim() || "";
    const status = card.querySelector(".status")?.textContent.trim() || "";

    const matchesKeyword = name.includes(keyword);
    const matchesStatus = !selectedStatus || status === selectedStatus;
    const matchesCategory = !selectedCategory || category === selectedCategory;

    const isVisible = matchesKeyword && matchesStatus && matchesCategory;

    card.hidden = !isVisible;

    if (isVisible) {
      totalMenu++;
    }
  });

  menuCount.textContent = `${totalMenu} menu`;
}

// Pencarian dan filter
searchInput.addEventListener("input", filterMenus);
statusFilter.addEventListener("change", filterMenus);
categoryFilter.addEventListener("change", filterMenus);

// Membuka dan menutup navigasi
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigationMenu.classList.toggle("hidden", isOpen);
});

// Menutup navigasi dan filter ketika klik di luar
document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu-wrapper")) {
    menuButton.setAttribute("aria-expanded", "false");
    navigationMenu.classList.add("hidden");
  }

});

// Memperbarui tampilan jika data berubah dari tab lain
window.addEventListener("storage", (event) => {
  if (event.key === MENU_KEY) {
    updateMenuCards();
    filterMenus();
  }
});

// Menampilkan data saat halaman dibuka
fixImagePaths();
updateMenuCards();
filterMenus();
