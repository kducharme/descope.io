<template>
  <div>
    <canvas id="debt-chart" class="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import chartData from "../global/chart-data.js";
import { ref } from "vue";
import { supabase } from "../../supabase/init";

export default {
  name: "TheDebtChart",
  data() {
    return {
      chartData: chartData,
    };
  },
  setup() {
    // Setup variables and data
    const debtChartData = ref(null);

    const renderChart = () => {
      // let start = new Date(),
      //   end = new Date();

      // start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
      // start.setHours(0, 0, 0, 0); // set to midnight.

      const ctx = document.getElementById("debt-chart");
      new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: false,
              data: debtChartData.value,
              parsing: {
                yAxisKey: "y",
                xAxisKey: "x",
              },
              backgroundColor: "#FDEDED",
              borderColor: "#EF767A",
              borderWidth: 3,
              pointRadius: 2,
            },
          ],
        },
        options: {
          layout: {
            padding: {
              top: 5,
              right: 3,
              left: 3,
            },
          },
          legend: {
            display: false,
            position: "bottom",
          },
          maintainAspectRatio: true,
          elements: {
            point: {
              radius: 1,
              backgroundColor: "#3253e4",
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: false,
                  beginAtZero: true,
                  padding: 0,
                },
                type: "time",
                time: {
                  unit: "day",
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: false,
                  beginAtZero: true,
                  padding: 0,
                },
              },
            ],
          },
        },
      });
    };

    const getChartData = async () => {
      // const arrDebt = [];
      const moment = require("moment");

      const timePeriod = [0, 1, 2, 3, 4, 5, 6];
      const chartData = []

      timePeriod.forEach((t) => {
        let date = new Date();
        date.setDate(date.getDate() - t);
        date = moment(date).format("MMM D, YYYY");

        const dateObject = {
          x: date,
          y: 0,
        };

        chartData.push(dateObject);
      });

      debtChartData.value = chartData;

      console.log(debtChartData.value)

      const { data: allFeedback } = await supabase
        .from("feedback")
        .select("*,profiles(*),projects(*)")
        .eq("team_id", window.location.pathname.split("/")[2]);

      allFeedback.forEach((fb) => {
        const moment = require("moment");
        fb._date = moment(fb.created_at).format("MMM D, YYYY");

        if (fb.category.includes("issue")) {

          debtChartData.value.forEach(date => {
            if (date.x === fb._date) {
              return date.y += 1;
            }
          })

          // const obj = {};
          // obj["id"] = fb.id;
          // obj["x"] = fb._date;
          // obj["y"] = 1;
          // arrDebt.push(obj);
        }
      });

      // debtChartData.value = arrDebt.reduce((acc, curr) => {
      //   let item = acc.find((item) => item.x === curr.x);
      //   if (item) {
      //     item.y += 1;
      //   } else {
      //     acc.push(curr);
      //   }
      //   return acc;
      // }, []);

      // debtChartData.value.sort(function (a, b) {
      //   return new Date(b.x) - new Date(a.x);
      // });

      renderChart();
    };
    getChartData();

    return {};
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.chart {
  height: 80px;
  // max-width: 240px;
  margin-left: -4px;
  // padding: 5px;
}
</style>