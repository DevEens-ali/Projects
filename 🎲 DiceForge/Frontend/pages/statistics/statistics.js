/* =================================
   DICEF0RGE STATISTICS PAGE
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
         * Initialize Statistics
         */

        initializeStatistics();

    }
);


/* =================================
   CHART INSTANCES
   ================================= */

let performanceChart = null;

let diceUsageChart = null;

let distributionChart = null;


/* =================================
   INITIALIZATION
   ================================= */

function initializeStatistics() {

    createPerformanceChart();

    createDiceUsageChart();

    createDistributionChart();

    setupPeriodButtons();

}


/* =================================
   CHART DEFAULT SETTINGS
   ================================= */

function getChartFont() {

    return {
        family: "Inter, Arial, sans-serif",
        size: 11
    };

}


/* =================================
   PERFORMANCE CHART
   ================================= */

function createPerformanceChart() {

    const canvas =
        document.querySelector(
            "#performance-chart"
        );


    if (!canvas) {

        return;

    }


    const context =
        canvas.getContext("2d");


    /*
     * Gradient for line fill
     */

    const gradient =
        context.createLinearGradient(
            0,
            0,
            0,
            330
        );


    gradient.addColorStop(
        0,
        "rgba(155, 77, 255, 0.28)"
    );


    gradient.addColorStop(
        1,
        "rgba(155, 77, 255, 0.00)"
    );


    performanceChart =
        new Chart(
            context,
            {

                type: "line",

                data: {

                    labels: [
                        "Roll 1",
                        "Roll 2",
                        "Roll 3",
                        "Roll 4",
                        "Roll 5",
                        "Roll 6",
                        "Roll 7",
                        "Roll 8",
                        "Roll 9",
                        "Roll 10",
                        "Roll 11",
                        "Roll 12"
                    ],

                    datasets: [

                        {

                            label: "Roll Result",

                            data: [
                                8,
                                14,
                                6,
                                17,
                                11,
                                20,
                                9,
                                15,
                                12,
                                18,
                                7,
                                16
                            ],

                            borderColor:
                                "#9b4dff",

                            backgroundColor:
                                gradient,

                            borderWidth: 2,

                            pointRadius: 4,

                            pointHoverRadius: 7,

                            pointBackgroundColor:
                                "#9b4dff",

                            pointBorderColor:
                                "#ffffff",

                            pointBorderWidth: 1,

                            tension: 0.4,

                            fill: true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    interaction: {

                        intersect: false,

                        mode: "index"

                    },

                    plugins: {

                        legend: {

                            display: false

                        },

                        tooltip: {

                            backgroundColor:
                                "#151722",

                            borderColor:
                                "rgba(155, 77, 255, 0.35)",

                            borderWidth: 1,

                            titleColor:
                                "#ffffff",

                            bodyColor:
                                "#c4c6d0",

                            padding: 12,

                            displayColors: false,

                            callbacks: {

                                label:
                                    function (
                                        context
                                    ) {

                                        return `Result: ${context.raw}`;

                                    }

                            }

                        }

                    },

                    scales: {

                        x: {

                            grid: {

                                display: false

                            },

                            ticks: {

                                color:
                                    "#707384",

                                font:
                                    getChartFont()

                            },

                            border: {

                                display: false

                            }

                        },

                        y: {

                            beginAtZero: true,

                            max: 20,

                            ticks: {

                                stepSize: 5,

                                color:
                                    "#707384",

                                font:
                                    getChartFont()

                            },

                            grid: {

                                color:
                                    "rgba(255,255,255,0.05)"

                            },

                            border: {

                                display: false

                            }

                        }

                    },

                    animation: {

                        duration: 1200,

                        easing: "easeOutQuart"

                    }

                }

            }
        );

}


/* =================================
   DICE USAGE CHART
   ================================= */

function createDiceUsageChart() {

    const canvas =
        document.querySelector(
            "#dice-usage-chart"
        );


    if (!canvas) {

        return;

    }


    const context =
        canvas.getContext("2d");


    diceUsageChart =
        new Chart(
            context,
            {

                type: "bar",

                data: {

                    labels: [
                        "D4",
                        "D6",
                        "D8",
                        "D10",
                        "D12",
                        "D20"
                    ],

                    datasets: [

                        {

                            label: "Rolls",

                            data: [
                                18,
                                31,
                                22,
                                12,
                                25,
                                32
                            ],

                            backgroundColor: [
                                "rgba(155, 77, 255, 0.35)",
                                "rgba(155, 77, 255, 0.45)",
                                "rgba(155, 77, 255, 0.50)",
                                "rgba(155, 77, 255, 0.40)",
                                "rgba(155, 77, 255, 0.60)",
                                "rgba(155, 77, 255, 0.80)"
                            ],

                            borderColor:
                                "#9b4dff",

                            borderWidth: 1,

                            borderRadius: 7,

                            borderSkipped: false

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            display: false

                        },

                        tooltip: {

                            backgroundColor:
                                "#151722",

                            borderColor:
                                "rgba(155, 77, 255, 0.35)",

                            borderWidth: 1,

                            titleColor:
                                "#ffffff",

                            bodyColor:
                                "#c4c6d0",

                            padding: 12,

                            displayColors: false,

                            callbacks: {

                                label:
                                    function (
                                        context
                                    ) {

                                        return `${context.raw} rolls`;

                                    }

                            }

                        }

                    },

                    scales: {

                        x: {

                            grid: {

                                display: false

                            },

                            ticks: {

                                color:
                                    "#8b8e9d",

                                font:
                                    getChartFont()

                            },

                            border: {

                                display: false

                            }

                        },

                        y: {

                            beginAtZero: true,

                            ticks: {

                                stepSize: 10,

                                color:
                                    "#707384",

                                font:
                                    getChartFont()

                            },

                            grid: {

                                color:
                                    "rgba(255,255,255,0.05)"

                            },

                            border: {

                                display: false

                            }

                        }

                    },

                    animation: {

                        duration: 1000,

                        easing: "easeOutQuart"

                    }

                }

            }
        );

}


/* =================================
   RESULT DISTRIBUTION
   ================================= */

function createDistributionChart() {

    const canvas =
        document.querySelector(
            "#distribution-chart"
        );


    if (!canvas) {

        return;

    }


    const context =
        canvas.getContext("2d");


    distributionChart =
        new Chart(
            context,
            {

                type: "line",

                data: {

                    labels: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20"
                    ],

                    datasets: [

                        {

                            label:
                                "Frequency",

                            data: [
                                2,
                                4,
                                5,
                                7,
                                6,
                                9,
                                8,
                                10,
                                6,
                                12,
                                8,
                                11,
                                7,
                                9,
                                6,
                                8,
                                5,
                                7,
                                4,
                                3
                            ],

                            borderColor:
                                "#9b4dff",

                            backgroundColor:
                                "rgba(155, 77, 255, 0.12)",

                            borderWidth: 2,

                            pointRadius: 3,

                            pointHoverRadius: 6,

                            pointBackgroundColor:
                                "#9b4dff",

                            tension: 0.4,

                            fill: true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            display: false

                        },

                        tooltip: {

                            backgroundColor:
                                "#151722",

                            borderColor:
                                "rgba(155, 77, 255, 0.35)",

                            borderWidth: 1,

                            titleColor:
                                "#ffffff",

                            bodyColor:
                                "#c4c6d0",

                            padding: 12,

                            displayColors: false,

                            callbacks: {

                                label:
                                    function (
                                        context
                                    ) {

                                        return `${context.raw} times`;

                                    }

                            }

                        }

                    },

                    scales: {

                        x: {

                            title: {

                                display: true,

                                text: "Result",

                                color:
                                    "#707384",

                                font:
                                    getChartFont()

                            },

                            grid: {

                                display: false

                            },

                            ticks: {

                                color:
                                    "#707384",

                                font:
                                    getChartFont()

                            },

                            border: {

                                display: false

                            }

                        },

                        y: {

                            beginAtZero: true,

                            ticks: {

                                color:
                                    "#707384",

                                font:
                                    getChartFont()

                            },

                            grid: {

                                color:
                                    "rgba(255,255,255,0.05)"

                            },

                            border: {

                                display: false

                            }

                        }

                    },

                    animation: {

                        duration: 1200,

                        easing: "easeOutQuart"

                    }

                }

            }
        );

}


/* =================================
   PERIOD BUTTONS
   ================================= */

function setupPeriodButtons() {

    const buttons =
        document.querySelectorAll(
            ".period-button"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    /*
                     * Remove active state
                     */

                    buttons.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                     * Activate clicked button
                     */

                    button.classList.add(
                        "active"
                    );


                    /*
                     * Get selected period
                     */

                    const period =
                        button.dataset.period;


                    updatePerformancePeriod(
                        period
                    );

                }
            );

        }
    );

}


