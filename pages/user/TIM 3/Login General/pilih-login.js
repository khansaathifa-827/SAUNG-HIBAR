document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Logika Klik Tombol Admin menuju Halaman Login Admin
    const btnAdmin = document.getElementById("btnAdmin");
    if (btnAdmin) {
        btnAdmin.addEventListener("click", function() {
            // Karena satu folder, panggil file langsung
            window.location.href = "../Login Admin/login-admin.html"; 
        });
    }

    // 2. Logika Integrasi Ikon Lonceng menuju Halaman Notifikasi
    const btnNotification = document.getElementById("btnNotification");
    if (btnNotification) {
        btnNotification.addEventListener("click", function() {
            // Navigasi langsung ke notifikasi.html
            window.location.href = "../Notifikasi/notifikasi.html";
        });
    }

});