/* =========================================================
   DICEF0RGE — SETTINGS JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. DEFAULT SETTINGS
   ========================================================= */

const DEFAULT_SETTINGS = {

    profile: {
        displayName: "DiceMaster",
        username: "@dicemaster"
    },

    appearance: {
        theme: "dark",
        accent: "purple"
    },

    dice: {
        individualResults: true,
        autoSave: true,
        animation: true,
        sound: true,
        defaultDice: "D6",
        numberOfDice: 1,
        modifier: 0,
        preset: "None"
    },

    notifications: {
        rollCompleted: true,
        achievement: true,
        statistics: false,
        weeklySummary: true
    },

    privacy: {
        saveRollData: true,
        analytics: false,
        localStorage: true
    }

};


/* =========================================================
   2. CURRENT SETTINGS
   ========================================================= */

let currentSettings = loadSettings();

let savedSettings = JSON.parse(
    JSON.stringify(currentSettings)
);


/* =========================================================
   3. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeSettings();

});


/* =========================================================
   4. INITIALIZE SETTINGS
   ========================================================= */

function initializeSettings() {

    initializeTabs();

    initializeToggles();

    initializeTheme();

    initializeAccentColors();

    initializeNumberControls();

    initializeSelects();

    initializeProfileInputs();

    initializeSaveButtons();

    initializeDataButtons();

    applySettingsToUI();

}


/* =========================================================
   5. LOAD SETTINGS
   ========================================================= */

function loadSettings() {

    try {

        const storedSettings =
            localStorage.getItem("diceforgeSettings");

        if (!storedSettings) {

            return JSON.parse(
                JSON.stringify(DEFAULT_SETTINGS)
            );

        }

        const parsedSettings =
            JSON.parse(storedSettings);

        return mergeSettings(
            DEFAULT_SETTINGS,
            parsedSettings
        );

    } catch (error) {

        console.error(
            "Failed to load DiceForge settings:",
            error
        );

        return JSON.parse(
            JSON.stringify(DEFAULT_SETTINGS)
        );

    }

}


/* =========================================================
   6. MERGE SETTINGS
   ========================================================= */

function mergeSettings(defaults, saved) {

    const result = {
        ...defaults,
        ...saved
    };


    Object.keys(defaults).forEach(section => {

        if (
            typeof defaults[section] === "object" &&
            defaults[section] !== null
        ) {

            result[section] = {
                ...defaults[section],
                ...(saved[section] || {})
            };

        }

    });


    return result;

}


/* =========================================================
   7. SAVE SETTINGS TO LOCAL STORAGE
   ========================================================= */

function saveSettingsToStorage() {

    try {

        localStorage.setItem(
            "diceforgeSettings",
            JSON.stringify(currentSettings)
        );

    } catch (error) {

        console.error(
            "Failed to save settings:",
            error
        );

    }

}


/* =========================================================
   8. TABS
   ========================================================= */

function initializeTabs() {

    const tabButtons =
        document.querySelectorAll(
            ".settings-nav-item"
        );


    const tabContents =
        document.querySelectorAll(
            ".settings-tab-content"
        );


    tabButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const targetTab =
                    button.dataset.tab;


                /* Remove active from buttons */

                tabButtons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                /* Add active to clicked button */

                button.classList.add(
                    "active"
                );


                /* Hide all contents */

                tabContents.forEach(content => {

                    content.classList.remove(
                        "active"
                    );

                });


                /* Show selected content */

                const targetContent =
                    document.querySelector(
                        `[data-tab-content="${targetTab}"]`
                    );


                if (targetContent) {

                    targetContent.classList.add(
                        "active"
                    );

                }

            }
        );

    });

}


/* =========================================================
   9. TOGGLES
   ========================================================= */

function initializeToggles() {

    const toggles =
        document.querySelectorAll(
            'input[type="checkbox"][data-setting]'
        );


    toggles.forEach(toggle => {

        toggle.addEventListener(
            "change",
            () => {

                const path =
                    toggle.dataset.setting;


                setSettingValue(
                    path,
                    toggle.checked
                );


                markUnsaved();

            }
        );

    });

}


