/* =================================
   DICEF0RGE HISTORY PAGE
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
         * Initialize History
         */

        initializeHistory();

    }
);


/* =================================
   HISTORY INITIALIZATION
   ================================= */

function initializeHistory() {

    setupHistoryFilters();

    setupClearHistory();

    updateHistorySummary();

    showAllHistory();

}


/* =================================
   HISTORY FILTERS
   ================================= */

function setupHistoryFilters() {

    const filters =
        document.querySelectorAll(
            ".history-filter"
        );


    filters.forEach(
        (filter) => {

            filter.addEventListener(
                "click",
                () => {

                    const selectedFilter =
                        filter.dataset.filter;


                    /*
                     * Update active button
                     */

                    filters.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    filter.classList.add(
                        "active"
                    );


                    /*
                     * Apply filter
                     */

                    filterHistory(
                        selectedFilter
                    );

                }
            );

        }
    );

}


/* =================================
   FILTER HISTORY
   ================================= */

function filterHistory(filter) {

    const historyItems =
        document.querySelectorAll(
            ".history-item"
        );


    const emptyState =
        document.querySelector(
            "#history-empty"
        );


    let visibleItems = 0;


    historyItems.forEach(
        (item) => {

            const dice =
                item.dataset.dice;


            /*
             * Show all
             */

            if (
                filter === "all"
            ) {

                item.classList.remove(
                    "hidden"
                );

                item.classList.add(
                    "visible"
                );

                visibleItems++;

                return;

            }


            /*
             * Show selected dice
             */

            if (
                dice === filter
            ) {

                item.classList.remove(
                    "hidden"
                );

                item.classList.add(
                    "visible"
                );

                visibleItems++;

            }

            else {

                item.classList.remove(
                    "visible"
                );

                item.classList.add(
                    "hidden"
                );

            }

        }
    );


    /*
     * Handle empty state
     */

    if (
        emptyState
    ) {

        if (
            visibleItems === 0
        ) {

            emptyState.classList.add(
                "visible"
            );

        }

        else {

            emptyState.classList.remove(
                "visible"
            );

        }

    }

}


/* =================================
   SHOW ALL HISTORY
   ================================= */

function showAllHistory() {

    filterHistory("all");

}


/* =================================
   CLEAR HISTORY
   ================================= */

function setupClearHistory() {

    const clearButton =
        document.querySelector(
            "#clear-history"
        );


    if (!clearButton) {

        return;

    }


    clearButton.addEventListener(
        "click",
        () => {

            clearHistory();

        }
    );

}


/* =================================
   CLEAR HISTORY FUNCTION
   ================================= */

function clearHistory() {

    const historyItems =
        document.querySelectorAll(
            ".history-item"
        );


    const emptyState =
        document.querySelector(
            "#history-empty"
        );


    /*
     * Hide all history items
     */

    historyItems.forEach(
        (item) => {

            item.classList.add(
                "hidden"
            );

            item.classList.remove(
                "visible"
            );

        }
    );


    /*
     * Show empty state
     */

    if (emptyState) {

        emptyState.classList.add(
            "visible"
        );

    }


    /*
     * Update summary
     */

    updateEmptySummary();

}


/* =================================
   UPDATE HISTORY SUMMARY
   ================================= */

function updateHistorySummary() {

    const historyItems =
        document.querySelectorAll(
            ".history-item"
        );


    if (
        historyItems.length === 0
    ) {

        updateEmptySummary();

        return;

    }


    let total =
        historyItems.length;


    let highest =
        0;


    let sum =
        0;


    historyItems.forEach(
        (item) => {

            const resultElement =
                item.querySelector(
                    ".history-result"
                );


            if (!resultElement) {

                return;

            }


            const result =
                Number(
                    resultElement.textContent
                );


            if (
                Number.isNaN(result)
            ) {

                return;

            }


            sum += result;


            if (
                result > highest
            ) {

                highest =
                    result;

            }

        }
    );


    const average =
        total > 0
            ? (sum / total).toFixed(1)
            : "0.0";


    /*
     * Update total
     */

    const totalElement =
        document.querySelector(
            "#history-total-rolls"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    /*
     * Update highest
     */

    const highestElement =
        document.querySelector(
            "#history-highest-roll"
        );


    if (highestElement) {

        highestElement.textContent =
            highest;

    }


    /*
     * Update average
     */

    const averageElement =
        document.querySelector(
            "#history-average-roll"
        );


    if (averageElement) {

        averageElement.textContent =
            average;

    }

}


/* =================================
   EMPTY SUMMARY
   ================================= */

function updateEmptySummary() {

    const totalElement =
        document.querySelector(
            "#history-total-rolls"
        );


    const highestElement =
        document.querySelector(
            "#history-highest-roll"
        );


    const averageElement =
        document.querySelector(
            "#history-average-roll"
        );


    if (totalElement) {

        totalElement.textContent =
            "0";

    }


    if (highestElement) {

        highestElement.textContent =
            "—";

    }


    if (averageElement) {

        averageElement.textContent =
            "—";

    }

}
