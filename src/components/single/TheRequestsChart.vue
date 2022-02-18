<template>
  <div>
    <canvas id="requests-chart" class="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import chartData from "../global/chart-data.js";

export default {
  name: "TheRequestsChart",
  data() {
    return {
      chartData: chartData,
    };
  },
  setup() {
      


  },
  mounted() {
    const ctx = document.getElementById("requests-chart");
    new Chart(ctx, this.chartData);
  },
};
</script>

<style lang="scss" scoped>

.chart {
    height: 72px;
    max-width: 232px;
}

</style>