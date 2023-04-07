<template>
     <main id="Invoice-page">
    <h1>Edit Invoice</h1>
    <p>Welcome to Edit Invoice page</p>
    <div class="huge-invoice-container">
      <div class="Invoice-content">
        <div class="invoice-top-section">
          <div class="top-invoice-section">
            <div class="invoice-top-section-details-left">
              <div class="invoice-custom-id">
                <label>Invoice No </label>
                <label style="color: var(--primary)">{{ info.custom_invoice_id }}</label>
              </div>
              <div class="form-invoice-customer">
                <label>Customer </label>
            <span>
               {{ info.customer_name }}
            </span>
              </div>
              <div class="form-invoice-notes">
                <label>Notes </label>
                {{ info.note }}
              </div>
            </div>
            <div class="invoice-top-section-details-middle">
                <div class="">
hello
                </div>
            </div>
            <div class="invoice-top-section-details-right">
              <div class="form-invoice-date">
                <label>Invoice Date</label>
                {{ info.invoice_date }}
              </div>
              <div class="form-due-date">
                <label>Due Date</label>
                {{ info.due_date }}
              </div>
            </div>
          </div>
        </div>
       
        <div class="invoice-content-right-side">
          <div v-if="items">
            <!-- <header class="px-5 py-4 border-b border-gray-100">
                    <h2 class="font-semibold text-gray-800">Invoices</h2>
                </header> -->
            <div class="invoiceItemsTableContainer">
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
                        <th>ID</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>LineTotal</th>
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
                              :src="item.product.image"
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
                        <div>
                          {{ item.quantity }}
                        </div>
                      </td>
                      <td style="width: 10%">
                        <div>
                          {{ item.product.unit.short_name }}
                        </div>
                      </td>
                      <td style="width: 22%">
                        <div>
                          {{ item.price }}
                        </div>
                      </td>

                      <td>
                        <div>
                          {{ ( item.quantity * item.price) }}
                        </div>
                      </td>
                     
                    </tr>
                  </tbody>
                </table>
              
              </div>
              <div class="total-words-container">
             
                <p><b>Amount in Words : </b>{{ info.grand_total_words }}</p>
            </div>
            </div>
          </div>
        </div>

        <div class="mero-table">
          <section>
            <div class="total-sections">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div>Sub Total</div>
                    </td>
                    <td>Rs. {{ info.sub_total }}</td>
                  </tr>

                  <tr>
                    <td>
                      <div>Discount</div>
                    </td>

                    <td>
                        Rs. {{ info.discount }}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div>Tax</div>
                    </td>

                    <td>Rs. {{ info.tax_amount }}</td>
                  </tr>

                  <tr>
                    <td>
                      <div>Grand Total</div>
                    </td>

                    <td> Rs. {{ info.grand_total }}</td>
                  </tr>
                </tbody>
              </table>

            
            </div>
           
          </section>
        </div>
      </div>
    </div>
  </main>
  
    <button class="btn btn-success" @click="editInvoice(id)">Edit</button>
    <router-link to="/invoices" class="btn btn-danger">Close</router-link>