/* =========================================================
   10. THEME
   ========================================================= */

function initializeTheme() {

    const themeButtons =
        document.querySelectorAll(
            ".theme-option"
        );


    themeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const theme =
                    button.dataset.theme;


                currentSettings.appearance.theme =
                    theme;


                applyTheme(theme);


                updateThemeButtons(
                    theme
                );


                markUnsaved();

            }
        );

    });

}


/* =========================================================
   11. APPLY THEME
   ========================================================= */

function applyTheme(theme) {

    const root =
        document.documentElement;


    if (theme === "system") {

        const prefersDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;


        root.dataset.theme =
            prefersDark
                ? "dark"
                : "light";

        return;

    }


    root.dataset.theme = theme;

}


/* =========================================================
   12. UPDATE THEME BUTTONS
   ========================================================= */

function updateThemeButtons(theme) {

    const buttons =
        document.querySelectorAll(
            ".theme-option"
        );


    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.theme === theme
        );

    });

}


/* =========================================================
   13. ACCENT COLORS
   ========================================================= */

function initializeAccentColors() {

    const accentButtons =
        document.querySelectorAll(
            ".accent-color"
        );


    accentButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const accent =
                    button.dataset.accent;


                currentSettings.appearance.accent =
                    accent;


                applyAccentColor(
                    accent
                );


                updateAccentButtons(
                    accent
                );


                markUnsaved();

            }
        );

    });

}


/* =========================================================
   14. APPLY ACCENT COLOR
   ========================================================= */

function applyAccentColor(accent) {

    document.documentElement.dataset.accent =
        accent;

}


/* =========================================================
   15. UPDATE ACCENT BUTTONS
   ========================================================= */

function updateAccentButtons(accent) {

    const buttons =
        document.querySelectorAll(
            ".accent-color"
        );


    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.accent === accent
        );

    });

}


/* =========================================================
   16. NUMBER CONTROLS
   ========================================================= */

function initializeNumberControls() {

    const controls =
        document.querySelectorAll(
            ".number-control"
        );


    controls.forEach(control => {

        const controlType =
            control.dataset.control;


        const minusButton =
            control.querySelector(
                '[data-action="minus"]'
            );


        const plusButton =
            control.querySelector(
                '[data-action="plus"]'
            );


        const valueElement =
            control.querySelector(
                "[data-value]"
            );


        if (
            !minusButton ||
            !plusButton ||
            !valueElement
        ) {

            return;

        }


        minusButton.addEventListener(
            "click",
            () => {

                changeNumberValue(
                    controlType,
                    -1,
                    valueElement
                );

            }
        );


        plusButton.addEventListener(
            "click",
            () => {

                changeNumberValue(
                    controlType,
                    1,
                    valueElement
                );

            }
        );

    });

}


/* =========================================================
   17. CHANGE NUMBER VALUE
   ========================================================= */

function changeNumberValue(
    controlType,
    amount,
    element
) {

    if (
        controlType ===
        "number-of-dice"
    ) {

        let value =
            currentSettings.dice.numberOfDice;


        value += amount;


        /* Minimum 1 dice */

        value =
            Math.max(
                1,
                Math.min(value, 20)
            );


        currentSettings.dice.numberOfDice =
            value;


        element.textContent =
            value;

    }


    if (
        controlType ===
        "modifier"
    ) {

        let value =
            currentSettings.dice.modifier;


        value += amount;


        /* Modifier range */

        value =
            Math.max(
                -20,
                Math.min(value, 20)
            );


        currentSettings.dice.modifier =
            value;


        element.textContent =
            formatModifier(value);

    }


    markUnsaved();

}


/* =========================================================
   18. FORMAT MODIFIER
   ========================================================= */

function formatModifier(value) {

    if (value > 0) {

        return `+ ${value}`;

    }


    if (value < 0) {

        return `− ${Math.abs(value)}`;

    }


    return "+ 0";

}


/* =========================================================
   19. SELECT INPUTS
   ========================================================= */

