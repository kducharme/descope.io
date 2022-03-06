<template>
  <div v-show="loaded">
    <p class="title">This week</p>
    <p class="weekly">{{ totalDebtCount }} feedback added this week</p>
    <div class="chartContainer">
      <canvas id="feedback-chart" class="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { ref } from "vue";
import { supabase } from "../../supabase/init";

export default {
  name: "TheDebtChart",
  setup() {
    // Setup variables and data
    const issueData = ref(null);
    const questionData = ref(null);
    const totalDebtCount = ref(null);
    const loaded = ref(null);

    const countTotal = () => {
      let total = 0;
      issueData.value.forEach((d) => {
        total += d.y;
      });
      totalDebtCount.value = total;
      console.log(totalDebtCount.value);
      loaded.value = true;
    };

    const renderChart = () => {
      const ctx = document.getElementById("feedback-chart");
      new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: false,
              data: issueData.value,
              parsing: {
                yAxisKey: "y",
                xAxisKey: "x",
              },
              backgroundColor: "#f1f3fc",
              borderColor: "#3253e4",
              borderWidth: 3,
              pointRadius: 0,
              pointBackgroundColor: "#EF767A",
              pointHoverBackgroundColor: "#883E30",
            },
            {
              label: false,
              data: questionData.value,
              parsing: {
                yAxisKey: "y",
                xAxisKey: "x",
              },
              backgroundColor: "#f1f3fc",
              borderColor: "#cd1231",
              borderWidth: 3,
              pointRadius: 0,
              pointBackgroundColor: "#EF767A",
              pointHoverBackgroundColor: "#883E30",
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
      // const arrDebt = [];
      const moment = require("moment");
      moment.suppressDeprecationWarnings = true;

      const timePeriod = [0, 1, 2, 3, 4, 5, 6];
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

      issueData.value = chartData;

      const { data: allFeedback } = await supabase
        .from("feedback")
        .select("*,profiles(*),projects(id, *)")
        .eq("team_id", window.location.pathname.split("/")[2]);

      allFeedback.forEach((fb) => {
        const moment = require("moment");
        fb._date = moment(fb.created_at).format("MMM D, YYYY");

        // if (fb.category.includes("issue")) {
          issueData.value.forEach((date) => {
            if (date.x === fb._date) {
              return (date.y += 1);
            }
          });
        // }
        // if (fb.category.includes("question")) {
        //   console.log('hi')
        //   questionData.value.forEach((date) => {
        //     if (date.x === fb._date) {
        //       return (date.y += 1);
        //     }
        //   });
        // }
      });

      renderChart();
      countTotal();
    };
    getChartData();

    return { issueData, totalDebtCount, loaded };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.chartContainer {
  height: 64px;
  width: 200px;
  // max-height: 88px;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.chart {
  height: 64px;
  width: 178px;
  max-width: 178px;
  max-height: 80px;
  margin-left: -4px;
  margin-bottom: 24px;
}

.weekly {
  color: #636c92;
  font-size: 12px;
  margin: 8px 0 24px 0px;
}
</style>