
const photoUrl =
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=240&q=80";

// DATA AWAL 14 AREA CAMPING
const initialAreas = [
  {
    name: "A1",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "A2",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "unavailable"
  },
  {
    name: "A3",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "unavailable"
  },
  {
    name: "A4",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "A5",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "B1",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "B2",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "B3",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "unavailable"
  },
  {
    name: "B4",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "B5",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "B6",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "B7",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "unavailable"
  },
  {
    name: "B8",
    capacity: 4,
    facilities: ["Listrik", "Air Bersih", "Wi-Fi"],
    type: "Camping",
    status: "available"
  },
  {
    name: "Campervan",
    capacity: 6,
    facilities: ["Listrik", "Air Bersih"],
    type: "Campervan",
    status: "available"
  }
];


const STORAGE_KEY = "saungHibarAreas";

let areas;

try {
  const saved = localStorage.getItem(STORAGE_KEY);

  areas = saved
    ? JSON.parse(saved)
    : initialAreas.map((area, index) => ({
        ...area,
        id: index + 1
      }));

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(areas));
  }
} catch (error) {
  console.error("Gagal membaca data area:", error);

  areas = initialAreas.map((area, index) => ({
    ...area,
    id: index + 1
  }));
}

function saveAreasToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(areas));
    return true;
  } catch (error) {
    console.error("Gagal menyimpan data area:", error);
    showToast("Data gagal disimpan di browser.");
    return false;
  }
}


let editingId = null;
let filterStatus = "all";

const $ = selector => document.querySelector(selector);

const list = $("#blockList");
const editor = $("#editorView");
const page = $(".page-content");
const toast = $("#toast");

// NOTIFIKASI
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");

  window.clearTimeout(showToast.timer);

  showToast.timer = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2300);
}

// IKON FASILITAS
function iconForFacility(facility) {
  if (facility === "Listrik") return "ϟ";
  if (facility === "Air Bersih") return "♧";
  return "⌁";
}

// MENCEGAH TEKS INPUT DITAFSIRKAN SEBAGAI HTML
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

