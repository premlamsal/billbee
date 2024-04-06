<template>
  <main id="invoice-print-page">
    <div class="huge-return-invoice-print-container">
      <div class="invoice-print-head">
        <!-- <h1>Print ReturnInvoice # {{ info.custom_invoice_id }}</h1> -->
        <div class="print-btn-box">
          <button
            v-print="'#printMe'"
            style="display: flex; justify-content: center; align-items: center"
          >
            <img :src="printicon" alt="print-icon" class="print-icon" /> Print
          </button>
        </div>
      </div>
      <div class="invoice-print-documnet-block">
        <div id="printMe">
          <div class="to-print-return-invoice">
            <div class="invoice">
              <div class="invoice-first-half">
                <div class="top-head">
                  <div class="company-title">
                    <h3>{{ store.name }}</h3>
                  </div>
                  <div class="company-details">
                    <p>{{ store.address }}</p>
                    <p>{{ store.phone }}</p>
                    <p>TAX NO: {{ store.tax_number }}</p>
                  </div>
                </div>
              </div>

              <div class="invoice-second-half">
                <div class="header-customer-container">
                  <div class="customer-info">
                    <h3>Customer Details</h3>
                    <p>{{ info.customer_name }}</p>
                    <p>{{ info.customer_address }}</p>
                    <p>{{ info.customer_phone }}</p>
                  </div>
                  <div class="invoice-header">
                    <h3>Return Invoice</h3>
                    <div class="invoice-details">
                      <p>
                        Return Invoice Number: #
                        {{ info.custom_return_invoice_id }}
                      </p>
                      <p>Return Invoice Date: {{ info.invoice_date }}</p>
                      <!-- Add due date if needed -->
                      <p>Due Date: {{ info.due_date }}</p>
                    </div>
                  </div>
                </div>
                <div class="invoice-body" v-if="items">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.id">
                        <td>
                          {{ item.product.custom_product_id }}
                        </td>
                        <td style="width: 34%">
                          <div class="invoiceItemProductName">
                            <div v-if="item.product.image">
                              <img
                                style="border-radius: 50%"
                                :src="
                                  VITE_MY_APP_BACK_URL_HOME + item.product.image
                                "
                                width="40"
                                height="40"
                                :alt="item.product.name"
                              />
                            </div>
                            <div style="margin-left: 10%">
                              {{ item.product.name }}
                            </div>
                          </div>
                        </td>
                        <td style="width: 16%">
                          <div class="quantity-unit">
                            <div>
                              {{ item.quantity }}
                            </div>
                            <div style="margin-left: 4px">
                              {{ item.product.unit.short_name }}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>Rs. {{ item.price }}</div>
                        </td>

                        <td style="width: 22%">
                          <div>Rs. {{ item.quantity * item.price }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="minor-foot">
                  <div class="minor-amount-desc">
                    <p>
                      <strong>Amount in Words: </strong>
                      {{ info.grand_total_words }}
                    </p>
                  </div>
                  <div class="minor-note">
                    <label style="font-weight: bold">Notes </label>
                    <p>{{ info.note }}</p>
                  </div>
                </div>
                <div class="invoice-footer">
                  <div class="totals">
                    <p>Subtotal: Rs. {{ info.sub_total }}</p>
                    <p>Discount: Rs. {{ info.discount }}</p>
                    <p>Tax (10%): Rs. {{ info.tax_amount }}</p>
                    <p>
                      <strong>Total: Rs. {{ info.grand_total }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- end of invoice -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import print from "vue3-print-nb";
import printicon from "../../../assets/print.png";
export default {
  directives: { print },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const axios = inject("$axios");

    const items = reactive([
      {
        product_name: "",
        price: "",
        quantity: "",

        product: {
          custom_product_id: "",
          unit: {},
        },

        line_total: "",
      },
    ]);
    const info = reactive({});
    const id = ref("");
    const store = reactive({});
    onMounted(() => {
      //   store.store_logo.value = "/img/a.svg";

      getIdFromUrl();
      fetchInvoiceReturn();
      fetchStore();
    });

    const getIdFromUrl = () => {
      id.value = route.params.id;
    }; //end of getIdFromUrl

    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );
    const editInvoiceReturn = (id) => {
      // named route
      router.push({ path: `/${id}/edit-return-invoice/` });
    };
    const fetchInvoiceReturn = () => {
      axios
        .get("return-invoice/" + id.value)
        .then((response) => {
          info.return_invoice_no = response.data.return_invoice.id;
          info.custom_return_invoice_id =
            response.data.return_invoice.custom_return_invoice_id;
          info.title = response.data.return_invoice.title;
          info.customer_id = response.data.customer_id;
          info.customer_name = response.data.return_invoice.customer_name;
          info.return_invoice_date =
            response.data.return_invoice.return_invoice_date;
          info.due_date = response.data.return_invoice.due_date;
          info.note = response.data.return_invoice.note;

          info.discount = response.data.return_invoice.discount;
          info.sub_total = response.data.return_invoice.sub_total;
          info.tax_amount = response.data.return_invoice.tax_amount;
          info.grand_total = response.data.return_invoice.grand_total;
          info.customer_address = response.data.return_invoice.customer.address;
          info.grand_total = response.data.return_invoice.grand_total;
          info.customer_phone = response.data.return_invoice.customer_phone;
          info.customer_details = response.data.return_invoice.customer_details;
          info.status = response.data.return_invoice.status;

          //veu.set will make data reactive and updated
          let temp_return_invoiceItems;
          items.length = 0;
          temp_return_invoiceItems =
            response.data.return_invoice.return_invoice_detail;
          for (let i = 0; i < temp_return_invoiceItems.length; i++) {
            items.push(temp_return_invoiceItems[i]);
          }

          //converting number to words
          convertToWords();
        })
        .catch((error) => {
          //   if (error.response.status == 404) {
          //     currObj.$router.push({ name: "404" });
          //   }
          console.log(error);
        });
    }; //end of fetchInvoiceReturn

    const fetchStore = () => {
      axios
        .get("user-store")
        .then(function (response) {
          store.id = response.data.store.id;
          store.name = response.data.store.name;
          store.detail = response.data.store.detail;
          store.email = response.data.store.email;
          store.address = response.data.store.address;
          store.phone = response.data.store.phone;
          store.mobile = response.data.store.mobile;

          if (response.data.store.store_logo != null) {
            store.store_logo = "/img/" + response.data.store.store_logo;

            // store.store_logo="/img/"+data.store.store_logo //concatenate image location and image name
          }
          store.tax_number = response.data.store.tax_number;
          store.tax_percentage = response.data.store.tax_percentage;
          store.url = response.data.store.url;

          // console.log(data.store.name)
        })
        .catch(function (error) {
          console.log(error);
        });
    }; //end of fetchStore()

    const exportToPDF = () => {
      console.log("hello from pdf");
    };

    const convertToWords = () => {
      info.grand_total_words = convertNumberToWords(info.grand_total);
    };
    const convertNumberToWords = (amount) => {
      var words = new Array();
      words[0] = "";
      words[1] = "One";
      words[2] = "Two";
      words[3] = "Three";
      words[4] = "Four";
      words[5] = "Five";
      words[6] = "Six";
      words[7] = "Seven";
      words[8] = "Eight";
      words[9] = "Nine";
      words[10] = "Ten";
      words[11] = "Eleven";
      words[12] = "Twelve";
      words[13] = "Thirteen";
      words[14] = "Fourteen";
      words[15] = "Fifteen";
      words[16] = "Sixteen";
      words[17] = "Seventeen";
      words[18] = "Eighteen";
      words[19] = "Nineteen";
      words[20] = "Twenty";
      words[30] = "Thirty";
      words[40] = "Forty";
      words[50] = "Fifty";
      words[60] = "Sixty";
      words[70] = "Seventy";
      words[80] = "Eighty";
      words[90] = "Ninety";
      amount = amount.toString();
      var atemp = amount.split(".");
      var number = atemp[0].split(",").join("");
      var n_length = number.length;
      var words_string = "";
      if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
          n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
            if (n_array[i] == 1) {
              n_array[j] = 10 + parseInt(n_array[j]);
              n_array[i] = 0;
            }
          }
        }
        var value = "";
        for (var i = 0; i < 9; i++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
            value = n_array[i] * 10;
          } else {
            value = n_array[i];
          }
          if (value != 0) {
            words_string += words[value] + " ";
          }
          if (
            (i == 1 && value != 0) ||
            (i == 0 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Crores ";
          }
          if (
            (i == 3 && value != 0) ||
            (i == 2 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Lakhs ";
          }
          if (
            (i == 5 && value != 0) ||
            (i == 4 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Thousand ";
          }
          if (
            i == 6 &&
            value != 0 &&
            n_array[i + 1] != 0 &&
            n_array[i + 2] != 0
          ) {
            words_string += "Hundred and ";
          } else if (i == 6 && value != 0) {
            words_string += "Hundred ";
          }
        }
        words_string = words_string.split("  ").join(" ");
      }
      return words_string;
    }; //end of convertNumberToWords

    return {
      store,
      items,
      info,
      printicon,
      editInvoiceReturn,
      exportToPDF,
      VITE_MY_APP_BACK_URL_HOME,
    };
  },
}; //end of export default
</script>
  <style scoped>
