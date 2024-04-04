<template>
  <div class="chart-container">
    <h4 class="mt-20 mb-20">
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
            class="custom-select"
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
          <select
            v-model="chartType"
            @change="chartTypeChange()"
            class="custom-select"
          >
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
    borderWidth: 4,
    fill: true,
    tension: 0.3, // Adjust tension for smooth curves
    backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue color with transparency
    borderColor: "rgb(54, 162, 235)", // Blue color
  },
  {
    label: "# of Sales",
    data: [],
    borderWidth: 4,
    fill: true,
    tension: 0.3, // Adjust tension for smooth curves

    backgroundColor: "rgba(255, 99, 132, 0.2)", // Red color with transparency
    borderColor: "rgb(255, 99, 132)", // Red color
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
  plugins: {
    filler: {
      propagate: false,
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
const chartType = ref("line"); // Set default chart type to line
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
  getSalesPurchaseChartInfo(chartDataBeforeMonth.value);
};
const chartTypeChange = () => {
  if (chart) {
    chart.value.destroy();
  }
  getSalesPurchaseChartInfo(chartDataBeforeMonth.value);
};
const getSalesPurchaseChartInfo = (before_month) => {
  axios
    .get("sales-purchase-chart-info/" + before_month)
    .then((response) => {
      chartDataLabels.value = [];

      for (let i = 0; i < response.data.month.length; i++) {
        chartDataLabels.value[i] = getMonthName(response.data.month[i]);
      }
      chartDataSets.value[0].data = [];
      chartDataSets.value[1].data = [];

      for (let i = 0; i < response.data.month.length; i++) {
        chartDataSets.value[0].data[i] = response.data.purchase_data[i];
        chartDataSets.value[1].data[i] = response.data.sales_data[i];
      }

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
  getSalesPurchaseChartInfo(chartDataBeforeMonth.value);
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
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.chart-container h4 {
  text-align: center;
}
.mt-20 {
  margin-top: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
.chart-container-footer {
  display: flex;
  justify-content: space-between;
}
/* Style for the custom select */
.custom-select {
  appearance: none;
  outline: none;
  background-color: #6e726e30;
  padding: 10px 40px 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}

/* Style for the arrow icon */
.custom-select::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-left: 2px solid #333;
  border-bottom: 2px solid #333;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
}

/* Style for the arrow icon on hover */
.custom-select:hover::after {
  transform: translateY(-50%) rotate(-45deg);
}

/* Style for the options */
.custom-select option {
  background-color: rgb(223, 215, 215);
  color: #333;
}
</style>
