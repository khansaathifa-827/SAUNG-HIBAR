
// ================================================
// SAUNG HIBAR - JAVASCRIPT EKSTERNAL
// TANPA BOOTSTRAP
// ================================================


// ================================================
// 1. HAMBURGER MENU
// ================================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Buka atau tutup menu hamburger
menuToggle.addEventListener("click", function() {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});

// Tutup menu ketika salah satu link diklik
navLinks.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// ================================================
// 2. MENGAMBIL ELEMEN HTML
// ================================================

const modal = document.getElementById("bookingModal");

const closeModalButton = document.getElementById("closeModal");

const bookingForm = document.getElementById("bookingForm");

const selectedPackage = document.getElementById("selectedPackage");

const guestCount = document.getElementById("guestCount");

const bookingDate = document.getElementById("bookingDate");

const totalPrice = document.getElementById("totalPrice");

const bookingResult = document.getElementById("bookingResult");

const modalAddonSummary = document.getElementById("modalAddonSummary");

const addonItems = document.querySelectorAll(".addon-item");

const bookingButtons = document.querySelectorAll(".booking-btn");

// Menyimpan harga paket yang dipilih
let packagePrice = 0;

// Menyimpan tombol sebelum popup dibuka
let previousFocus = null;


// ================================================
// 3. FORMAT ANGKA MENJADI RUPIAH
// ================================================

function rupiah(number) {

    return "Rp " + Number(number).toLocaleString("id-ID");

}


// ================================================
// 4. MEMILIH ADD-ONS
// ================================================

// Klik sekali: memilih add-on.
// Klik lagi: membatalkan.
// Double-click: memastikan pilihan dibatalkan.

addonItems.forEach(function(item) {

    item.addEventListener("click", function() {

        // Mengubah status pilihan
        const isSelected = item.classList.toggle("is-selected");

        // Memperbarui atribut tombol
        item.setAttribute(
            "aria-pressed",
            String(isSelected)
        );

        // Memperbarui ringkasan add-on
        updateAddonSummary();

        // Memperbarui harga
        calculateTotal();

    });


    // Double-click untuk membatalkan add-on
    item.addEventListener("dblclick", function() {

        // Hapus pilihan
        item.classList.remove("is-selected");

        item.setAttribute(
            "aria-pressed",
            "false"
        );

        updateAddonSummary();

        calculateTotal();

    });

});


// ================================================
// 5. MENGAMBIL ADD-ONS YANG DIPILIH
// ================================================

function getSelectedAddons() {

    return Array.from(
        document.querySelectorAll(".addon-item.is-selected")
    );

}


// ================================================
// 6. MENGHITUNG HARGA TAMBAHAN
// ================================================

function calculateAddonCost() {

    const selected = getSelectedAddons();

    // Jumlah orang minimal 1
    const persons = Math.max(
        1,
        Number(guestCount.value) || 1
    );

    let addonTotal = 0;

    selected.forEach(function(item) {

        // Ambil harga dari atribut data-price
        const price = Number(item.dataset.price);

        // Jika harga dihitung per orang
        if (item.dataset.perPerson === "true") {

            addonTotal += price * persons;

        } else {

            // Harga add-on biasa
            addonTotal += price;

        }

    });

    return addonTotal;

}


// ================================================
// 7. RINGKASAN ADD-ONS YANG DIPILIH
// ================================================

function updateAddonSummary() {

    const selected = getSelectedAddons();

    // Jika belum memilih add-on
    if (selected.length === 0) {

        modalAddonSummary.textContent =
            "Belum ada add-on dipilih";

        return;

    }

    // Mengambil nama semua add-on
    const names = selected.map(function(item) {

        return item.dataset.name;

    });

    // Menampilkan nama add-on
    modalAddonSummary.textContent = names.join(", ");

}


// ================================================
// 8. MENGHITUNG TOTAL HARGA BOOKING
// ================================================

function calculateTotal() {

    // Harga paket + harga layanan tambahan
    const total = packagePrice + calculateAddonCost();

    // Menampilkan total dalam Rupiah
    totalPrice.textContent = rupiah(total);

    return total;

}


