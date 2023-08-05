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
        v-if="stocks.length != 0"
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
                <td>{{ stock.quantity * stock.price }}</td>
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
    <div class="pagination-container">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getStocks(pagination.first_link)"
                class="page-link"
              >
                <span class="material-icons">first_page</span>
                First
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.prev_link }"
              v-if="pagination.prev_link"
            >
              <button
                @click="getStocks(pagination.prev_link)"
                class="page-link"
              >
                <span class="material-icons">chevron_left</span>

                Prev
              </button>
            </li>
            <li
              v-for="n in pagination.last_page"
              v-bind:key="n"
              class="page-item"
              v-bind:class="{ active: pagination.current_page == n }"
            >
              <button
                @click="getStocks(pagination.path_page + n)"
                class="page-link"
              >
                {{ n }}
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.next_link }"
              v-if="pagination.next_link"
            >
              <button
                @click="getStocks(pagination.next_link)"
                class="page-link"
              >
                <span class="material-icons">chevron_right</span>

                Next
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.last_link }"
            >
              <button
                @click="getStocks(pagination.last_link)"
                class="page-link"
              >
                <span class="material-icons">last_page</span>

                Last
              </button>
            </li>
          </ul>
        </div>
        <div class="pagination-footer">
          Page: {{ pagination.current_page }}-{{ pagination.last_page }} Total
          Records: {{ pagination.total_pages }}
        </div>
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

    const getStocks = (page_url) => {
      // toast("Stock Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "stocks";

      stocks.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            stocks.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
          console.log(stocks);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const pagination = ref({});

    const makePagination = (meta, links) => {
      let pagination_temp = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        from_page: meta.from,
        to_page: meta.to,
        total_pages: meta.total,
        path_page: meta.path + "?page=",
        first_link: links.first,
        last_link: links.last,
        prev_link: links.prev,
        next_link: links.next,
      };
      pagination.value = pagination_temp;
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
      pagination,
      makePagination,
    };
  }, //end of setup
};
</script>
      
      <style scoped>
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

.invoiceItemStockName {
  display: flex;
  padding: 0px;
  align-items: center;
}
img.stock_logo_img {
  width: 60px;
  /* margin-top: 15px; */
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
  
  