function initializeSelects() {

    const selects =
        document.querySelectorAll(
            "select[data-setting]"
        );


    selects.forEach(select => {

        select.addEventListener(
            "change",
            () => {

                const path =
                    select.dataset.setting;


                setSettingValue(
                    path,
                    select.value
                );


                markUnsaved();

            }
        );

    });

}


/* =========================================================
   20. PROFILE INPUTS
   ========================================================= */

function initializeProfileInputs() {

    const inputs =
        document.querySelectorAll(
            "input[data-setting]"
        );


    inputs.forEach(input => {

        if (
            input.type === "checkbox"
        ) {

            return;

        }


        input.addEventListener(
            "input",
            () => {

                const path =
                    input.dataset.setting;


                setSettingValue(
                    path,
                    input.value
                );


                markUnsaved();

            }
        );

    });

}


/* =========================================================
   21. GET SETTING VALUE
   ========================================================= */

function getSettingValue(path) {

    const parts =
        path.split(".");


    let value =
        currentSettings;


    parts.forEach(part => {

        value =
            value?.[part];

    });


    return value;

}


/* =========================================================
   22. SET SETTING VALUE
   ========================================================= */

function setSettingValue(
    path,
    value
) {

    const parts =
        path.split(".");


    let target =
        currentSettings;


    for (
        let i = 0;
        i < parts.length - 1;
        i++
    ) {

        if (
            !target[parts[i]]
        ) {

            target[parts[i]] = {};

        }


        target =
            target[parts[i]];

    }


    target[
        parts[parts.length - 1]
    ] = value;

}


/* =========================================================
   23. APPLY SETTINGS TO UI
   ========================================================= */

function applySettingsToUI() {

    /* Theme */

    applyTheme(
        currentSettings.appearance.theme
    );


    updateThemeButtons(
        currentSettings.appearance.theme
    );


    /* Accent */

    applyAccentColor(
        currentSettings.appearance.accent
    );


    updateAccentButtons(
        currentSettings.appearance.accent
    );


    /* Checkboxes */

    const toggles =
        document.querySelectorAll(
            'input[type="checkbox"][data-setting]'
        );


    toggles.forEach(toggle => {

        const value =
            getSettingValue(
                toggle.dataset.setting
            );


        if (
            typeof value === "boolean"
        ) {

            toggle.checked =
                value;

        }

    });


    /* Selects */

    const selects =
        document.querySelectorAll(
            "select[data-setting]"
        );


    selects.forEach(select => {

        const value =
            getSettingValue(
                select.dataset.setting
            );


        if (value !== undefined) {

            select.value =
                value;

        }

    });


    /* Profile inputs */

    const inputs =
        document.querySelectorAll(
            "input[data-setting]"
        );


    inputs.forEach(input => {

        if (
            input.type === "checkbox"
        ) {

            return;

        }


        const value =
            getSettingValue(
                input.dataset.setting
            );


        if (value !== undefined) {

            input.value =
                value;

        }

    });


    /* Number controls */

    updateNumberControls();


    /* Save bar */

    updateSaveBar(false);

}


/* =========================================================
   24. UPDATE NUMBER CONTROLS
   ========================================================= */

function updateNumberControls() {

    const diceControl =
        document.querySelector(
            '[data-control="number-of-dice"]'
        );


    if (diceControl) {

        const value =
            diceControl.querySelector(
                "[data-value]"
            );


        if (value) {

            value.textContent =
                currentSettings.dice.numberOfDice;

        }

    }


    const modifierControl =
        document.querySelector(
            '[data-control="modifier"]'
        );


    if (modifierControl) {

        const value =
            modifierControl.querySelector(
                "[data-value]"
            );


        if (value) {

            value.textContent =
                formatModifier(
                    currentSettings.dice.modifier
                );

        }

    }

}


/* =========================================================
   25. SAVE / CANCEL BUTTONS
   ========================================================= */

function initializeSaveButtons() {

    const saveButton =
        document.querySelector(
            ".save-button"
        );


    const cancelButton =
        document.querySelector(
            ".cancel-button"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            saveSettings
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            cancelChanges
        );

    }

}