// ================================================
// 9. MEMBUKA POPUP BOOKING
// ================================================

bookingButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Simpan posisi fokus
        previousFocus = document.activeElement;

        // Reset formulir booking
        bookingForm.reset();

        // Sembunyikan ringkasan lama
        bookingResult.hidden = true;
        bookingResult.textContent = "";

        // Mengambil nama paket yang diklik
        selectedPackage.value = button.dataset.paket;

        // Mengambil harga paket yang diklik
        packagePrice = Number(button.dataset.harga);

        // Memperbarui pilihan add-on
        updateAddonSummary();

        // Hitung estimasi total
        calculateTotal();

        // Tampilkan popup
        modal.hidden = false;

        // Cegah scroll halaman belakang
        document.body.classList.add("modal-open");

        // Fokus ke nama pemesan
        document.getElementById("guestName").focus();

    });

});


// ================================================
// 10. MENUTUP POPUP BOOKING
// ================================================

function closeBookingModal() {

    // Sembunyikan popup
    modal.hidden = true;

    // Aktifkan scroll kembali
    document.body.classList.remove("modal-open");

    // Kembalikan fokus ke tombol sebelumnya
    if (previousFocus) {

        previousFocus.focus();

    }

}


// Tombol X untuk menutup popup
closeModalButton.addEventListener(
    "click",
    closeBookingModal
);


// Klik area luar popup untuk menutup
modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        closeBookingModal();

    }

});


// Tombol Escape untuk menutup popup
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape" && !modal.hidden) {

        closeBookingModal();

    }

});


// ================================================
// 11. UPDATE HARGA SAAT JUMLAH ORANG BERUBAH
// ================================================

guestCount.addEventListener("input", function() {

    calculateTotal();

});


// ================================================
// 12. TANGGAL MINIMAL BOOKING H-3
// ================================================

// Mengambil tanggal hari ini
const minDate = new Date();

// Menambah 3 hari
minDate.setDate(minDate.getDate() + 3);

// Mengambil tahun
const year = minDate.getFullYear();

// Mengambil bulan
const month = String(
    minDate.getMonth() + 1
).padStart(2, "0");

// Mengambil tanggal
const day = String(
    minDate.getDate()
).padStart(2, "0");

// Menentukan tanggal minimal
bookingDate.min = `${year}-${month}-${day}`;


// ================================================
// 13. MEMBUAT RINGKASAN BOOKING
// ================================================

bookingForm.addEventListener("submit", function(event) {

    // Mencegah halaman refresh
    event.preventDefault();

    // Validasi semua kolom
    if (!bookingForm.reportValidity()) {

        return;

    }

    // Mengambil nama pemesan
    const name = document
        .getElementById("guestName")
        .value.trim();

    // Mengambil jumlah tamu
    const persons = Number(guestCount.value);

    // Mengambil tanggal
    const date = bookingDate.value;

    // Mengambil add-on yang dipilih
    const addons = getSelectedAddons();

    // Nama layanan tambahan
    const addonNames = addons.length > 0

        ? addons.map(function(item) {
            return item.dataset.name;
        }).join(", ")

        : "Tidak ada";

    // Menghitung total booking
    const total = calculateTotal();

    // Membuat teks hasil booking
    bookingResult.textContent =

        "Ringkasan Booking Berhasil Dibuat!\n\n" +

        "Nama Pemesan: " + name + "\n" +

        "Paket: " + selectedPackage.value + "\n" +

        "Tanggal Kunjungan: " + date + "\n" +

        "Jumlah Orang: " + persons + "\n" +

        "Layanan Tambahan: " + addonNames + "\n" +

        "Estimasi Total: " + rupiah(total) + "\n\n" +

        "Terima kasih sudah memilih Saung Hibar!\n" +

        "Ini masih simulasi booking dan belum dikirim ke pengelola.";

    // Menampilkan hasil
    bookingResult.hidden = false;

});