<style scoped>
/* vue animation */
.v-enter-active,
.v-leave-active {
  /* transition: opacity 0.5s ease; */
  transition: all 0.1s ease-in-out;
  /* transition-delay: 0.25s; */
}

.v-enter-from {
  transform: translateY(-50px);
  opacity: 0.001;
}
.v-leave-to {
  transform: translateY(-50px);
  opacity: 0.001;
}

.huge-return-invoice-print-container {
  /* background: #fff; */
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

.top-head {
  background: var(--primary);
  /* background: linear-gradient(45deg, #8bc34a, #cddc39); */
  /*          background: linear-gradient(45deg, #ff5370, #ff869a);*/
  /*              background: linear-gradient(45deg, #ffb64d, #ffcb80);*/
  /*              background: linear-gradient(45deg, #2ed8b6, #59e0c5);*/
  /*              background: linear-gradient(45deg, #4099ff, #73b4ff);*/
  color: white;
  padding-top: 20px;
  border-radius: 10px 10px 0px 0px;
  padding-bottom: 7px;
}
.print-icon {
  width: 40px;
  height: 40px;
}
.invoice {
  width: 800px;
  margin: 0 auto;
  border-radius: 10px 10px 0px 0px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.invoice-header,
.invoice-body,
.invoice-footer {
  margin-bottom: 20px;
}

.company-title {
  text-align: center;
  font-size: 1.5em;
  color: white;
}
.company-title h3 {
  margin: 0;
  padding: 0;
}

.company-details {
  text-align: center;

  margin-bottom: 20px;
}
.company-details p {
  margin: 5px;
  padding: 0;
}
.header-customer-container {
  overflow: hidden;
  margin-bottom: 50px;
  display: flex;
  margin-top: 20px;
}

.customer-info {
  width: 50%;

  border-radius: 5px;
  border-right: 1px solid #f2f2f2;
}
.customer-info p {
  margin: 5px 0;
  color: #777;

  padding: 0;
}
.customer-info h3 {
  margin: 0;
  padding: 0;
  color: var(--primary);
}

.invoice-header {
  width: 50%;
  text-align: right;
}

.invoice-header h3 {
  margin: 0;
  color: var(--primary);

  /*            color: #3498db;*/
}

.invoice-details {
  clear: both;
}

.invoice-details p {
  margin: 5px 0;
  color: #777;
}

.invoice-body table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.invoice-body table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 10px;
  text-align: left;
}

.invoice-body table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.invoice-footer {
  /* text-align: right; */
  display: flex;
  justify-content: right;
}

.totals {
  border-radius: 10px;
  margin-top: 10px;
  color: black;
  /* display: flex; */
  /* background: var(--primary); */
  background: #f2f2f2;
  border-bottom: 2px solid var(--primary);
}

.totals p {
  /* margin: 8px 0; */
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.398);
}

.totals strong {
  color: black;
}

.totals p:nth-child(odd) {
  /* background-color: #f9f9f9; */
}

.invoice-second-half {
  padding: 20px;
}

.invoiceItemProductName {
  display: flex;
  padding: 0px;
  align-items: center;
}
.quantity-unit {
  display: flex;
}
</style>