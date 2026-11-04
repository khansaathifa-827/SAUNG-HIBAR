// JavaScript untuk halaman Home saja.
// IIFE menjaga variabel/fungsi agar tidak bercampur dengan halaman lain.

(() => {
  "use strict";

  const homePage = document.querySelector(".sh-home");

  if (!homePage) return;

  /* ======================================================
     NAVBAR
     ====================================================== */

  const menuButton = homePage.querySelector(".sh-home__menu-toggle");

  const navMenu = homePage.querySelector(".sh-home__nav");

  function setMenuOpen(isOpen) {
    if (!menuButton || !navMenu) return;

    navMenu.classList.toggle("is-open", isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
    );
  }

  if (menuButton && navMenu) {
    // Toggle menu mobile
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      setMenuOpen(!isOpen);
    });

    // Tutup menu setelah klik link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    // Tombol Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        setMenuOpen(false);
        menuButton.focus();
      }
    });

    // Klik di luar navbar
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".sh-home__navbar")) {
        setMenuOpen(false);
      }
    });

    // Reset ketika desktop
    const desktopQuery = window.matchMedia("(min-width: 901px)");

    function onScreenChange(event) {
      if (event.matches) {
        setMenuOpen(false);
      }
    }

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", onScreenChange);
    } else {
      desktopQuery.addListener(onScreenChange);
    }
  }

  /* ======================================================
     HERO IMAGE SLIDER
     ====================================================== */

  const hero = homePage.querySelector(".sh-home__hero");

  if (hero) {
    const slides = [...hero.querySelectorAll(".sh-home__hero-slide")];

    const dots = [...hero.querySelectorAll(".sh-home__slider-dot")];

    const prevButton = hero.querySelector(".sh-home__slider-button--prev");

    const nextButton = hero.querySelector(".sh-home__slider-button--next");

    if (slides.length > 0) {
      let currentSlide = 0;

      let autoSlide = null;

      /* ========================
         Tampilan slide
         ======================== */

      function showSlide(index) {
        if (index >= slides.length) {
          index = 0;
        }

        if (index < 0) {
          index = slides.length - 1;
        }

        slides.forEach((slide, slideIndex) => {
          slide.classList.toggle("is-active", slideIndex === index);
        });

        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === index);

          dot.setAttribute(
            "aria-current",
            dotIndex === index ? "true" : "false",
          );
        });

        currentSlide = index;
      }

      /* ========================
         Next
         ======================== */

      function nextSlide() {
        showSlide(currentSlide + 1);
      }

      /* ========================
         Previous
         ======================== */

      function previousSlide() {
        showSlide(currentSlide - 1);
      }

      /* ========================
         Auto Slide
         ======================== */

      function startAutoSlide() {
        stopAutoSlide();

        autoSlide = setInterval(nextSlide, 4000);
      }

      function stopAutoSlide() {
        if (autoSlide !== null) {
          clearInterval(autoSlide);

          autoSlide = null;
        }
      }

      /* ========================
         Previous button
         ======================== */

      if (prevButton) {
        prevButton.addEventListener("click", () => {
          previousSlide();

          startAutoSlide();
        });
      }

      /* ========================
         Next button
         ======================== */

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          nextSlide();

          startAutoSlide();
        });
      }

      /* ========================
         Dots
         ======================== */

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);

          startAutoSlide();
        });
      });

      /* ========================
         Pause
         ======================== */

      hero.addEventListener("mouseenter", stopAutoSlide);

      hero.addEventListener("mouseleave", startAutoSlide);

      /* ========================
         Swipe mobile
         ======================== */

      let touchStartX = 0;

      hero.addEventListener(
        "touchstart",
        (event) => {
          touchStartX = event.changedTouches[0].screenX;
        },
        {
          passive: true,
        },
      );

      hero.addEventListener(
        "touchend",
        (event) => {
          const touchEndX = event.changedTouches[0].screenX;

          const distance = touchStartX - touchEndX;

          // Swipe kiri
          if (distance > 50) {
            nextSlide();

            startAutoSlide();
          }

          // Swipe kanan
          if (distance < -50) {
            previousSlide();

            startAutoSlide();
          }
        },
        {
          passive: true,
        },
      );

      /* ========================
         Start Slider
         ======================== */

      showSlide(0);

      startAutoSlide();
    }
  }

  /* ======================================================
     FAQ ACCORDION
     ====================================================== */

  const faqItems = homePage.querySelectorAll(".sh-home__faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".sh-home__faq-question");

    const answer = item.querySelector(".sh-home__faq-answer");

    if (!question) return;

    question.setAttribute("aria-expanded", "false");

    if (answer) {
      answer.setAttribute("aria-hidden", "true");
    }

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Tutup semua FAQ
      faqItems.forEach((faq) => {
        faq.classList.remove("is-open");

        const faqQuestion = faq.querySelector(".sh-home__faq-question");

        const faqAnswer = faq.querySelector(".sh-home__faq-answer");

        if (faqQuestion) {
          faqQuestion.setAttribute("aria-expanded", "false");
        }

        if (faqAnswer) {
          faqAnswer.setAttribute("aria-hidden", "true");
        }
      });

      // Buka FAQ yang dipilih
      if (!isOpen) {
        item.classList.add("is-open");

        question.setAttribute("aria-expanded", "true");

        if (answer) {
          answer.setAttribute("aria-hidden", "false");
        }
      }
    });
  });
})();