/* =================================
   UPDATE PERFORMANCE PERIOD
   ================================= */

function updatePerformancePeriod(period) {

    if (!performanceChart) {

        return;

    }


    let labels = [];

    let data = [];


    /*
     * All time
     */

    if (
        period === "all"
    ) {

        labels = [
            "Roll 1",
            "Roll 2",
            "Roll 3",
            "Roll 4",
            "Roll 5",
            "Roll 6",
            "Roll 7",
            "Roll 8",
            "Roll 9",
            "Roll 10",
            "Roll 11",
            "Roll 12"
        ];


        data = [
            8,
            14,
            6,
            17,
            11,
            20,
            9,
            15,
            12,
            18,
            7,
            16
        ];

    }


    /*
     * Last 30 rolls
     */

    else if (
        period === "30"
    ) {

        labels = [
            "1",
            "5",
            "10",
            "15",
            "20",
            "25",
            "30"
        ];


        data = [
            9,
            13,
            7,
            18,
            11,
            16,
            14
        ];

    }


    /*
     * Last 7 rolls
     */

    else if (
        period === "7"
    ) {

        labels = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7"
        ];


        data = [
            12,
            8,
            17,
            11,
            20,
            14,
            16
        ];

    }


    /*
     * Update chart
     */

    performanceChart.data.labels =
        labels;


    performanceChart.data.datasets[0].data =
        data;


    performanceChart.update();

}


/* =================================
   UPDATE STATISTICS
   ================================= */

function updateStatistics(
    total,
    average,
    best,
    luck
) {

    const totalElement =
        document.querySelector(
            "#total-rolls"
        );


    const averageElement =
        document.querySelector(
            "#average-roll"
        );


    const bestElement =
        document.querySelector(
            "#best-roll"
        );


    const luckElement =
        document.querySelector(
            "#luck-score"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (averageElement) {

        averageElement.textContent =
            average;

    }


    if (bestElement) {

        bestElement.textContent =
            best;

    }


    if (luckElement) {

        luckElement.textContent =
            `${luck}%`;

    }

}
