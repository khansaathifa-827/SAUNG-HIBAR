document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // Mencegah halaman reload secara default (perilaku asli form)
            e.preventDefault(); 
            
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            // Validasi sederhana (pastikan input tidak kosong)
            if (usernameInput.trim() === "" || passwordInput.trim() === "") {
                alert("Harap masukkan Username/Email dan Password Anda.");
                return;
            }

            // Di sini nantinya Anda bisa menambahkan integrasi API/Backend.
            // Untuk sementara, kita langsung mengarahkan user ke halaman Dashboard
            window.location.href = '../Dashboard/dashboard.html';
        });
    }
});