/* =========================================================
   26. SAVE SETTINGS
   ========================================================= */

function saveSettings() {

    saveSettingsToStorage();


    savedSettings =
        JSON.parse(
            JSON.stringify(
                currentSettings
            )
        );


    updateSaveBar(false);


    showNotification(
        "Settings saved successfully."
    );

}


/* =========================================================
   27. CANCEL CHANGES
   ========================================================= */

function cancelChanges() {

    currentSettings =
        JSON.parse(
            JSON.stringify(
                savedSettings
            )
        );


    applySettingsToUI();


    showNotification(
        "Changes cancelled."
    );

}


/* =========================================================
   28. MARK UNSAVED
   ========================================================= */

function markUnsaved() {

    updateSaveBar(true);

}


/* =========================================================
   29. UPDATE SAVE BAR
   ========================================================= */

function updateSaveBar(hasChanges) {

    const message =
        document.querySelector(
            ".unsaved-message"
        );


    if (!message) {

        return;

    }


    message.style.opacity =
        hasChanges ? "1" : "0.45";


    const text =
        message.querySelector(
            "span:last-child"
        );


    if (text) {

        text.textContent =
            hasChanges
                ? "You have unsaved changes"
                : "All changes saved";

    }

}


/* =========================================================
   30. DATA BUTTONS
   ========================================================= */

function initializeDataButtons() {

    const buttons =
        document.querySelectorAll(
            ".data-action button, .data-summary button"
        );


    buttons.forEach(button => {

        const text =
            button.textContent
                .trim()
                .toLowerCase();


        if (text === "export") {

            button.addEventListener(
                "click",
                exportSettingsData
            );

        }


        if (
            text === "clear"
        ) {

            button.addEventListener(
                "click",
                clearRollHistory
            );

        }


        if (
            text === "export data"
        ) {

            button.addEventListener(
                "click",
                exportSettingsData
            );

        }

    });


    const resetButton =
        document.querySelector(
            ".reset-settings-card .danger-button"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetEverything
        );

    }

}


/* =========================================================
   31. EXPORT DATA
   ========================================================= */

function exportSettingsData() {

    const exportData = {

        application:
            "DiceForge",

        exportedAt:
            new Date().toISOString(),

        settings:
            currentSettings

    };


    const json =
        JSON.stringify(
            exportData,
            null,
            4
        );


    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "diceforge-settings.json";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showNotification(
        "Settings exported successfully."
    );

}


/* =========================================================
   32. CLEAR ROLL HISTORY
   ========================================================= */

function clearRollHistory() {

    const confirmed =
        window.confirm(
            "Are you sure you want to clear your roll history? This action cannot be undone."
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        "diceforgeRollHistory"
    );


    localStorage.removeItem(
        "rollHistory"
    );


    showNotification(
        "Roll history cleared."
    );

}


/* =========================================================
   33. RESET EVERYTHING
   ========================================================= */

function resetEverything() {

    const confirmed =
        window.confirm(
            "Reset all DiceForge settings to their default values?"
        );


    if (!confirmed) {

        return;

    }


    currentSettings =
        JSON.parse(
            JSON.stringify(
                DEFAULT_SETTINGS
            )
        );


    savedSettings =
        JSON.parse(
            JSON.stringify(
                DEFAULT_SETTINGS
            )
        );


    localStorage.removeItem(
        "diceforgeSettings"
    );


    applySettingsToUI();


    showNotification(
        "All settings have been reset."
    );

}


/* =========================================================
   34. NOTIFICATION
   ========================================================= */

function showNotification(message) {

    let notification =
        document.querySelector(
            ".settings-notification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );


        notification.className =
            "settings-notification";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notification.hideTimer
    );


    notification.hideTimer =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   35. SYSTEM THEME LISTENER
   ========================================================= */

const systemTheme =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


systemTheme.addEventListener(
    "change",
    () => {

        if (
            currentSettings.appearance.theme ===
            "system"
        ) {

            applyTheme(
                "system"
            );

        }

    }
);
