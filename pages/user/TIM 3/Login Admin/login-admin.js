document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Logika untuk Sembunyikan/Tampilkan Password
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", function() {
            // Deteksi tipe input: ubah bolak-balik antara password/text
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                this.classList.replace("fa-eye-slash", "fa-eye");
            } else {
                passwordInput.type = "password";
                this.classList.replace("fa-eye", "fa-eye-slash");
            }
        });
    }

    // 2. Logika Penanganan Submit Form
    const formLogin = document.getElementById("formLoginAdmin");

    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            // Mencegah halaman me-refresh ketika tombol ditekan
            event.preventDefault(); 
            
            // Mengalihkan ke Halaman Dashboard secara langsung dalam satu direktori
            window.location.href = "../Dashboard/dashboard.html";
        });
    }

    // 3. Logika Integrasi Ikon Lonceng menuju Halaman Notifikasi
    const btnNotification = document.getElementById("btnNotification");
    
    if (btnNotification) {
        btnNotification.addEventListener("click", function() {
            // Navigasi langsung ke notifikasi.html dalam satu direktori
            window.location.href = "../Notifikasi/notifikasi.html";
        });
    }

});