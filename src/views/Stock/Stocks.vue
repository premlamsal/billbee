<template>
  <main id="stocks-page">
    <h1>Stocks</h1>

    <div class="stock-header">
      <!-- <div class="link-button-container">
        <router-link to="/categories"> Categories </router-link>
        <router-link to="/units"> Units </router-link>
      </div> -->
      <!-- <button class="btn-new-stock" @click="addStockBtn()">
        <span class="btn-name"> New Stock</span>
        <span class="material-icons">add_circle</span>
      </button> -->
    </div>
    <div class="stocks-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
      >
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="stock in stocks" v-bind:key="stock.id">
              <tr v-if="stocks != null">
                <td>{{ stock.product.custom_product_id }}</td>
                <td>
                  <div class="invoiceItemStockName">
                    <div v-if="stock.image">
                      <div v-if="isValidHttpUrl(stock.image)">
                        <img
                          style="border-radius: 50%"
                          :src="stock.image"
                          width="40"
                          height="40"
                          :alt="stock.name"
                        />
                      </div>
                      <div v-else>
                        <img
                          style="border-radius: 50%"
                          :src="VITE_MY_APP_BACK_URL_HOME + stock.image"
                          width="40"
                          height="40"
                          :alt="stock.name"
                        />
                      </div>
                    </div>

                    <div style="margin-left: 10%">
                      {{ stock.product.name }}
                    </div>
                  </div>
                </td>
                <td>{{ stock.product.category.name }}</td>
                <td>{{ stock.quantity }} {{ stock.unit.short_name }}</td>

                <td>{{ stock.price }}</td>
                <td>{{ stock.quantity * stock.product.cp }}</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style="font-weight: bold">Grand Total</td>
              <td style="font-weight: bold">{{ grandTotalStock }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
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
    const stocks = reactive([]);
    const errors = ref({});

    const axios = inject("$axios");
    const toast = inject("$toast");
    const stock = reactive({});
    const image = ref("");
    const imagePreview = ref(""); //for displaying image while uploading

    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );

    //on mounted start
    onMounted(() => {
      getStocks();
      setAvtarUploadImage();
    });

    //end of onMounted

    const setAvtarUploadImage = () => {
      // imagePreview.value = "/img/upload_image.png";
    };

    const isValidHttpUrl = (check_url) => {
      const pattern = new RegExp(
        "^([a-zA-Z]+:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
      );
      return pattern.test(check_url);
    };
    const grandTotalStock = computed(() => {
      //reduce function is used to sum the array elements
      stocks.grandTotal = stocks.reduce(function (carry, stock) {
        return carry + parseFloat(stock.quantity) * parseFloat(stock.price);
      }, 0);
      return stocks.grandTotal;
    });

    const showStock = (custom_stock_id) => {
      router.push({ path: `${custom_stock_id}/show-stock/` });
    };

    const getStocks = () => {
      // toast("Stock Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      stocks.length = 0;
      axios
        .get("stocks")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            stocks.push(response.data.data[i]);
          }
          console.log(stocks);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      stock,
      toast,
      stocks,
      getStocks,
      setAvtarUploadImage,
      image,
      imagePreview,
      VITE_MY_APP_BACK_URL_HOME,
      showStock,
      isValidHttpUrl,
      errors,
      grandTotalStock,
    };
  }, //end of setup
};
</script>
      
      <style scoped>
/* for modal */
.modal-container {
  background: #000000d6;
  padding: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  min-height: 100%;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  /* padding: 15px; */
  position: relative;
}
.modal-header {
  background: var(--primary);

  padding: 20px;
  color: #fff;
}
.modal-body {
  padding: 20px;
}

.modal-footer {
  background: var(--grey);
  padding: 20px;
  color: #fff;
}
.modal-close-btn-container {
  position: absolute;
  right: -11px;
  color: white;
  top: -12px;
  font-size: 25px;
  cursor: pointer;
}

.modal-tick-btn-container {
  position: absolute;
  right: -30px;
  color: white;
  bottom: -5px;
  font-size: 25px;
  cursor: pointer;
}

input.stockNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
select.stockCategoryHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
select.stockUnitHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.stockCostPriceHolder,
input.stockSellingPriceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.stockOpeningStockHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.stockDescriptionHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.stockOpeningBalanceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

.form-input-holder-container {
  margin-bottom: 15px;
}
.image-upload-holder {
  display: flex;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stocks-content {
  /* background: white; */
}
button.btn-new-stock {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
table {
  background: #fff;
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  white-space: nowrap;
}

th,
td {
  text-align: left;
  padding: 16px;
}

th {
  background-color: var(--primary);
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

@media (max-width: 767px) {
  table {
    font-size: 14px;
  }
}

@media (max-width: 479px) {
  table {
    font-size: 12px;
  }
}

/* vue animation */
.v-enter-active,
.v-leave-active {
  /* transition: opacity 0.5s ease; */
  transition: all 0.5s ease-in-out;
  /* transition-delay: 0.25s; */
}

.v-enter-from {
  transform: translateY(-500px);
  opacity: 0.001;
}
.v-leave-to {
  transform: translateY(-500px);
  opacity: 0.001;
}

.invoiceItemStockName {
  display: flex;
  padding: 0px;
  align-items: center;
}
img.stock_logo_img {
  width: 60px;
  /* margin-top: 15px; */
}
input.stockImageHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  display: none;
  margin-top: 10px;
}
.form-stock-left {
  margin: 15px;
}
.form-stock-right {
  margin: 15px;
}
.image-upload-icon-holder {
  width: 60px;
  color: var(--primary);
}
.link-button-container a {
  text-decoration: none;
  margin-right: 5px;
  background: var(--grey);
  color: white;
  padding: 4px;
  border-radius: 10px;
}
.link-button-container a:hover {
  background: var(--dark);
}
</style>
  
  