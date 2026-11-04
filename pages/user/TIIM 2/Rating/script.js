/* Saung Hibar - Halaman Review */
(function () {
  'use strict';

  var root = document.querySelector('.sh-review');
  if (!root) return;

  /* ---------- 1. Menu hamburger ---------- */
  var menuBtn = root.querySelector('.sh-review__menu-btn');
  var nav = root.querySelector('.sh-review__nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1100) setMenu(false);
    });
  }

  /* ---------- 2. Input rating bintang ---------- */
  var starBtns = Array.prototype.slice.call(root.querySelectorAll('.sh-review__star-btn'));
  var ratingInput = root.querySelector('#sh-review-rating');
  var ratingGroup = root.querySelector('.sh-review__rating-input');

  function paint(n) {
    starBtns.forEach(function (b) {
      b.classList.toggle('is-active', Number(b.dataset.value) <= n);
    });
  }

  function selectRating(n) {
    ratingInput.value = String(n);
    starBtns.forEach(function (b) {
      b.setAttribute('aria-checked', String(Number(b.dataset.value) === n));
    });
    paint(n);
    setError('rating', '');
  }

  if (ratingInput && ratingGroup) {
    starBtns.forEach(function (btn) {
      btn.addEventListener('click', function () { selectRating(Number(btn.dataset.value)); });
      btn.addEventListener('mouseenter', function () { paint(Number(btn.dataset.value)); });
      btn.addEventListener('focus', function () { paint(Number(btn.dataset.value)); });
    });
    ratingGroup.addEventListener('mouseleave', function () { paint(Number(ratingInput.value)); });
    ratingGroup.addEventListener('focusout', function () { paint(Number(ratingInput.value)); });
  }

  /* ---------- 3. Validasi & kirim form (mode demo, tanpa backend) ---------- */
  var form = root.querySelector('#sh-review-form');
  var list = root.querySelector('#sh-review-list');
  var statusEl = root.querySelector('#sh-review-status');

  function setError(name, msg) {
    if (!form) return;
    var el = form.querySelector('[data-error-for="' + name + '"]');
    if (el) {
      el.textContent = msg || '';
      el.hidden = !msg;
    }
    var field = form.elements[name];
    if (field && field.type !== 'hidden') {
      if (msg) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
    }
  }

  function buildReview(name, rating, text) {
    var item = document.createElement('article');
    item.className = 'sh-review__item';

    var avatar = document.createElement('div');
    avatar.className = 'sh-review__avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = name.charAt(0).toUpperCase();

    var meta = document.createElement('div');
    meta.className = 'sh-review__meta';
    var h3 = document.createElement('h3');
    h3.className = 'sh-review__name';
    h3.textContent = name;                // textContent = aman dari XSS
    var time = document.createElement('span');
    time.className = 'sh-review__time';
    time.textContent = 'Baru saja';
    meta.appendChild(h3);
    meta.appendChild(time);

    var stars = document.createElement('span');
    stars.className = 'sh-review__stars';
    stars.style.setProperty('--value', rating);
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', rating + ' dari 5 bintang');

    var p = document.createElement('p');
    p.className = 'sh-review__text';
    p.textContent = text;

    item.appendChild(avatar);
    item.appendChild(meta);
    item.appendChild(stars);
    item.appendChild(p);
    return item;
  }

  if (form && list) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.textContent = '';

      var rating = Number(ratingInput.value);
      var nama = form.elements['nama'].value.trim();
      var email = form.elements['email'].value.trim();
      var review = form.elements['review'].value.trim();
      var firstInvalid = null;

      function check(ok, name, msg, focusEl) {
        setError(name, ok ? '' : msg);
        if (!ok && !firstInvalid) firstInvalid = focusEl;
      }

      check(rating >= 1, 'rating', 'Silakan pilih rating bintang.', starBtns[0]);
      check(nama.length >= 2, 'nama', 'Nama minimal 2 karakter.', form.elements['nama']);
      check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'email', 'Masukkan email yang valid.', form.elements['email']);
      check(review.length >= 10, 'review', 'Review minimal 10 karakter.', form.elements['review']);

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      /* DEMO: review hanya tampil di halaman ini. Untuk produksi, kirim ke
         server (fetch POST) lalu tampilkan setelah dimoderasi. */
      list.insertBefore(buildReview(nama, rating, review), list.firstChild);

      form.reset();
      selectRating(0);
      statusEl.textContent = 'Terima kasih! Review Anda sudah ditambahkan (mode demo, belum tersimpan ke server).';
    });

    ['nama', 'email', 'review'].forEach(function (n) {
      form.elements[n].addEventListener('input', function () { setError(n, ''); });
    });
  }

  /* ---------- 4. Placeholder jika gambar testimoni belum tersedia ---------- */
  function usePlaceholder(img) {
    var ph = document.createElement('div');
    ph.className = 'sh-review__placeholder';
    ph.textContent = 'Placeholder: ' + (img.getAttribute('alt') || 'gambar testimoni');
    img.replaceWith(ph);
  }

  root.querySelectorAll('.sh-review__shot img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) {
      usePlaceholder(img);
    } else {
      img.addEventListener('error', function () { usePlaceholder(img); }, { once: true });
    }
  });
})();