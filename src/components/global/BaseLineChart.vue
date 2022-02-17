<template>
  <div>
    <canvas id="debt-chart" class="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import chartData from "./chart-data.js";

export default {
  name: "PlanetChart",
  data() {
    return {
      chartData: chartData,
    };
  },
  mounted() {
    const ctx = document.getElementById("debt-chart");
    new Chart(ctx, this.chartData);
  },
};
</script>

<style lang="scss" scoped>

.chart {
    height: 80px;
}

</style>