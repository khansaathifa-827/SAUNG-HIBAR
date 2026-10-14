// panduan.js
// Catatan: accordion FAQ dan tombol hamburger sudah dijalankan Bootstrap,
// jadi file ini hanya berisi tambahan kecil.

document.addEventListener('DOMContentLoaded', function () {

  // 1. Tutup menu navbar otomatis di mobile setelah link diklik
  const menuUtama = document.getElementById('menuUtama');

  if (menuUtama) {
    document.querySelectorAll('#menuUtama .nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (menuUtama.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(menuUtama).hide();
        }
      });
    });
  }

  // 2. Tahun copyright otomatis
  const copy = document.querySelector('.copy');

  if (copy) {
    copy.innerHTML =
      '&copy; ' + new Date().getFullYear() + ' Saung Hibar. All Rights Reserved.';
  }

});