// MENAMPILKAN DAFTAR AREA
function renderAreas() {
  const query = $("#searchInput").value
    .trim()
    .toLowerCase();

  const filtered = areas.filter(area => {
    const matchesQuery =
      area.name.toLowerCase().includes(query);

    const matchesStatus =
      filterStatus === "all" ||
      area.status === filterStatus;

    return matchesQuery && matchesStatus;
  });

  $("#blockCount").textContent =
    `${filtered.length} blok`;

  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        Area tidak ditemukan. Coba kata kunci lain.
      </div>
    `;
    return;
  }

  filtered.forEach(area => {
    const card = document.createElement("article");

    card.className = "block-card";

    const facilityMarkup = area.facilities
      .map(facility => `
        <div>
          <span class="detail-icon">
            ${iconForFacility(facility)}
          </span>
          <span>${escapeHtml(facility)}</span>
        </div>
      `)
      .join("");

    card.innerHTML = `
      <img
        class="camp-photo"
        src="${photoUrl}"
        alt="Suasana camping di area ${escapeHtml(area.name)}"
        loading="lazy"
      >

      <div class="card-main">
        <div class="card-top">
          <h3>${escapeHtml(area.name)}</h3>

          <button
            class="edit-button"
            data-edit="${area.id}"
            aria-label="Edit ${escapeHtml(area.name)}"
          >
            <span>✎</span> Edit
          </button>
        </div>

        <div class="details">
          <div>
            <span class="detail-icon">♟</span>
            <span>${area.capacity} Orang</span>
          </div>

          ${facilityMarkup}
        </div>

        <div class="card-bottom">
          <span class="area-type">
            ${escapeHtml(area.type)}
          </span>

          <span class="status ${area.status}">
            ${
              area.status === "available"
                ? "• Tersedia"
                : "• Tidak Tersedia"
            }
          </span>
        </div>
      </div>
    `;

    list.appendChild(card);
  });
}

// MEMBUKA FORM TAMBAH ATAU EDIT

function openEditor(id = null) {
  editingId = id;

  const area = areas.find(item => item.id === id) || null;

  $("#editorTitle").textContent = area
    ? "Detail / Update Area"
    : "Tambah Area";

  $("#areaName").value = area ? area.type : "Camping";
  $("#areaBlock").value = area ? area.name : "";
  $("#areaCapacity").value = area ? area.capacity : 4;
  $("#areaStatus").value = area ? area.status : "available";
  $("#areaDescription").value = area ? area.description || "" : "";

  $("#previewImage").src = area ? area.photo || "" : "";
  $("#areaPhoto").classList.toggle(
    "has-image",
    Boolean(area && area.photo)
  );

  document
    .querySelectorAll('input[name="facility"]')
    .forEach(input => {
      input.checked = area
        ? area.facilities.includes(input.value)
        : true;
    });

  page.classList.add("hidden");
  editor.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// KEMBALI KE DAFTAR
function closeEditor() {
  editor.classList.add("hidden");
  page.classList.remove("hidden");

  renderAreas();
}

// PENCARIAN
$("#searchInput").addEventListener("input", () => {
  $("#clearSearch").style.display =
    $("#searchInput").value ? "block" : "none";

  renderAreas();
});

// HAPUS PENCARIAN
$("#clearSearch").addEventListener("click", () => {
  $("#searchInput").value = "";
  $("#clearSearch").style.display = "none";

  renderAreas();
});

// BUKA FILTER
$("#filterButton").addEventListener("click", () => {
  $("#filterPopover").classList.toggle("hidden");
});

// FILTER STATUS
document
  .querySelectorAll('input[name="statusFilter"]')
  .forEach(input => {
    input.addEventListener("change", () => {
      filterStatus = input.value;

      $("#filterPopover").classList.add("hidden");

      renderAreas();
    });
  });

// TOMBOL TAMBAH AREA
$("#addAreaButton").addEventListener("click", () => {
  openEditor();
});

$("#bottomAddButton").addEventListener("click", () => {
  openEditor();
});


// TOMBOL KEMBALI DAN BATAL
$("#editorBack").addEventListener("click", closeEditor);
$("#cancelEdit").addEventListener("click", closeEditor);

$("#backButton").addEventListener("click", () => {
  showToast("Anda berada di halaman Kelola Area Camping.");
});



// TOMBOL EDIT PADA SETIAP KARTU
list.addEventListener("click", event => {
  const button = event.target.closest("[data-edit]");

  if (button) {
    openEditor(Number(button.dataset.edit));
  }
});

/* OTOMATIS MENGISI NAMA BLOK CAMPERVAN */
$("#areaName").addEventListener("change", event => {
  if (
    event.target.value === "Campervan" &&
    !$("#areaBlock").value.trim()
  ) {
    $("#areaBlock").value = "Campervan";
  }
});


// SIMPAN DATA TAMBAH / EDIT
$("#areaForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("#areaName").value.trim();
 
  if (!name) return;

  const facilities = [
    ...document.querySelectorAll(
      'input[name="facility"]:checked'
    )
  ].map(input => input.value);


const data = {
  name: $("#areaBlock").value.trim(),
  type: $("#areaName").value.trim(),
  capacity: Math.max(
    1,
    Number($("#areaCapacity").value) || 1
  ),
  facilities,
  status: $("#areaStatus").value,
  description: $("#areaDescription").value.trim(),
  photo: $("#previewImage").getAttribute("src") || ""
};

if (!data.name || !data.type) {
  showToast("Nama Area dan Nama Blok wajib diisi.");
  return;
}


  if (editingId !== null) {
    const index = areas.findIndex(
      area => area.id === editingId
    );

    if (index !== -1) {
      areas[index] = {
        ...areas[index],
        ...data
      };
    }

    showToast("Perubahan area berhasil disimpan.");
  } else {
    const nextId =
      Math.max(0, ...areas.map(area => area.id)) + 1;

    areas.push({
      ...data,
      id: nextId
    });

    showToast("Area baru berhasil ditambahkan.");
  }

  
  if (editingId !== null) {
    const index = areas.findIndex(
      area => area.id === editingId
    );

    if (index !== -1) {
      areas[index] = {
        ...areas[index],
        ...data
      };
    }

    showToast("Perubahan area berhasil disimpan.");
  } else {
    const nextId =
      Math.max(0, ...areas.map(area => area.id)) + 1;

    areas.push({
      ...data,
      id: nextId
    });

    showToast("Area baru berhasil ditambahkan.");
  }

  // SIMPAN DATA KE LOCALSTORAGE
  if (!saveAreasToStorage()) return;

  closeEditor();
});

// TAMPILKAN DATA SAAT HALAMAN DIBUKA
renderAreas();
