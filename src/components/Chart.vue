<template>
  <div class="chart-container">
    <h4>
      Chart Report of Purchase / Sales Before:
      {{ chartDataBeforeMonth }} month(s)
    </h4>
    <div class="chart-out-holder">
      <div class="chart-box">
        <canvas ref="myChart"></canvas>
      </div>
    </div>
    <div class="chart-container-footer mt-20">
      <div class="chart-before-month-select-container">
        <div class="month-select-holder">
          <label>Report Before: </label>
          <select
            v-model="chartDataBeforeMonth"
            @change="monthSelectorChange()"
          >
            <option disabled>Select month</option>
            <option value="3">3 month</option>
            <option value="6">6 month</option>
            <option value="9">9 month</option>
            <option value="12">12 month</option>
          </select>
        </div>
      </div>
      <div class="chart-type-select-container">
        <div class="chart-type-select-holder">
          <label>Chart Type: </label>
          <select v-model="chartType" @change="chartTypeChange()">
            <option disabled>Select chart type</option>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <!-- only for premium user -->
            <option value="bubble">Bubble</option>

            <!-- only for premium user -->
          </select>
        </div>
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
    label: "# of Purchase",
    data: [],
    borderWidth: 1,
    fill: true,
    // backgroundColor: [
    //   "rgb(255, 84, 64,0.6)",
    //   "rgba(54, 162, 235, 0.6)",
    //   "rgba(255, 206, 86, 0.6)",
    //   "rgba(75, 192, 192, 0.6)",
    //   "rgba(153, 102, 255, 0.6)",
    //   "rgba(255, 159, 64, 0.6)",
    // ],
  },
  {
    label: "# of Sales",
    data: [],
    borderWidth: 1,
    fill: true,
    // backgroundColor: [
    //   "rgb(255, 84, 64,0.6)",
    //   "rgba(54, 162, 235, 0.6)",
    //   "rgba(255, 206, 86, 0.6)",
    //   "rgba(75, 192, 192, 0.6)",
    //   "rgba(153, 102, 255, 0.6)",
    //   "rgba(255, 159, 64, 0.6)",
    // ],
  },
]);
const chartDataLabels = ref(["2080-09", "2080-09"]);

const chartData = reactive({
  labels: chartDataLabels,
  datasets: chartDataSets,
});

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
const chartType = ref("bar");
const chartDataBeforeMonth = ref(6);
//charts ends
const getMonthName = (date_month) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(date_month));
};

const monthSelectorChange = () => {
  console.log(chart.value);
  if (chart) {
    chart.value.destroy();
  }
  getSalesChartInfo(chartDataBeforeMonth.value);
};
const chartTypeChange = () => {
  if (chart) {
    chart.value.destroy();
  }
  getSalesChartInfo(chartDataBeforeMonth.value);
};
const getSalesChartInfo = (before_month) => {
  axios
    .get("sales-chart-info/" + before_month)
    .then((response) => {
      //   console.log(response.data.month);
      //   console.log(response.data.data);
      // chartDataSets.value[0].label = "# of Sales";
      chartDataLabels.value = [];

      for (let i = 0; i < response.data.month.length; i++) {
        // chartDataLabels.value[i] = response.data.month[i];
        chartDataLabels.value[i] = response.data.month[i];
      }
      chartDataSets.value[0].data = [];
      chartDataSets.value[1].data = [];

      for (let i = 0; i < response.data.month.length; i++) {
        //this will assign to 0th data array for chart and ith items to data itself
        chartDataSets.value[0].data[i] = response.data.purchase_data[i];
        chartDataSets.value[1].data[i] = response.data.sales_data[i];
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
const chart = ref(null);

const makeSalesChart = () => {
  const ctx = myChart.value;
  chart.value = new Chart(ctx, {
    type: chartType.value,
    data: chartData,
    options: chartOptions,
  });
};

onMounted(() => {
  getSalesChartInfo(chartDataBeforeMonth.value);
});
</script>

<style scoped>
.chart-box {
  position: relative;
  margin: auto;
  height: 300px;
  width: 95%;
}

.chart-container {
  background: #fff;
  padding: 1em;
}
.mt-20 {
  margin-top: 20px;
}
.chart-container-footer {
  display: flex;
  justify-content: space-between;
}
</style>
