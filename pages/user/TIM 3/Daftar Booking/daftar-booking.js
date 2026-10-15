document.addEventListener('DOMContentLoaded', () => {
    
    // Logika Navigasi Kembali ke Dashboard
    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            window.location.href = '../Dashboard/dashboard.html';
        });
    }

    // Logika Navigasi ke Detail Booking
    const detailButtons = document.querySelectorAll('.btn-detail');
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = '../Detail Booking/detail-booking.html';
        });
    });

    // Logika Sederhana untuk Tab Filter Aktif
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});