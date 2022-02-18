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
    const chartData = ref(null);

    const renderChart = () => {
      console.log(chartData.value);
      let start = new Date(),
        end = new Date();

      start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
      start.setHours(0, 0, 0, 0); // set to midnight.

      const ctx = document.getElementById("debt-chart");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["A", "B", "B", "B", "B"],
          datasets: [
            {
              label: false,
              data: chartData.value,
              parsing: {
                yAxisKey: "count",
              },
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  min: start,
                  max: end,
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
            // xAxes: [
            //   {
            //     gridLines: {
            //       display: false,
            //     },
            //     ticks: {
            //       display: false,
            //       beginAtZero: true,
            //       padding: 0,
            //     },
            //     // type: "time",
            //     // time: {
            //     //   min: start,
            //     //   max: end,
            //     //   unit: "day",
            //     // },
            //   },
            // ],
          },
        },
      });
    };

    const getChartData = async () => {
      const arrDebt = [];

      const { data: allFeedback } = await supabase
        .from("feedback")

        .select("*,profiles(*),projects(*)")
        .eq("team_id", window.location.pathname.split("/")[2]);
      allFeedback.map((fb) => {
        const moment = require("moment");
        fb._date = moment(fb.created_at, "YYYMMDD").format("MM/DD");
        if (fb.category.includes("issue")) {
          const obj = {};
          obj["date"] = fb._date;
          obj["count"] = 1;
          arrDebt.push(obj);
        }
      });

      chartData.value = arrDebt.reduce((acc, curr) => {
        let item = acc.find((item) => item.date === curr.date);
        if (item) {
          item.count += 1;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);

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
  height: 72px;
  max-width: 232px;
}
</style>