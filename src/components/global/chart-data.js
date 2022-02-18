// import { supabase } from "../../supabase/init";

// Set variables
// let debtChartData = [];
// let requestsChartData = [];

const getChartData = async () => {
    // const arrDebt = [];
    // const arrRequests = [];

    // const { data: allFeedback } = await supabase
    //     .from("feedback")
    //     .select("*,profiles(*),projects(*)")
    //     .eq("team_id", window.location.pathname.split("/")[2]);

    // allFeedback.map((fb) => {
    //     const moment = require("moment");
    //     fb._date = moment(fb.created_at, "YYYMMDD").format("MM/DD");

    //     if (fb.category.includes("issue")) {
    //         const obj = {};
    //         obj["date"] = fb._date;
    //         obj["count"] = 1;
    //         arrDebt.push(obj);
    //     }
    //     if (fb.category.includes("request")) {
    //         const obj = {};
    //         obj["date"] = fb._date;
    //         obj["count"] = 1;
    //         arrRequests.push(obj);
    //     }
    // });

    // debtChartData = arrDebt.reduce((acc, curr) => {
    //     let item = acc.find((item) => item.date === curr.date);

    //     if (item) {
    //         item.count += 1;
    //     } else {
    //         acc.push(curr);
    //     }
    //     return acc;
    // }, []);

    // requestsChartData = arrRequests.reduce((acc, curr) => {
    //     let item = acc.find((item) => item.date === curr.date);

    //     if (item) {
    //         item.count += 1;
    //     } else {
    //         acc.push(curr);
    //     }

    //     return acc;
    // }, []);

    // formatChartData();

    // console.log(debtChartData);
    // console.log(requestsChartData);
};
getChartData();

export const chartData = {
    type: "line",
    data: {
        labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
        datasets: [
            {
                data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
                backgroundColor: "#C9D1F8",
                borderColor: "#3253e4",
                borderWidth: 3
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 1,
                backgroundColor: "#3253e4",
            }
        },
        legend: {
            display: false
        },
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [
                {
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true,
                        padding: 0
                    }
                },
            ],
            xAxes: [
                {
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true,
                        padding: 0
                    }
                },
            ]
        }
    }
};


export default chartData;
