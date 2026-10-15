/* JavaScript khusus halaman Customer Service.
   Tidak memakai backend, database, atau library eksternal. */
(() => {
  "use strict";

  const page = document.querySelector(".sh-cs");
  if (!page) return;

  // Pastikan nomor ini adalah NOMOR WHATSAPP resmi sebelum mengisi.
  // Contoh format: "6281234567890" (tanpa +, spasi, dan tanda hubung).
  // Nomor telepon di PDF belum tentu merupakan nomor WhatsApp.
  const WHATSAPP_NUMBER = "";
  const CONTACT_EMAIL = "saunghibar@gmail.com";

  // ----------------------------------------------------------
  // 1. Navigasi hamburger pada tablet dan HP
  // ----------------------------------------------------------
  const menuToggle = page.querySelector(".sh-cs__menu-toggle");
  const mainNav = page.querySelector(".sh-cs__nav");

  function setMenuOpen(isOpen) {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.toggle("sh-cs__nav--open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".sh-cs__navbar")) setMenuOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        mainNav.classList.contains("sh-cs__nav--open")
      ) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    window
      .matchMedia("(min-width: 1101px)")
      .addEventListener("change", (event) => {
        if (event.matches) setMenuOpen(false);
      });
  }

  // ----------------------------------------------------------
  // 2. Tombol WhatsApp (aktif setelah nomor resmi dikonfigurasi)
  // ----------------------------------------------------------
  const whatsappStatus = page.querySelector("#sh-cs-whatsapp-status");
  const whatsappButtons = page.querySelectorAll("[data-sh-cs-whatsapp]");

  function openWhatsApp() {
    const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
    if (!digits) {
      whatsappStatus.hidden = false;
      whatsappStatus.textContent =
        "Nomor WhatsApp resmi belum diatur. Silakan gunakan telepon atau email terlebih dahulu.";
      whatsappStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    whatsappStatus.hidden = true;
    const greeting = encodeURIComponent(
      "Halo Saung Hibar, saya ingin bertanya.",
    );
    window.open(
      `https://wa.me/${digits}?text=${greeting}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  whatsappButtons.forEach((button) => {
    button.addEventListener("click", openWhatsApp);
  });

  // ----------------------------------------------------------
  // 3. Formulir (membuka email draft; TIDAK mengirim otomatis)
  // ----------------------------------------------------------
  const form = page.querySelector("#sh-cs-message-form");
  if (!form) return;

  const phoneInput = form.querySelector("#sh-cs-phone");
  const status = form.querySelector("#sh-cs-form-status");

  phoneInput.addEventListener("input", () => phoneInput.setCustomValidity(""));

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const phone = phoneInput.value.trim();
    const message = form.elements.message.value.trim();
    const phoneDigits = phone.replace(/[\s()+-]/g, "");

    if (!name || !phone || !message) {
      status.hidden = false;
      status.textContent = "Silakan lengkapi semua kolom terlebih dahulu.";
      return;
    }

    if (!/^(?:08\d{8,12}|628\d{8,12})$/.test(phoneDigits)) {
      phoneInput.setCustomValidity(
        "Gunakan nomor Indonesia, misalnya 081234567890 atau +6281234567890.",
      );
      phoneInput.reportValidity();
      return;
    }

    const subject = `Pertanyaan Customer Service - ${name}`;
    const body = [
      `Nama Lengkap: ${name}`,
      `Nomor WhatsApp / HP: ${phone}`,
      "",
      "Pesan / Pertanyaan:",
      message,
    ].join("\n");

    const emailDraft =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    status.hidden = false;
    status.textContent =
      "Aplikasi email akan dibuka dengan pesan Anda. Periksa dan tekan Kirim di aplikasi email untuk mengirimnya.";

    // Browser akan meminta aplikasi email pengguna membuka draft.
    // Pesan tidak disimpan dan tidak dikirim melalui website.
    window.location.href = emailDraft;
  });
})();
