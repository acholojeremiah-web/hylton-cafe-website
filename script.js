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
