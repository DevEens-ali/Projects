/* =================================
   DICEF0RGE ROLL DICE
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
         * Initialize Roll Dice
         */

        initializeRollDice();

    }
);


/* =================================
   STATE
   ================================= */

let selectedDice = 20;

let isRolling = false;


/* =================================
   INITIALIZATION
   ================================= */

function initializeRollDice() {

    /*
     * Get dice from URL
     */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const diceFromUrl =
        Number(
            urlParams.get("dice")
        );


    /*
     * Use URL dice if valid
     */

    if (
        [4, 6, 8, 10, 12, 20]
            .includes(diceFromUrl)
    ) {

        selectedDice = diceFromUrl;

    }


    /*
     * Setup page
     */

    updateDiceSelection();

    updateSelectedDiceInfo();

    setupDiceOptions();

    setupRollButton();

}


/* =================================
   DICE OPTIONS
   ================================= */

function setupDiceOptions() {

    const diceOptions =
        document.querySelectorAll(
            ".dice-option"
        );


    diceOptions.forEach(
        (option) => {

            option.addEventListener(
                "click",
                () => {

                    const diceValue =
                        Number(
                            option.dataset.dice
                        );


                    if (
                        ![4, 6, 8, 10, 12, 20]
                            .includes(diceValue)
                    ) {

                        return;

                    }


                    /*
                     * Update selected dice
                     */

                    selectedDice =
                        diceValue;


                    updateDiceSelection();

                    updateSelectedDiceInfo();

                    resetResult();

                }
            );

        }
    );

}


/* =================================
   UPDATE DICE SELECTION
   ================================= */

function updateDiceSelection() {

    const diceOptions =
        document.querySelectorAll(
            ".dice-option"
        );


    diceOptions.forEach(
        (option) => {

            const diceValue =
                Number(
                    option.dataset.dice
                );


            option.classList.toggle(
                "active",
                diceValue === selectedDice
            );

        }
    );


    /*
     * Update main dice
     */

    const mainDice =
        document.querySelector(
            "#main-dice"
        );


    if (mainDice) {

        mainDice.textContent =
            `D${selectedDice}`;

    }

}


/* =================================
   UPDATE SELECTED DICE INFO
   ================================= */

function updateSelectedDiceInfo() {

    const selectedDiceElement =
        document.querySelector(
            "#selected-dice"
        );


    const descriptionElement =
        document.querySelector(
            "#selected-description"
        );


    if (selectedDiceElement) {

        selectedDiceElement.textContent =
            `D${selectedDice}`;

    }


    if (descriptionElement) {

        descriptionElement.textContent =
            `${selectedDice}-sided dice`;

    }

}


/* =================================
   ROLL BUTTON
   ================================= */

function setupRollButton() {

    const rollButton =
        document.querySelector(
            "#roll-button"
        );


    if (!rollButton) {

        return;

    }


    rollButton.addEventListener(
        "click",
        rollDice
    );

}


/* =================================
   ROLL DICE
   ================================= */

function rollDice() {

    /*
     * Prevent multiple rolls
     */

    if (isRolling) {

        return;

    }


    isRolling = true;


    const rollButton =
        document.querySelector(
            "#roll-button"
        );


    const mainDice =
        document.querySelector(
            "#main-dice"
        );


    const resultValue =
        document.querySelector(
            "#result-value"
        );


    const resultMessage =
        document.querySelector(
            "#result-message"
        );


    /*
     * Disable button
     */

    if (rollButton) {

        rollButton.disabled = true;

        rollButton.innerHTML = `
            <span class="roll-button-icon">
                🎲
            </span>

            <span>
                Rolling...
            </span>
        `;

    }


    /*
     * Start dice animation
     */

    if (mainDice) {

        mainDice.classList.remove(
            "rolling"
        );


        /*
         * Force browser reflow
         * so animation can restart
         */

        void mainDice.offsetWidth;


        mainDice.classList.add(
            "rolling"
        );

    }


    /*
     * Hide previous result
     */

    if (resultValue) {

        resultValue.textContent =
            "…";

    }


    if (resultMessage) {

        resultMessage.textContent =
            "The forge is deciding your fate...";

    }


    /*
     * Temporary frontend roll
     */

    setTimeout(
        () => {

            const result =
                Math.floor(
                    Math.random() *
                    selectedDice
                ) + 1;


            showResult(result);


            /*
             * Re-enable button
             */

            isRolling = false;


            if (rollButton) {

                rollButton.disabled =
                    false;

                rollButton.innerHTML = `
                    <span class="roll-button-icon">
                        🎲
                    </span>

                    <span>
                        Roll Dice
                    </span>
                `;

            }


            if (mainDice) {

                mainDice.classList.remove(
                    "rolling"
                );

            }

        },

        750
    );

}


/* =================================
   SHOW RESULT
   ================================= */

function showResult(result) {

    const resultValue =
        document.querySelector(
            "#result-value"
        );


    const resultMessage =
        document.querySelector(
            "#result-message"
        );


    if (resultValue) {

        resultValue.textContent =
            result;

    }


    if (!resultMessage) {

        return;

    }


    /*
     * Critical / perfect results
     */

    if (result === selectedDice) {

        resultMessage.textContent =
            "🎯 Perfect roll! Fate is on your side.";

        return;

    }


    /*
     * Minimum result
     */

    if (result === 1) {

        resultMessage.textContent =
            "💀 Critical failure! Better luck next time.";

        return;

    }


    /*
     * High result
     */

    if (
        result >=
        Math.ceil(selectedDice * 0.75)
    ) {

        resultMessage.textContent =
            "🔥 Excellent roll! The forge approves.";

        return;

    }


    /*
     * Normal result
     */

    resultMessage.textContent =
        "The dice have spoken. Your fate is forged.";

}


/* =================================
   RESET RESULT
   ================================= */

function resetResult() {

    const resultValue =
        document.querySelector(
            "#result-value"
        );


    const resultMessage =
        document.querySelector(
            "#result-message"
        );


    if (resultValue) {

        resultValue.textContent =
            "—";

    }


    if (resultMessage) {

        resultMessage.textContent =
            "Your forged result will appear here.";

    }

}