</template>
<script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
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
      fetchInvoice();
      //   fetchStore();
    });

    const getIdFromUrl = () => {
      id.value = route.params.id;
    }; //end of getIdFromUrl

    const editInvoice = (id) => {
      // named route
      router.push({ path: `/${id}/editInvoice/` });
    };
    const fetchInvoice = () => {
      axios
        .get("invoice/" + id.value)
        .then((response) => {
          info.invoice_no = response.data.invoice.id;
          info.custom_invoice_id = response.data.invoice.custom_invoice_id;
          info.title = response.data.invoice.title;
          info.customer_id = response.data.customer_id;
          info.customer_name = response.data.invoice.customer_name;
          info.invoice_date = response.data.invoice.invoice_date;
          info.due_date = response.data.invoice.due_date;
          info.discount = response.data.invoice.discount;
          info.sub_total = response.data.invoice.sub_total;
          info.tax_amount = response.data.invoice.tax_amount;
          info.grand_total = response.data.invoice.grand_total;
          info.customer_address = response.data.invoice.customer_address;
          info.grand_total = response.data.invoice.grand_total;
          info.customer_phone = response.data.invoice.customer_phone;
          info.customer_details = response.data.invoice.customer_details;
          info.status = response.data.invoice.status;

          //veu.set will make data reactive and updated
          let temp_invoiceItems;
          items.length=0;
          temp_invoiceItems = response.data.invoice.invoice_detail;
          for (let i = 0; i < temp_invoiceItems.length; i++) {
            items.push(temp_invoiceItems[i]);
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
    }; //end of fetchInvoice

    const fetchStore = () => {
      let currObj = this;
      axios
        .get("/api/store")
        .then(function (response) {
          store.id = response.data.store.id;
          store.name = response.data.store.name;
          store.detail = response.data.store.id;
          store.email = response.data.store.id;
          store.address = response.data.store.id;
          store.phone = response.data.store.id;
          store.mobile = response.data.store.id;
          store.url = response.data.store.id;

          if (response.data.store.store_logo != null) {
            store.store_logo = "/img/" + response.data.store.store_logo;

            // store.store_logo="/img/"+data.store.store_logo //concatenate image location and image name
          }
          store.tax_number = response.data.store.tax_number;
          store.tax_percentage = response.data.store.tax_percentage;
          store.url = response.data.store.id;

          // console.log(data.store.name)
        })
        .catch(function (error) {
          console.log(error);
        });
    }; //end of fetchStore()

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
      id,
    };
  },
}; //end of export default
</script>
<style scoped>
input.quantityInputHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;

  font-size: 14px;
}
input.customerInputHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
textarea.invoiceNotesHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}
input.invoiceDateHolder,
input.invoiceDueDateHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 5px;
}

input.nameInputHolder,
select.unitInputHolder,
input.priceInputHolder,
input.totalInputHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
}
.Invoice-content {
  margin-top: 15px;
  background: #fff;
  padding: 26px;
}
.item-table-holder {
  display: flex;
  align-items: end;
  justify-content: end;
  background: #fcfcfc;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}

.mero-table {
  display: flex;
  justify-content: end;
}
.item-table-holder-button-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}
button.create-invoice-btn {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 10px;
}
button.btn-update-to-invoice,
button.btn-add-to-invoice {
  background: #2196f3;
  color: white;
  padding: 10px;
  border-radius: 10px;
}

.button-container-down {
  margin-top: 15px;
  display: flex;
  justify-content: end;
}
input.discount-input {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
}
.total-sections {
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-top: 30px;
}
.invoice-header {
  display: flex;
  justify-content: right;
}
button.btn-new-invoice {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
button.btnEditInvoice {
  background: #ffc107;
  color: white;
  padding: 5px;
  border-radius: 2px;
}
button.btnDeleteInvoice {
  background: #f44336;
  color: white;
  padding: 5px;
  border-radius: 2px;
}
table {
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
  padding: 10px;
}

th {
  background-color: var(--primary);
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.top-invoice-section {
  display: flex;
  justify-content: space-between;
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

.invoiceItemProductName {
  display: flex;
  padding: 0px;
  align-items: center;
}
.top-invoice-section label {
  margin: 5px;
}
.form-invoice-notes {
  margin-top: 10px;
}
.form-invoice-customer {
  margin-top: 10px;
}
.invoice-custom-id {
  margin-top: 10px;
}
.form-invoice-date {
  margin-top: 10px;
}
.form-due-date {
  margin-top: 10px;
}
.form-invoice-customer {
  position: relative;
}
.customer-select {
  width: 100%;
  opacity: 1;
  transition: all 0.75s ease;
  transition-delay: 1s;
  max-height: 80px;
  background: #4caf50;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: scroll;
  position: absolute;
}
.product-select {
  width: 100%;
  opacity: 1;
  transition: all 0.75s ease;
  transition-delay: 1s;
  max-height: 80px;
  background: #4caf50;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: scroll;
  position: absolute;
}
.customer-select.show {
  opacity: 1;
}
.product-select.show {
  opacity: 1;
}

.selection-list {
}
.selection-list ul {
  list-style: none;
}
.selection-list ul li {
  padding: 10px;
  border-top: 1px solid #ccc;
  cursor: pointer;
  color: white;
}

.itemHolderProductInputeContainer {
  position: relative;
}

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

.total-words-container {
    margin-top: 20px;
}
</style>