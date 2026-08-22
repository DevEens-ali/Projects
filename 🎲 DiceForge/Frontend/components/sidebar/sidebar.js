/* =================================
   DICEF0RGE SIDEBAR
   ================================= */


/*
 * Initialize Sidebar
 */

function initializeSidebar() {

    const sidebar =
        document.getElementById("sidebar");


    if (!sidebar) {
        return;
    }


    /*
     * Detect current page
     */

    const currentPage =
        getCurrentPage();


    /*
     * Highlight active navigation
     */

    setActiveNavigation(currentPage);


    /*
     * Setup navigation events
     */

    setupNavigation();

}



//    GET CURRENT PAGE


function getCurrentPage() {

    const path =
        window.location.pathname;


    if (path.includes("/home/")) {
        return "home";
    }

    if (path.includes("/roll-dice/")) {
        return "roll-dice";
    }

    if (path.includes("/history/")) {
        return "history";
    }

    if (path.includes("/statistics/")) {
        return "statistics";
    }

    if (path.includes("/about/")) {
        return "about";
    }

    if (path.includes("/settings/")) {
        return "settings";
    }


    return "home";
}



//    SET ACTIVE NAVIGATION
   

function setActiveNavigation(currentPage) {

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach((item) => {

        const page =
            item.dataset.page;


        if (page === currentPage) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}



//    NAVIGATION EVENTS
   

function setupNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                navItems.forEach((nav) => {

                    nav.classList.remove("active");

                });


                item.classList.add("active");

            }
        );

    });

}