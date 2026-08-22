/* =================================
   DICEF0RGE ABOUT PAGE
   ================================= */


/* =================================
   PAGE INITIALIZATION
   ================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        /*
         * Load Sidebar
         */

        const sidebarLoaded =
            await loadComponent(
                "../../components/sidebar/sidebar.html",
                "#sidebar-container"
            );


        if (sidebarLoaded) {

            initializeSidebar();

        }


        /*
         * Load Header
         */

        const headerLoaded =
            await loadComponent(
                "../../components/header/header.html",
                "#header-container"
            );


        if (headerLoaded) {

            initializeHeader();

        }


        /*
         * Initialize About Page
         */

        initializeAboutPage();

    }
);


/* =================================
   ABOUT PAGE INITIALIZATION
   ================================= */

function initializeAboutPage() {

    setupScrollReveal();

    setupCounterAnimation();

    setupFeatureCards();

    setupTechnologyCards();

    setupSmoothScrolling();

}


/* =================================
   SCROLL REVEAL
   ================================= */

function setupScrollReveal() {

    const sections =
        document.querySelectorAll(
            ".reveal-section"
        );


    if (!sections.length) {

        return;

    }


    /*
     * Add initial animation class
     */

    sections.forEach(
        (section) => {

            section.classList.add(
                "reveal-ready"
            );

        }
    );


    /*
     * Intersection Observer
     */

    const observer =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );


                            /*
                             * Stop observing after
                             * animation is triggered
                             */

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


    sections.forEach(
        (section) => {

            observer.observe(
                section
            );

        }
    );

}


/* =================================
   COUNTER ANIMATION
   ================================= */

function setupCounterAnimation() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) {

        return;

    }


    const counterObserver =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {

                threshold: 0.5

            }
        );


    counters.forEach(
        (counter) => {

            counterObserver.observe(
                counter
            );

        }
    );

}


/* =================================
   ANIMATE COUNTER
   ================================= */

function animateCounter(
    counter
) {

    const target =
        Number(
            counter.dataset.target
        );


    const suffix =
        counter.dataset.suffix || "";


    if (
        Number.isNaN(target)
    ) {

        return;

    }


    const duration = 1200;

    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
         * Ease-out animation
         */

        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                easedProgress * target
            );


        counter.textContent =
            `${currentValue}${suffix}`;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                updateCounter
            );

        }
        else {

            counter.textContent =
                `${target}${suffix}`;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =================================
   FEATURE CARDS
   ================================= */

function setupFeatureCards() {

    const cards =
        document.querySelectorAll(
            ".feature-card"
        );


    cards.forEach(
        (card) => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.classList.add(
                        "feature-active"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.classList.remove(
                        "feature-active"
                    );

                }
            );

        }
    );

}


/* =================================
   TECHNOLOGY CARDS
   ================================= */

function setupTechnologyCards() {

    const cards =
        document.querySelectorAll(
            ".technology-card"
        );


    cards.forEach(
        (card) => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.classList.add(
                        "technology-active"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.classList.remove(
                        "technology-active"
                    );

                }
            );

        }
    );

}


/* =================================
   SMOOTH SCROLLING
   ================================= */

function setupSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
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


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {

                            behavior: "smooth",

                            block: "start"

                        }
                    );

                }
            );

        }
    );

}


/* =================================
   HERO DICE INTERACTION
   ================================= */

function setupHeroDiceInteraction() {

    const dice =
        document.querySelector(
            ".hero-dice"
        );


    if (!dice) {

        return;

    }


    dice.addEventListener(
        "click",
        () => {

            dice.classList.remove(
                "dice-spin"
            );


            /*
             * Force browser to restart
             * the animation
             */

            void dice.offsetWidth;


            dice.classList.add(
                "dice-spin"
            );

        }
    );

}


/* =================================
   INITIALIZE HERO DICE
   ================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupHeroDiceInteraction();

    }
);
