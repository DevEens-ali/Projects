/* =================================
   DICEF0RGE HEADER
   ================================= */


/*
 * Initialize Header
 */

function initializeHeader() {

    setPageHeader();

    setupThemeToggle();

}



//    PAGE HEADER DATA
   

const pageHeaderData = {

    home: {
        title: "Welcome to DiceForge",
        subtitle: "Roll the dice and forge your legend."
    },

    "roll-dice": {
        title: "Roll Dice",
        subtitle: "Choose your dice and forge your roll."
    },

    history: {
        title: "Roll History",
        subtitle: "Review your previous dice rolls."
    },

    statistics: {
        title: "Statistics",
        subtitle: "Analyze your rolling performance."
    },

    about: {
        title: "About DiceForge",
        subtitle: "Discover the forge behind your rolls."
    },

    settings: {
        title: "Settings",
        subtitle: "Customize your DiceForge experience."
    }

};



//    DETECT CURRENT PAGE
  

function getCurrentPageName() {

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



//    SET PAGE HEADER
   

function setPageHeader() {

    const titleElement =
        document.getElementById("page-title");

    const subtitleElement =
        document.getElementById("page-subtitle");


    if (!titleElement || !subtitleElement) {
        return;
    }


    const currentPage =
        getCurrentPageName();


    const pageData =
        pageHeaderData[currentPage];


    if (!pageData) {
        return;
    }


    titleElement.textContent =
        pageData.title;


    subtitleElement.textContent =
        pageData.subtitle;

}



//    THEME TOGGLE
   

function setupThemeToggle() {

    const themeToggle =
        document.getElementById("theme-toggle");

    const themeIcon =
        document.getElementById("theme-icon");


    if (!themeToggle) {
        return;
    }


    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            if (
                document.body.classList.contains(
                    "light-theme"
                )
            ) {

                if (themeIcon) {
                    themeIcon.textContent = "☀";
                }

            } else {

                if (themeIcon) {
                    themeIcon.textContent = "☾";
                }

            }

        }
    );

}