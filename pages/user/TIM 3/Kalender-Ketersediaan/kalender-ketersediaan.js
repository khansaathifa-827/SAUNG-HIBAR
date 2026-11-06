  const filterPanel = document.getElementById("filterPanel");
      const closeButton = document.getElementById("closeButton");
      const reopenButton = document.getElementById("reopenButton");
      const filterForm = document.getElementById("filterForm");
      const resetButton = document.getElementById("resetButton");
      const filterMessage = document.getElementById("filterMessage");
      const statusButtons = document.querySelectorAll(".status-option");

      const tanggalMulai = document.getElementById("tanggalMulai");
      const tanggalSelesai = document.getElementById("tanggalSelesai");
      const area = document.getElementById("area");
      const blok = document.getElementById("blok");

      function buatDropdownCustom(select) {
        const container = document.createElement("div");
        container.className = "custom-select";

        const tombol = document.createElement("button");
        tombol.type = "button";
        tombol.className = "custom-select-button";
        tombol.setAttribute("aria-expanded", "false");

        const teks = document.createElement("span");
        const panah = document.createElement("span");
        panah.className = "custom-select-arrow";

        tombol.append(teks, panah);

        const daftar = document.createElement("div");
        daftar.className = "custom-select-options";

        container.append(tombol, daftar);
        select.parentElement.appendChild(container);

        function tutupDropdown() {
          daftar.classList.remove("show");
          tombol.setAttribute("aria-expanded", "false");
        }

        function perbarui() {
          teks.textContent =
            select.options[select.selectedIndex]?.text || "Pilih";

          daftar.replaceChildren();

          Array.from(select.options).forEach(function (option) {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "custom-select-option";
            item.textContent = option.text;
            item.classList.toggle("selected", option.value === select.value);

            item.addEventListener("click", function () {
              select.value = option.value;
              select.dispatchEvent(
                new Event("change", {
                  bubbles: true,
                }),
              );

              perbarui();
              tutupDropdown();
            });

            daftar.appendChild(item);
          });
        }

        tombol.addEventListener("click", function () {
          const akanDibuka = !daftar.classList.contains("show");

          document
            .querySelectorAll(".custom-select-options")
            .forEach(function (menu) {
              menu.classList.remove("show");
            });

          document
            .querySelectorAll(".custom-select-button")
            .forEach(function (button) {
              button.setAttribute("aria-expanded", "false");
            });

          if (akanDibuka) {
            daftar.classList.add("show");
            tombol.setAttribute("aria-expanded", "true");
          }
        });

        select.addEventListener("change", perbarui);

        perbarui();

        return perbarui;
      }

      const perbaruiArea = buatDropdownCustom(area);
      const perbaruiBlok = buatDropdownCustom(blok);

      document.addEventListener("click", function (event) {
        if (!event.target.closest(".custom-select")) {
          document
            .querySelectorAll(".custom-select-options")
            .forEach(function (menu) {
              menu.classList.remove("show");
            });

          document
            .querySelectorAll(".custom-select-button")
            .forEach(function (button) {
              button.setAttribute("aria-expanded", "false");
            });
        }
      });

      let statusTerpilih = "Semua";

      const pilihRentangTanggal = document.getElementById(
        "pilihRentangTanggal",
      );

      const datePickerPopup = document.getElementById("datePickerPopup");

      const teksTanggal = document.getElementById("teksTanggal");

      const selesaiPilihTanggal = document.getElementById(
        "selesaiPilihTanggal",
      );

      // Buka dan tutup dropdown tanggal
      pilihRentangTanggal.addEventListener("click", function () {
        const sedangTerbuka = !datePickerPopup.hidden;

        datePickerPopup.hidden = sedangTerbuka;

        pilihRentangTanggal.setAttribute(
          "aria-expanded",
          String(!sedangTerbuka),
        );
      });

      // Format tanggal ke bahasa Indonesia
      function formatTanggal(tanggal) {
        if (!tanggal) return "";

        return new Date(tanggal + "T00:00:00").toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }

      // Perbarui tampilan rentang tanggal
      function perbaruiRentangTanggal() {
        if (!tanggalMulai.value || !tanggalSelesai.value) {
          teksTanggal.textContent = "Pilih tanggal kunjungan";
          return;
        }

        teksTanggal.textContent =
          formatTanggal(tanggalMulai.value) +
          " → " +
          formatTanggal(tanggalSelesai.value);
      }

      // Setelah check-in dipilih, lanjut ke check-out
      tanggalMulai.addEventListener("change", function () {
        tanggalSelesai.min = tanggalMulai.value;

        if (tanggalSelesai.value && tanggalSelesai.value < tanggalMulai.value) {
          tanggalSelesai.value = tanggalMulai.value;
        }

        perbaruiRentangTanggal();
        tanggalSelesai.focus();
      });

      // Perbarui teks saat check-out berubah
      tanggalSelesai.addEventListener("change", perbaruiRentangTanggal);

      // Tombol selesai menutup dropdown
      selesaiPilihTanggal.addEventListener("click", function () {
        if (
          tanggalMulai.value &&
          tanggalSelesai.value &&
          tanggalSelesai.value < tanggalMulai.value
        ) {
          alert("Tanggal check-out tidak boleh sebelum check-in.");
          return;
        }

        perbaruiRentangTanggal();
        datePickerPopup.hidden = true;

        pilihRentangTanggal.setAttribute("aria-expanded", "false");
      });

      // Tampilkan tanggal awal saat halaman dibuka
      tanggalSelesai.min = tanggalMulai.value;
      perbaruiRentangTanggal();

      // Memilih satu status booking
      statusButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          statusTerpilih = button.dataset.status;

          statusButtons.forEach(function (item) {
            const isActive = item === button;

            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
          });
        });
      });

      // Menyesuaikan pilihan blok berdasarkan area
      area.addEventListener("change", function () {
        const pilihanBlok = {
          "": [
            ["", "Semua Blok"],
            ["Blok A1", "Blok A1"],
            ["Blok A2", "Blok A2"],
            ["Blok B1", "Blok B1"],
            ["Blok B2", "Blok B2"],
          ],
          "Area A": [
            ["", "Semua Blok"],
            ["Blok A1", "Blok A1"],
            ["Blok A2", "Blok A2"],
          ],
          "Area B": [
            ["", "Semua Blok"],
            ["Blok B1", "Blok B1"],
            ["Blok B2", "Blok B2"],
          ],
          "Area C": [["", "Semua Blok"]],
        };

        const pilihan = pilihanBlok[area.value] || pilihanBlok[""];

        blok.replaceChildren();

        pilihan.forEach(function (item) {
          const option = document.createElement("option");
          option.value = item[0];
          option.textContent = item[1];
          blok.appendChild(option);
        });
        perbaruiBlok();
      });
      const dataBooking = [
  {
    kode: "BK001",
    nama: "Andi Saputra",
    checkIn: "2026-10-09",
    checkOut: "2026-10-12",
    area: "Area A",
    blok: "Blok A1",
    status: "Pending",
  },
  {
    kode: "BK002",
    nama: "Siti Amelia",
    checkIn: "2026-10-10",
    checkOut: "2026-10-13",
    area: "Area A",
    blok: "Blok A2",
    status: "Check-in",
  },
  {
    kode: "BK003",
    nama: "Budi Pratama",
    checkIn: "2026-10-09",
    checkOut: "2026-10-11",
    area: "Area B",
    blok: "Blok B1",
    status: "Check-out",
  },
  {
    kode: "BK004",
    nama: "Dina Putri",
    checkIn: "2026-10-11",
    checkOut: "2026-10-14",
    area: "Area B",
    blok: "Blok B2",
    status: "Selesai",
  },
  {
    kode: "BK005",
    nama: "Rizky Maulana",
    checkIn: "2026-10-12",
    checkOut: "2026-10-15",
    area: "Area A",
    blok: "Blok A1",
    status: "Dibatalkan",
  },
];

      // Terapkan filter
filterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (
    tanggalMulai.value &&
    tanggalSelesai.value &&
    tanggalSelesai.value < tanggalMulai.value
  ) {
    filterMessage.textContent =
      "Tanggal selesai tidak boleh sebelum tanggal mulai.";
    filterMessage.classList.add("show");
    return;
  }

  const hasilFilter = dataBooking.filter(function (booking) {
    const cocokStatus =
      statusTerpilih === "Semua" ||
      booking.status === statusTerpilih;

    const cocokTanggal =
      (!tanggalMulai.value ||
        booking.checkOut >= tanggalMulai.value) &&
      (!tanggalSelesai.value ||
        booking.checkIn <= tanggalSelesai.value);

    const cocokArea =
      area.value === "" || booking.area === area.value;

    const cocokBlok =
      blok.value === "" || booking.blok === blok.value;

    return (
      cocokStatus &&
      cocokTanggal &&
      cocokArea &&
      cocokBlok
    );
  });

  // Tampilkan kartu booking beserta badge statusnya
  tampilkanBooking(hasilFilter);

  filterMessage.textContent =
    `Filter diterapkan. Ditemukan ${hasilFilter.length} booking.`;
  filterMessage.classList.add("show");
});

      // Reset seluruh filter
      resetButton.addEventListener("click", function () {
        statusTerpilih = "Semua";

        statusButtons.forEach(function (button) {
          const isActive = button.dataset.status === "Semua";

          button.classList.toggle("active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });

        tanggalMulai.value = "2026-10-09";
        tanggalSelesai.value = "2026-10-12";
        area.value = "";
        area.dispatchEvent(new Event("change"));
        blok.value = "";

        filterMessage.textContent = "";
        filterMessage.classList.remove("show");
      });

      // Tutup panel filter
      closeButton.addEventListener("click", function () {
        filterPanel.classList.add("closed");
        reopenButton.classList.add("show");
      });

      // Buka kembali panel filter
      reopenButton.addEventListener("click", function () {
        filterPanel.classList.remove("closed");
        reopenButton.classList.remove("show");
      });

function buatKartuBooking(booking) {
  const kartu = document.createElement("article");
  kartu.className = "booking-card";

  const info = document.createElement("div");
  info.className = "booking-info";

  const judul = document.createElement("h3");
  judul.textContent = `${booking.kode} · ${booking.nama}`;

  const tanggal = document.createElement("p");
  tanggal.textContent =
    `${booking.checkIn} – ${booking.checkOut}`;

  const lokasi = document.createElement("p");
  lokasi.textContent =
    `${booking.area} · ${booking.blok}`;

  // Badge status di sebelah kanan kartu
  const status = document.createElement("span");
  status.className =
    "booking-status status-" +
    booking.status.toLowerCase().replace(/\s+/g, "-");

  status.textContent = booking.status;

  info.append(judul, tanggal, lokasi);

  // Pastikan badge menjadi elemen kedua di dalam kartu
  kartu.append(info, status);

  return kartu;
}

function tampilkanBooking(data) {
  const daftar = document.getElementById("daftarBooking");
  const jumlah = document.getElementById("jumlahBooking");
  const kosong = document.getElementById("bookingKosong");

  daftar.replaceChildren();

  data.forEach((booking) => {
    daftar.appendChild(buatKartuBooking(booking));
  });

  jumlah.textContent = `${data.length} booking`;
  kosong.hidden = data.length > 0;
}
