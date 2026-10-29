document.addEventListener("DOMContentLoaded", function() {

    // --- 1. INTEGRASI NAVIGASI NOTIFIKASI DARI IKON LONCENG ---
    const btnNotification = document.getElementById("btnNotification");
    
    if (btnNotification) {
        btnNotification.addEventListener("click", function() {
            window.location.href = "../Notifikasi/notifikasi.html";
        });
    }

    // --- 2. PEMILIH TANGGAL FUNGSIONAL (DATE PICKER PREVIEW) ---
    const datePickerBtn = document.getElementById("datePickerBtn");
    const datePickerInput = document.getElementById("datePickerInput");
    const displayDate = document.getElementById("displayDate");

    if (datePickerBtn && datePickerInput) {
        datePickerBtn.addEventListener("click", function() {
            try {
                datePickerInput.showPicker();
            } catch (error) {
                datePickerInput.focus();
                datePickerInput.click();
            }
        });

        datePickerInput.addEventListener("change", function() {
            if (this.value) {
                const selectedDate = new Date(this.value);
                const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
                displayDate.textContent = selectedDate.toLocaleDateString('id-ID', options);
            }
        });
    }

    // --- 3. PROSES DATA BOOKING UNTUK STATISTIK ---
    function updateBookingMetrics() {
        const storedBooking = localStorage.getItem("daftarBooking");
        let bookingList = [];

        if (storedBooking) {
            try { bookingList = JSON.parse(storedBooking); } catch (e) { bookingList = []; }
        }

        const statToday = document.getElementById("statToday");
        const statUpcoming = document.getElementById("statUpcoming");
        const statTotal = document.getElementById("statTotal");

        if (!bookingList || bookingList.length === 0) {
            if (statToday) statToday.textContent = "0";
            if (statUpcoming) statUpcoming.textContent = "0";
            if (statTotal) statTotal.textContent = "0";
            return;
        }

        const todayStr = new Date().toISOString().split("T")[0];
        let countToday = 0;
        let countUpcoming = 0;

        bookingList.forEach(item => {
            if (item.tanggalCheckIn === todayStr) {
                countToday++;
            } else if (new Date(item.tanggalCheckIn) > new Date()) {
                countUpcoming++;
            }
        });

        if (statToday) statToday.textContent = countToday;
        if (statUpcoming) statUpcoming.textContent = countUpcoming;
        if (statTotal) statTotal.textContent = bookingList.length;
    }

    updateBookingMetrics();

    // --- 4. PEMILIH BULAN GRAFIK FUNGSIONAL ---
    const selectMonth = document.getElementById("selectMonth");
    const lineOrange = document.getElementById("lineOrange");
    const lineGreen = document.getElementById("lineGreen");

    if (selectMonth) {
        selectMonth.addEventListener("change", function() {
            const selectedMonth = parseInt(this.value);
            
            if (selectedMonth % 2 === 0) {
                if (lineOrange) lineOrange.setAttribute("points", "45,95 120,70 195,90 270,35");
                if (lineGreen) lineGreen.setAttribute("points", "45,75 120,50 195,60 270,15");
            } else {
                if (lineOrange) lineOrange.setAttribute("points", "45,108 120,80 195,85 270,45");
                if (lineGreen) lineGreen.setAttribute("points", "45,85 120,60 195,50 270,20");
            }
        });
    }

    // --- 5. INTEGRASI ROUTING MENU (Sesuai Struktur) ---
    const btnKelolaMenu = document.getElementById("btnKelolaMenu");
    if (btnKelolaMenu) {
        btnKelolaMenu.addEventListener("click", function() {
            window.location.href = "../Kelola Menu/kelola-menu.html"; 
        });
    }

    const btnKelolaArea = document.getElementById("btnKelolaArea");
    if (btnKelolaArea) {
        btnKelolaArea.addEventListener("click", function() {
            window.location.href = "../Kelola Blok/kelola-blok.html"; 
        });
    }

    const btnLaporan = document.getElementById("btnLaporan");
    if (btnLaporan) {
        btnLaporan.addEventListener("click", function() {
            window.location.href = "../Daftar Booking/daftar-booking.html"; 
        });
    }

});