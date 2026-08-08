// =========================================================
// HYLTON CAFÉ
// Premium Website Interactions
// =========================================================


document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =================================================
        // MOBILE NAVIGATION
        // =================================================

        const menuToggle =
            document.getElementById("menuToggle");

        const mainNav =
            document.getElementById("mainNav");


        function closeMobileMenu() {

            if (!menuToggle || !mainNav) {
                return;
            }


            menuToggle.classList.remove(
                "active"
            );


            mainNav.classList.remove(
                "active"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (menuToggle && mainNav) {

            menuToggle.addEventListener(
                "click",
                function () {

                    const isOpen =
                        mainNav.classList.toggle(
                            "active"
                        );


                    menuToggle.classList.toggle(
                        "active",
                        isOpen
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        isOpen
                            ? "true"
                            : "false"
                    );

                }
            );

        }



        // =================================================
        // SMOOTH SCROLLING
        // =================================================

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            this.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (target) {

                            event.preventDefault();


                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "start"
                                }
                            );


                            closeMobileMenu();

                        }

                    }
                );

            }
        );



        // =================================================
        // NAVBAR SCROLL EFFECT
        // =================================================

        const navbar =
            document.querySelector(
                ".navbar"
            );


        function updateNavbar() {

            if (!navbar) {
                return;
            }


            if (window.scrollY > 40) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateNavbar
        );


        updateNavbar();



        // =================================================
        // SCROLL REVEAL
        // =================================================

        const revealElements =
            document.querySelectorAll(
                ".intro, " +
                ".menu-card, " +
                ".about-container, " +
                ".gallery-item, " +
                ".contact-content, " +
                ".contact-details, " +
                ".contact-image, " +
                ".map-wrapper"
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal"
                );

            }
        );


        if (
            "IntersectionObserver"
            in window
        ) {


            const observer =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );


                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach(
                function (element) {

                    observer.observe(
                        element
                    );

                }
            );


        } else {


            // Fallback for older browsers

            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }



        // =================================================
        // CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
        // =================================================

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !menuToggle ||
                    !mainNav
                ) {

                    return;

                }


                const clickedInsideNav =
                    mainNav.contains(
                        event.target
                    );


                const clickedToggle =
                    menuToggle.contains(
                        event.target
                    );


                if (
                    mainNav.classList.contains(
                        "active"
                    ) &&
                    !clickedInsideNav &&
                    !clickedToggle
                ) {

                    closeMobileMenu();

                }

            }
        );



        // =================================================
        // CLOSE MENU WHEN WINDOW GETS WIDER
        // =================================================

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 900
                ) {

                    closeMobileMenu();

                }

            }
        );

    }
);
/* =========================================================
   HYLTON CAFÉ — GALLERY FILTER + LIGHTBOX
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = Array.from(
        document.querySelectorAll("[data-gallery]")
    );

    const filters = document.querySelectorAll(".gallery-filter");

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const lightboxCounter =
        document.getElementById("lightboxCounter");

    let visibleItems = galleryItems.slice();

    let currentIndex = 0;


    /* =========================
       FILTERS
    ========================= */

    filters.forEach(function (button) {

        button.addEventListener("click", function () {

            filters.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");

            galleryItems.forEach(function (item) {

                const category =
                    item.getAttribute("data-category");

                if (
                    filter === "all" ||
                    category === filter
                ) {
                    item.classList.remove("is-hidden");
                } else {
                    item.classList.add("is-hidden");
                }

            });

            visibleItems =
                galleryItems.filter(function (item) {

                    return !item.classList.contains(
                        "is-hidden"
                    );

                });

        });

    });


    /* =========================
       OPEN LIGHTBOX
    ========================= */

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            visibleItems =
                galleryItems.filter(function (galleryItem) {

                    return !galleryItem.classList.contains(
                        "is-hidden"
                    );

                });

            currentIndex =
                visibleItems.indexOf(item);

            openLightbox();

        });

    });


    function openLightbox() {

        if (
            !visibleItems.length ||
            !visibleItems[currentIndex]
        ) {
            return;
        }

        const image =
            visibleItems[currentIndex]
                .querySelector("img");

        if (!image) {
            return;
        }

        lightboxImage.src =
            image.currentSrc ||
            image.src;

        lightboxImage.alt =
            image.alt || "Hylton Café";

        lightboxCounter.textContent =
            (currentIndex + 1) +
            " / " +
            visibleItems.length;

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    /* =========================
       CLOSE
    ========================= */

    function closeLightbox() {

        lightbox.classList.remove("open");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        lightboxImage.src = "";

        document.body.style.overflow =
            "";

    }


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {
                closeLightbox();
            }

        }
    );


    /* =========================
       NEXT / PREVIOUS
    ========================= */

    function showNext() {

        if (!visibleItems.length) {
            return;
        }

        currentIndex =
            (currentIndex + 1) %
            visibleItems.length;

        openLightbox();

    }


    function showPrevious() {

        if (!visibleItems.length) {
            return;
        }

        currentIndex =
            (
                currentIndex -
                1 +
                visibleItems.length
            ) %
            visibleItems.length;

        openLightbox();

    }


    lightboxNext.addEventListener(
        "click",
        showNext
    );


    lightboxPrev.addEventListener(
        "click",
        showPrevious
    );


    /* =========================
       KEYBOARD
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox.classList.contains(
                    "open"
                )
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowRight") {
                showNext();
            }

            if (event.key === "ArrowLeft") {
                showPrevious();
            }

        }
    );


    /* =========================
       MOBILE SWIPE
    ========================= */

    let touchStartX = 0;

    let touchEndX = 0;


    lightbox.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchEndX - touchStartX;

            if (Math.abs(distance) < 50) {
                return;
            }

            if (distance < 0) {
                showNext();
            } else {
                showPrevious();
            }

        },
        { passive: true }
    );

});
