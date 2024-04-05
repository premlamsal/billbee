<template>
  <main id="Home-page">
    <h1 class="icon-head-page">
      <i class="fi fi-tr-house-chimney custom-flat-icons"></i>
      <span style="font-weight: 200"> Dashboard</span>
    </h1>
    <!-- <p>Welcome to Dashboad</p> -->
    <div class="dash-content">
      <div class="dash-box-container pb-20">
        <div class="box invoices">
          <i class="fi fi-tr-file-invoice-dollar custom-flat-icons"></i>
          <h3>Invoices</h3>
          <p>Rs. {{ dash.invoice }}</p>
        </div>
        <div class="box purchases">
          <i class="fi fi-tr-cart-shopping-fast custom-flat-icons"></i>
          <h3>Purchases</h3>
          <p>Rs. {{ dash.purchase }}</p>
        </div>
        <div class="box products">
          <i class="fi fi-tr-box-open-full custom-flat-icons"></i>
          <h3>Products</h3>
          <p>{{ dash.product }}</p>
        </div>
        <div class="box customers">
          <i class="fi fi-tr-review custom-flat-icons"></i>
          <h3>Customers</h3>
          <p>{{ dash.customer }}</p>
        </div>
        <div class="box suppliers">
          <i class="fi fi-tr-supplier-alt custom-flat-icons"></i>
          <h3>Suppliers</h3>
          <p>{{ dash.supplier }}</p>
        </div>
      </div>
    </div>

    <div class="">
      <Chart />
    </div>
  </main>
</template>
<script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const dash = reactive([]);
    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );
    const axios = inject("$axios");
    const toast = inject("$toast");

    onMounted(() => {
      getDashInfo();
      // updateTitle();
    });

    // const pageTitle = ref("Home" + " | " + import.meta.env.VITE_MY_APP_NAME);

    // const updateTitle = () => {
    //   document.title = pageTitle.value;
    // };

    const getDashInfo = () => {
      dash.length = 0;
      axios
        .get("dashInfo")
        .then((response) => {
          // console.log(response.data.product);
          dash.product = response.data.product;
          dash.stock = response.data.stock;
          dash.invoice = response.data.invoice;
          dash.purchase = response.data.purchase;
          dash.supplier = response.data.supplier;
          dash.customer = response.data.customer;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      dash,
      VITE_MY_APP_BACK_URL_HOME,
    };
  },
};
</script>
<style  scoped>
.dash-content {
  margin-top: 10px;
  /* background: #fff; */
  /* padding: 1em; */
  margin-bottom: 10px;
}
.dash-content span.material-icons {
  font-size: 40px;
}
/* .dash-content span.material-icons:hover {
  font-size: 50px;
  transition: all 0.3s ease-in-out;
} */
.dash-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* align-items: center; */
  /* height: 100vh; */
  /* background-color: #f2f2f2; */
}

.box {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 200px; */
  flex: 1;
  /* height: 200px; */
  padding: 2em;
  margin: 0.3em;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  /* margin-bottom: 20px; */
  transition: all 0.3s ease-in-out;
  margin-bottom: 15px;
}

.box:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
}

.box i {
  font-size: 50px;
  margin-bottom: 20px;
}

.box h3 {
  font-size: 24px;
  margin: 0;
  padding: 0;
  font-weight: 100;
}

.box p {
  font-size: 16px;
  margin: 0;
  padding: 0;
}

.purchases {
  color: white;
  background: linear-gradient(45deg, #4099ff, #73b4ff);
}

.suppliers {
  /* background-color: #ff7b25; */
  background: linear-gradient(45deg, #8bc34a, #cddc39);
  color: white;
}

.customers {
  /* background-color: #009245; */
  color: white;
  background: linear-gradient(45deg, #2ed8b6, #59e0c5);
}

.products {
  /* background-color: #d2232a; */
  color: white;
  background: linear-gradient(45deg, #ffb64d, #ffcb80);
}

.invoices {
  /* background-color: #ffd200; */
  color: white;
  background: linear-gradient(45deg, #ff5370, #ff869a);
}
.material-icons {
  transition: transform 0.9s ease-in-out;
}
.material-icons:hover {
  transform: rotate(360deg);
}
.pt-20 {
  padding-top: 20px;
}
.pb-20 {
  padding-bottom: 20px;
}
</style>