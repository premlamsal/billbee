<template>
  <main id="Home-page">
    <h1>Dashboard</h1>
    <p>Welcome to Dashboad</p>
    <div class="dash-content">
      <div class="dash-box-container">
        <div class="box users">
          <span class="material-icons">receipt_long</span>
          <h3>Invoices</h3>
          <p>Rs. {{ dash.invoice }}</p>
        </div>
        <div class="box invoices">
          <span class="material-icons">description</span>
          <h3>Purchases</h3>
          <p>Rs. {{ dash.purchase }}</p>
        </div>
        <div class="box orders">
          <span class="material-icons">shopping_bag</span>
          <h3>Products</h3>
          <p>{{ dash.product }}</p>
        </div>
        <div class="box expenses">
          <span class="material-icons">supervised_user_circle</span>
          <h3>Customers</h3>
          <p>{{ dash.customer }}</p>
        </div>
        <div class="box income">
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

.users {
  background-color: #00a1e4;
  color: white;
}

.invoices {
  background-color: #ff7b25;
  color: white;
}

.orders {
  background-color: #009245;
  color: white;
}

.expenses {
  background-color: #d2232a;
  color: white;
}

.income {
  background-color: #ffd200;
  color: #555;
}
</style>