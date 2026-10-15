// Data saung: nama, kapasitas, dan jumlah yang sudah terisi
var dataSaung = [
    { nama: "Tenda VIP 1", kapasitas: 20, terisi: 15 },
    { nama: "Tenda VIP 2", kapasitas: 20, terisi: 12 },
    { nama: "Tenda Reguler A", kapasitas: 10, terisi: 8 },
    { nama: "Tenda Reguler B", kapasitas: 10, terisi: 4 },
    { nama: "Tenda Reguler C", kapasitas: 5, terisi: 5 },
    { nama: "Tenda Reguler D", kapasitas: 5, terisi: 3 },
    { nama: "Tenda Keluarga 1", kapasitas: 15, terisi: 14 },
    { nama: "Tenda Keluarga 2", kapasitas: 15, terisi: 8 },
    { nama: "Tenda Premium", kapasitas: 40, terisi: 20 }
];

// Menentukan status berdasarkan persentase terisi
function tentukanStatus(persen) {
    if (persen >= 100) {
        return { kelas: "penuh", teks: "Penuh", ikon: "bi-x-circle" };
    } else if (persen >= 80) {
        return { kelas: "hampir", teks: "Hampir Penuh", ikon: "bi-exclamation-circle" };
    } else {
        return { kelas: "tersedia", teks: "Tersedia", ikon: "bi-check-circle" };
    }
}

var daftar = document.getElementById("daftarSaung");
var totalKapasitas = 0;
var totalTerisi = 0;

for (var i = 0; i < dataSaung.length; i++) {
    var saung = dataSaung[i];
    var sisa = saung.kapasitas - saung.terisi;
    var persen = Math.round((saung.terisi / saung.kapasitas) * 100);
    var status = tentukanStatus(persen);

    totalKapasitas += saung.kapasitas;
    totalTerisi += saung.terisi;

    daftar.innerHTML += `
        <div class="item">
            <div class="item-atas">
                <div>
                    <h3>${saung.nama}</h3>
                    <p>Kapasitas: ${saung.kapasitas} orang &bull; Sisa: ${sisa} orang</p>
                </div>
                <span class="status ${status.kelas}"><i class="bi ${status.ikon}"></i> ${status.teks}</span>
            </div>
            <div class="item-info">
                <span>Terisi: ${saung.terisi} orang</span>
                <span>${persen}%</span>
            </div>
            <div class="bar">
                <div class="bar-isi" style="width: ${persen}%"></div>
            </div>
        </div>`;
}

// Mengisi kartu ringkasan di atas
document.getElementById("totalKapasitas").textContent = totalKapasitas;
document.getElementById("kuotaSisa").textContent = totalKapasitas - totalTerisi;
document.getElementById("sudahTerisi").textContent = totalTerisi;