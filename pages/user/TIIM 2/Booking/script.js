
// ================================================
// SAUNG HIBAR - JAVASCRIPT FINAL
// HTML CSS JS EKSTERNAL
// ================================================


// ================================================
// 1. NOMOR WHATSAPP ADMIN
// ================================================

// Ganti dengan nomor resmi Saung Hibar.
// Format: 62 diikuti nomor tanpa angka 0 di depan.
// Contoh format: 6281234567890

const adminWhatsApp = "";


// ================================================
// 2. HAMBURGER MENU NAVBAR
// ================================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});

navLinks.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// ================================================
// 3. MENGAMBIL ELEMEN HTML
// ================================================

const addonItems = document.querySelectorAll(".addon-item");

const bookingButtons = document.querySelectorAll(".booking-btn");

const reservationOverlay =
    document.getElementById("reservationOverlay");

const closeReservationBtn =
    document.getElementById("closeReservationBtn");

const formView = document.getElementById("formView");

const successView = document.getElementById("successView");

const reservationForm =
    document.getElementById("reservationForm");

const fullName = document.getElementById("fullName");

const phoneNumber = document.getElementById("phoneNumber");

const emailAddress = document.getElementById("emailAddress");

const visitDateInput =
    document.getElementById("visitDateInput");

const guestCountInput =
    document.getElementById("guestCountInput");

const saungTypeSelect =
    document.getElementById("saungTypeSelect");

const menuPackageSelect =
    document.getElementById("menuPackageSelect");

const specialNote = document.getElementById("specialNote");

const selectedPackageText =
    document.getElementById("selectedPackageText");

const selectedAddonText =
    document.getElementById("selectedAddonText");

const selectedTotalText =
    document.getElementById("selectedTotalText");

const whatsappLink = document.getElementById("whatsappLink");

const backToHomeBtn =
    document.getElementById("backToHomeBtn");


// ================================================
// 4. DATA HARGA PAKET
// ================================================

const packagePrices = {
    "Paket Reguler": 150000,
    "Paket Keluarga": 350000,
    "Paket Acara / Gathering": 750000,
    "Paket Ulang Tahun": 600000
};

let packagePrice = 0;

let selectedPackageName = "";

let previousFocus = null;


// ================================================
// 5. FORMAT HARGA RUPIAH
// ================================================

function rupiah(number) {

    return "Rp " + Number(number).toLocaleString("id-ID");

}


// ================================================
// 6. MEMILIH ADD-ONS
// ================================================

addonItems.forEach(function(item) {

    // Klik untuk memilih atau membatalkan
    item.addEventListener("click", function() {

        const isSelected =
            item.classList.toggle("is-selected");

        item.setAttribute(
            "aria-pressed",
            String(isSelected)
        );

        updateReservationSummary();

    });

    // Double-click memastikan pilihan dibatalkan
    item.addEventListener("dblclick", function() {

        item.classList.remove("is-selected");

        item.setAttribute("aria-pressed", "false");

        updateReservationSummary();

    });

});


// ================================================
// 7. MENGAMBIL ADD-ON TERPILIH
// ================================================

function getSelectedAddons() {

    return Array.from(
        document.querySelectorAll(".addon-item.is-selected")
    );

}


// ================================================
// 8. MENGHITUNG BIAYA ADD-ON
// ================================================

function calculateAddonCost() {

    const selected = getSelectedAddons();

    const persons = Math.max(
        1,
        Number(guestCountInput.value) || 1
    );

    let addonTotal = 0;

    selected.forEach(function(item) {

        const price = Number(item.dataset.price);

        if (item.dataset.perPerson === "true") {

            addonTotal += price * persons;

        } else {

            addonTotal += price;

        }

    });

    return addonTotal;

}


// ================================================
// 9. DAFTAR ADD-ON YANG DIPILIH
// ================================================

function getAddonNames() {

    const selected = getSelectedAddons();

    if (selected.length === 0) {

        return "Belum ada add-on dipilih";

    }

    return selected.map(function(item) {

        return item.dataset.name;

    }).join(", ");

}


// ================================================
// 10. HITUNG TOTAL
// ================================================

function calculateTotal() {

    return packagePrice + calculateAddonCost();

}


// ================================================
// 11. UPDATE RINGKASAN RESERVASI
// ================================================

function updateReservationSummary() {

    selectedPackageText.textContent =
        selectedPackageName || "-";

    selectedAddonText.textContent = getAddonNames();

    selectedTotalText.textContent = rupiah(calculateTotal());

}


// ================================================
// 12. MEMBUKA FORM BOOKING
// ================================================

bookingButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        previousFocus = document.activeElement;

        // Nama dan harga paket yang diklik
        selectedPackageName = button.dataset.paket;

        packagePrice = Number(button.dataset.harga);

        // Kosongkan form sebelumnya
        reservationForm.reset();

        // Isi dropdown sesuai paket yang diklik
        saungTypeSelect.value = selectedPackageName;

        // Tampilkan form, sembunyikan sukses
        formView.hidden = false;
        successView.hidden = true;

        updateReservationSummary();

        // Tampilkan overlay
        reservationOverlay.hidden = false;

        document.body.classList.add("modal-open");

        // Scroll panel mulai dari atas
        document.querySelector(".reservation-panel")
            .scrollTop = 0;

        // Fokus ke kolom nama
        fullName.focus();

    });

});


