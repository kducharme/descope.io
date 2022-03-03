<template>
  <div v-show="loaded">
    <p class="weekly">{{ totalQuestionCount }} added in the last 14 days</p>
    <div class="chartContainer">
      <canvas id="question-chart" class="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { ref } from "vue";
import { supabase } from "../../supabase/init";

export default {
  name: "TheQuestionChart",
  setup() {
    // Setup variables and data
    const questionChartData = ref(null);
    const totalQuestionCount = ref(null);
    const loaded = ref(null);

    const countTotal = () => {
      let total = 0;
      questionChartData.value.forEach((d) => {
        total += d.y;
      });
      totalQuestionCount.value = total;
    };

    const renderChart = () => {
      const ctx = document.getElementById("question-chart");
      new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: false,
              data: questionChartData.value,
              parsing: {
                yAxisKey: "y",
                xAxisKey: "x",
              },
              backgroundColor: "#F3F4F7",
              borderColor: "#5B6386",
              borderWidth: 3,
              pointRadius: 0,
              pointBackgroundColor: "#23967F",
              pointHoverBackgroundColor: "#23967F",
            },
          ],
        },
        options: {
          animation: {
            duration: 0,
          },
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
          maintainAspectRatio: false,
          responsive: false,
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
      loaded.value = true;
    };

    const getChartData = async () => {
      const moment = require("moment");
      moment.suppressDeprecationWarnings = true;

      const timePeriod = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      const chartData = [];

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

      questionChartData.value = chartData;

      const { data: allFeedback } = await supabase
        .from("feedback")
        .select("*,profiles(*),projects(id, *)")
        .eq("team_id", window.location.pathname.split("/")[2]);

      allFeedback.forEach((fb) => {
        const moment = require("moment");
        fb._date = moment(fb.created_at).format("MMM D, YYYY");

        if (fb.category.includes("question")) {
          questionChartData.value.forEach((date) => {
            if (date.x === fb._date) {
              return (date.y += 1);
            }
          });
        }
      });

      renderChart();
      countTotal();
    };
    getChartData();

    return { totalQuestionCount, loaded };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.chartContainer {
  height: 64px;
  width: 200px;
}

.chart {
  // height: 64px;
  width: 200px;
  max-height: 80px;
  margin-left: -4px;
  margin-bottom: 8px;
}

.weekly {
  color: #636c92;
  font-size: 12px;
  margin: 8px 0 16px 0px;
}
</style>