document.addEventListener('DOMContentLoaded', () => {
    // 1. Mengambil elemen menu "Booking Villa" berdasarkan ID
    const menuBooking = document.getElementById('menu-booking');

    if (menuBooking) {
        // Menambahkan event listener saat diklik
        menuBooking.addEventListener('click', () => {
            // Mengarahkan ke halaman Daftar Booking
            // (Asumsi nama file halaman berikutnya adalah 'booking-list.html')
            window.location.href = 'booking-list.html';
        });
    }

    // (Opsional) Memberikan efek interaktif ke semua menu operasional lainnya
    const allMenus = document.querySelectorAll('.menu-card');
    allMenus.forEach(menu => {
        // Jika menu yang diklik BUKAN menu Booking Villa (yang sudah punya link di atas)
        if (menu.id !== 'menu-booking') {
            menu.addEventListener('click', () => {
                // Menampilkan alert sementara untuk menu yang belum dibuatkan halamannya
                alert('Fitur "' + menu.querySelector('h4').innerText + '" sedang dalam tahap pengembangan.');
            });
        }
    });
});