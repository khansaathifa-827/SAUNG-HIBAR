// =========================================================
// SAUNG HIBAR - MENU PAGE
// JavaScript เฉพาะหน้า menu
// =========================================================

(() => {
    "use strict";

    const menuPage = document.querySelector(".sh-menu");

    if (!menuPage) {
        return;
    }

    const menuToggle = menuPage.querySelector("#shMenuToggle");
    const menuNavigation = menuPage.querySelector("#shMenuNavigation");

    const menuSearch = menuPage.querySelector("#menuSearch");
    const categoryButtons = menuPage.querySelectorAll(".sh-menu__category");
    const menuItems = menuPage.querySelectorAll(".sh-menu__item");
    const menuEmpty = menuPage.querySelector("#menuEmpty");

    const popularTrack = menuPage.querySelector("#popularTrack");
    const previousButton = menuPage.querySelector("#popularPrevious");
    const nextButton = menuPage.querySelector("#popularNext");

    const menuListView = menuPage.querySelector("#menuListView");
    const menuDetailView = menuPage.querySelector("#menuDetailView");

    const detailBack = menuPage.querySelector("#detailBack");
    const detailImage = menuPage.querySelector("#detailImage");
    const detailName = menuPage.querySelector("#detailName");
    const detailDescription = menuPage.querySelector("#detailDescription");
    const detailPrice = menuPage.querySelector("#detailPrice");

    const whatsappOrder = menuPage.querySelector("#whatsappOrder");


    // MOBILE NAVIGATION

    function setNavigationOpen(isOpen) {

        if (!menuToggle || !menuNavigation) {
            return;
        }

        menuToggle.classList.toggle("is-open", isOpen);
        menuNavigation.classList.toggle("is-open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }


    if (menuToggle && menuNavigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.contains("is-open");

            setNavigationOpen(!isOpen);
        });


        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                menuNavigation.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                setNavigationOpen(false);
            }
        });
    }


    // CATEGORY + SEARCH FILTER

    let activeCategory = "semua";


    function normalizeText(value) {

        return value
            .toLowerCase()
            .trim();
    }


    function filterMenuItems() {

        const searchText =
            normalizeText(
                menuSearch
                    ? menuSearch.value
                    : ""
            );

        let visibleItems = 0;

        menuItems.forEach((item) => {

            const itemName =
                normalizeText(
                    item.dataset.name || ""
                );

            const itemCategory =
                normalizeText(
                    item.dataset.category || ""
                );

            const matchesSearch =
                itemName.includes(searchText);

            const matchesCategory =
                activeCategory === "semua" ||
                itemCategory === activeCategory;

            const shouldShow =
                matchesSearch &&
                matchesCategory;

            item.hidden = !shouldShow;

            if (shouldShow) {
                visibleItems += 1;
            }
        });

        if (menuEmpty) {
            menuEmpty.hidden =
                visibleItems !== 0;
        }
    }


    if (menuSearch) {
        menuSearch.addEventListener(
            "input",
            filterMenuItems
        );
    }


    categoryButtons.forEach((button) => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(
                (categoryButton) => {

                    categoryButton.classList.remove(
                        "is-active"
                    );
                }
            );

            button.classList.add("is-active");

            activeCategory =
                button.dataset.category ||
                "semua";

            filterMenuItems();
        });
    });


    // POPULAR MENU SLIDER

    function getPopularScrollDistance() {

        if (!popularTrack) {
            return 0;
        }

        const firstCard =
            popularTrack.querySelector(
                ".sh-menu__popular-card"
            );

        if (!firstCard) {
            return 0;
        }

        const cardWidth =
            firstCard.getBoundingClientRect().width;

        return cardWidth + 16;
    }


    if (
        popularTrack &&
        previousButton &&
        nextButton
    ) {

        previousButton.addEventListener(
            "click",
            () => {

                popularTrack.scrollBy({
                    left:
                        -getPopularScrollDistance(),
                    behavior: "smooth"
                });
            }
        );

        nextButton.addEventListener(
            "click",
            () => {

                popularTrack.scrollBy({
                    left:
                        getPopularScrollDistance(),
                    behavior: "smooth"
                });
            }
        );
    }


    // MENU DETAIL

    function openMenuDetail(menuElement) {

        if (
            !menuListView ||
            !menuDetailView
        ) {
            return;
        }

        const name =
            menuElement.dataset.name || "";

        const price =
            menuElement.dataset.price || "";

        const image =
            menuElement.dataset.image || "";

        const detailImageSource =
            menuElement.dataset.detailImage || image;

        const description =
            menuElement.dataset.description || "";

        if (detailName) {
            detailName.textContent = name;
        }

        if (detailPrice) {
            detailPrice.textContent = price;
        }

        if (detailDescription) {
            detailDescription.textContent =
                description;
        }

        if (detailImage && detailImageSource) {
            detailImage.src = detailImageSource;
            detailImage.alt = name;
        }

        menuListView.hidden = true;
        menuDetailView.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }


    function closeMenuDetail() {

        if (
            !menuListView ||
            !menuDetailView
        ) {
            return;
        }

        menuDetailView.hidden = true;
        menuListView.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }


    menuItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {
                openMenuDetail(item);
            }
        );
    });


    const popularCards =
        menuPage.querySelectorAll(
            ".sh-menu__popular-card"
        );


    popularCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {
                openMenuDetail(card);
            }
        );
    });


    if (detailBack) {
        detailBack.addEventListener(
            "click",
            closeMenuDetail
        );
    }


    // WHATSAPP ORDER
    // ใส่หมายเลข WhatsApp ของร้าน เช่น 628123456789

    const whatsappNumber = "";


    function orderViaWhatsApp() {

        const selectedMenu =
            detailName
                ? detailName.textContent.trim()
                : "";

        const selectedPrice =
            detailPrice
                ? detailPrice.textContent.trim()
                : "";

        if (!whatsappNumber) {

            alert(
                "กรุณาใส่หมายเลข WhatsApp ของร้านในไฟล์ script.js ก่อนใช้งานปุ่มสั่งซื้อ"
            );

            return;
        }

        const message =
            `Halo Saung Hibar, saya ingin memesan ${selectedMenu} (${selectedPrice}).`;

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    }


    if (whatsappOrder) {

        whatsappOrder.addEventListener(
            "click",
            orderViaWhatsApp
        );
    }

})();
