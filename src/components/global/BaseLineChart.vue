
<script>
import { Chart, Line } from "chart.js";


export default {
  extends: Line,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  setup(props) {
    console.log(props.chartData);
    const dates = props.chartData.map((d) => d.date);
    const totals = props.chartData.map((d) => d.total);

    Chart.register(Line);

    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: props.label,
            data: totals,
          },
        ],
      },
      props.options
    );
  },
};
</script>
