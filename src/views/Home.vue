<template>
  <main id="Home-page">
    <h1>Dashboard</h1>
    <p>Welcome to Dashboad</p>
    <div class="dash-content">
      <div class="dash-box-container">
        <div class="box invoices">
          <span class="material-icons">receipt_long</span>
          <h3>Invoices</h3>
          <p>Rs. {{ dash.invoice }}</p>
        </div>
        <div class="box purchases">
          <span class="material-icons">description</span>
          <h3>Purchases</h3>
          <p>Rs. {{ dash.purchase }}</p>
        </div>
        <div class="box products">
          <span class="material-icons">shopping_bag</span>
          <h3>Products</h3>
          <p>{{ dash.product }}</p>
        </div>
        <div class="box customers">
          <span class="material-icons">supervised_user_circle</span>
          <h3>Customers</h3>
          <p>{{ dash.customer }}</p>
        </div>
        <div class="box suppliers">
          <span class="material-icons">local_shipping</span>
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
    });

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
<style>
.dash-content {
  margin-top: 20px;
  background: #fff;
  padding: 1em;
  margin-bottom: 25px;
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
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  /* margin-bottom: 20px; */
  transition: all 0.3s ease-in-out;
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
}

.box p {
  font-size: 16px;
  margin: 0;
  padding: 0;
}

.purchases {
  background: linear-gradient(45deg, #8bc34a, #cddc39);
  color: white;
}

.suppliers {
  /* background-color: #ff7b25; */
  color: white;
  background: linear-gradient(45deg, #4099ff, #73b4ff);
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
</style>