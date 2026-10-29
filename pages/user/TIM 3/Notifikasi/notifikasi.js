document.addEventListener("DOMContentLoaded", function() {

    // --- 1. NAVIGASI KEMBALI KE DASHBOARD ---
    const btnBack = document.getElementById("btnBack");
    const btnBrand = document.getElementById("btnBrand");

    // Keluar dari folder Notifikasi, masuk ke folder Dashboard (Berdasarkan gambar struktur TIM 3)
    if (btnBack) {
        btnBack.addEventListener("click", function() {
            window.location.href = "../Dashboard/dashboard.html";
        });
    }
    if (btnBrand) {
        btnBrand.addEventListener("click", function() {
            window.location.href = "../Dashboard/dashboard.html";
        });
    }


    // --- 2. INTEGRASI IKON NOTIFIKASI ---
    // (Jika ditekan, reload ulang halaman notifikasi.html)
    const btnNotification = document.getElementById("btnNotification");
    if (btnNotification) {
        btnNotification.addEventListener("click", function() {
            window.location.href = "notifikasi.html";
        });
    }


    // --- 3. FILTER TAB KATEGORI NOTIFIKASI ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    const notifCards = document.querySelectorAll(".notification-card");
    const emptyState = document.getElementById("emptyState");

    tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Reset kelas 'active' pada semua tab
            tabButtons.forEach(btn => btn.classList.remove("active"));
            
            // Tambahkan 'active' pada tab yang ditekan
            this.classList.add("active");

            const selectedCategory = this.getAttribute("data-category");
            let visibleCount = 0;

            // Logika menampilkan atau menyembunyikan kartu notifikasi
            notifCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");

                if (selectedCategory === "semua" || cardCategory === selectedCategory) {
                    card.style.display = "flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            // Logika memunculkan pesan kosong
            if (emptyState) {
                emptyState.style.display = visibleCount === 0 ? "block" : "none";
            }
        });
    });

});