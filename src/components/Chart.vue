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

//charts start
const chartDataSets = ref([
  {
    label: "# of Sales",
    data: [],
    borderWidth: 1,
  },
]);
const chartDataLabels = ref(["2080-09", "2080-09"]);

const chartData = reactive({
  labels: chartDataLabels,
  datasets: chartDataSets,
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
const chartType = ref("line");
//charts ends
const getMonthName = (date_month) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(date_month));
};
const getSalesChartInfo = () => {
  axios
    .get("sales-chart-info/" + 6)
    .then((response) => {
      //   console.log(response.data.month);
      //   console.log(response.data.data);
      // chartDataSets.value[0].label = "# of Sales";
      for (let i = 0; i < response.data.month.length; i++) {
        // chartDataLabels.value[i] = response.data.month[i];
        chartDataLabels.value[i] = getMonthName(response.data.month[i]);
      }
      for (let i = 0; i < response.data.month.length; i++) {
        //this will assign to 0th data array for chart and ith items to data itself
        chartDataSets.value[0].data[i] = response.data.data[i];
      }

      // console.log(chartDataLabels);
      //   console.log(chartDataSets.value[0].label);
      //   console.log(chartDataSets.value[1].label);
      console.log(chartDataSets.value[0].data);
      //   console.log(chartDataSets.value[1].data);

      makeSalesChart();
    })
    .catch((error) => {
      console.log(error);
    });
};
const makeSalesChart = () => {
  const ctx = myChart.value;
  new Chart(ctx, {
    type: chartType.value,
    data: chartData,
    options: chartOptions,
  });
};

onMounted(() => {
  getSalesChartInfo();
});
</script>

<style scoped>
.chart {
  /* width: 100%; */
  /* height: 300px; */
}
</style>