// ================================================
// 13. MENUTUP FORM BOOKING
// ================================================

function closeReservationOverlay() {

    reservationOverlay.hidden = true;

    document.body.classList.remove("modal-open");

    if (previousFocus) {

        previousFocus.focus();

    }

}


// Tombol kembali
closeReservationBtn.addEventListener(
    "click",
    closeReservationOverlay
);


// Klik luar form
reservationOverlay.addEventListener("click", function(event) {

    if (event.target === reservationOverlay) {

        closeReservationOverlay();

    }

});


// Tekan tombol Escape
document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        !reservationOverlay.hidden
    ) {

        closeReservationOverlay();

    }

});


// ================================================
// 14. TANGGAL MINIMAL H-3
// ================================================

const minDate = new Date();

minDate.setDate(minDate.getDate() + 3);

const year = minDate.getFullYear();

const month = String(
    minDate.getMonth() + 1
).padStart(2, "0");

const day = String(
    minDate.getDate()
).padStart(2, "0");

visitDateInput.min = `${year}-${month}-${day}`;


// ================================================
// 15. UPDATE HARGA JUMLAH TAMU
// ================================================

guestCountInput.addEventListener("input", function() {

    updateReservationSummary();

});


// ================================================
// 16. UPDATE JENIS PAKET
// ================================================

saungTypeSelect.addEventListener("change", function() {

    selectedPackageName = saungTypeSelect.value;

    packagePrice = packagePrices[selectedPackageName] || 0;

    updateReservationSummary();

});


// ================================================
// 17. SUBMIT FORM BOOKING
// ================================================

reservationForm.addEventListener("submit", function(event) {

    // Mencegah refresh halaman
    event.preventDefault();

    // Validasi form
    if (!reservationForm.reportValidity()) {

        return;

    }

    // Nama lengkap
    const name = fullName.value.trim();

    // Nomor telepon pemesan
    const phone = phoneNumber.value.trim();

    // Email
    const email = emailAddress.value.trim() || "-";

    // Tanggal
    const date = visitDateInput.value;

    // Jumlah tamu
    const guestCount = guestCountInput.value;

    // Jenis saung
    const saungType = saungTypeSelect.value;

    // Menu makanan
    const menuPackage =
        menuPackageSelect.value || "Tidak memilih";

    // Catatan
    const notes = specialNote.value.trim() || "-";

    // Add-ons
    const addonNames = getAddonNames();

    // Total harga
    const total = rupiah(calculateTotal());


    // ============================================
    // MENYUSUN PESAN WHATSAPP
    // ============================================

    const message =

        "Halo Admin Saung Hibar!\n\n" +

        "Saya ingin melakukan konfirmasi booking.\n\n" +

        "Nama: " + name + "\n" +

        "Nomor WhatsApp: " + phone + "\n" +

        "Email: " + email + "\n" +

        "Tanggal Kunjungan: " + date + "\n" +

        "Jumlah Tamu: " + guestCount + "\n" +

        "Jenis Saung: " + saungType + "\n" +

        "Menu Makanan/Minuman: " + menuPackage + "\n" +

        "Layanan Tambahan: " + addonNames + "\n" +

        "Catatan: " + notes + "\n" +

        "Estimasi Total: " + total + "\n\n" +

        "Mohon informasi langkah konfirmasi selanjutnya.";


    // Mengubah pesan agar bisa digunakan pada URL
    const encodedMessage = encodeURIComponent(message);

    // Membuat link WhatsApp
    if (adminWhatsApp !== "") {

        whatsappLink.href =
            "https://wa.me/" +
            adminWhatsApp +
            "?text=" +
            encodedMessage;

    } else {

        whatsappLink.href = "#";

    }


    // ============================================
    // TAMPILKAN HALAMAN SUKSES
    // ============================================

    formView.hidden = true;

    successView.hidden = false;

    // Kembali ke bagian atas popup
    document.querySelector(".reservation-panel")
        .scrollTop = 0;

});


// ================================================
// 18. TOMBOL LANJUT KE WHATSAPP
// ================================================

whatsappLink.addEventListener("click", function(event) {

    // Kalau nomor admin belum dimasukkan
    if (adminWhatsApp === "") {

        event.preventDefault();

        alert(
            "Nomor WhatsApp admin belum diatur. " +
            "Silakan isi adminWhatsApp di script.js."
        );

        return;

    }

    // Membuka WhatsApp di tab baru
    whatsappLink.target = "_blank";

    whatsappLink.rel = "noopener noreferrer";

});


// ================================================
// 19. KEMBALI KE BERANDA
// ================================================

backToHomeBtn.addEventListener("click", function() {

    closeReservationOverlay();

    successView.hidden = true;

    formView.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
