<template>
  <div class="chart-container">
    <h4>Chart</h4>
    <div class="chart-box">
      <div class="chart" style="position: relative; width: 50vw">
        <canvas ref="myChart"></canvas>
      </div>
    </div>
  </div>
</template>
<script setup>
import Chart from "chart.js/auto";
import { onMounted, ref, inject, reactive } from "vue";

const myChart = ref(null);
const axios = inject("$axios");
const chartData = reactive({
  labels: ["JAN", "FEB", "MAR", "JUN", "JULY", "AUG"],
  datasets: [
    {
      label: "# of Purchase",
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
    },
    // {
    //   label: "# of Sales",
    //   data: [9, 19, 50, 90, 100, 200],
    //   borderWidth: 1,
    // },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
const chartType = ref("bar");

onMounted(() => {
  console.log(chartType.value);
  console.log(chartOptions);
  console.log(chartData);

  getSalesChartInfo();
  const ctx = myChart.value;
  new Chart(ctx, {
    type: chartType.value,
    data: chartData,
    options: chartOptions,
  });
});

const getSalesChartInfo = () => {
  axios
    .get("sales-chart-info/" + 6)
    .then((response) => {
      //   console.log(response.data.month);
      //   console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped>
.chart {
  /* width: 100%; */
  /* height: 300px; */
}
</style>
