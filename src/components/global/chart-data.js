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
            point:{
                radius: 0
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
