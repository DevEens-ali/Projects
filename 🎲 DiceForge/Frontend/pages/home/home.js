/* =================================
   DICEF0RGE HOME PAGE
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


        /*
         * Initialize Sidebar
         */

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


        /*
         * Initialize Header
         */

        if (headerLoaded) {
            initializeHeader();
        }

    }
);