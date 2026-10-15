document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Logika Tombol Kembali (Navigasi mundur ke Daftar Booking)
    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            // Mengarahkan ke file index.html di dalam folder "Daftar Booking"
            // (Sesuaikan nama file ini apabila Anda menggunakan nama daftar-booking.html)
            window.location.href = '../Daftar Booking/index.html';
        });
    }

    // 2. Logika Tombol Detail Invoice
    const btnInvoice = document.getElementById('btn-invoice');
    if (btnInvoice) {
        btnInvoice.addEventListener('click', () => {
            alert('Fitur Detail Invoice sedang dalam tahap pengembangan.');
        });
    }

    // 3. Logika Tombol Konfirmasi
    const btnConfirm = document.getElementById('btn-confirm');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
            // Simulasi konfirmasi pesanan
            const isConfirmed = confirm('Apakah Anda yakin ingin mengkonfirmasi pesanan ini?');
            
            if (isConfirmed) {
                alert('Pesanan atas nama Alya Fitriani berhasil dikonfirmasi!');
                // Mengubah warna tombol untuk memberikan feedback visual
                btnConfirm.style.backgroundColor = '#388E3C';
                btnConfirm.style.borderColor = '#388E3C';
                btnConfirm.innerText = 'Terkonfirmasi \u2713'; // Simbol centang
                btnConfirm.disabled = true;
                btnConfirm.style.cursor = 'not-allowed';
            }
        });
    }
});