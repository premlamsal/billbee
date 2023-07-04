<template>
  <main id="Invoice-page">
    <h1>New Invoice</h1>
    <p>Welcome to new Invoice page</p>
    <div class="huge-invoice-container">
      <div class="Invoice-content">
        <div class="invoice-top-section">
          <div class="top-invoice-section">
            <div class="invoice-top-section-details-left">
              <div class="invoice-custom-id">
                <label>Invoice No </label>
                <label style="color: var(--primary)">{{ store.this_invoice_custom_number }}</label>
              </div>
              <div class="form-invoice-customer">
                <label>Customer </label>
                <input
                  type="text"
                  class="customerInputHolder"
                  placeholder="Choose Customer"
                  v-model="invoiceInfo.customer_name"
                  @keyup="customerSelectInput()"
                />
                <Transition :duration="550">
                  <div class="customer-select" v-if="showCustomerSelect">
                    <!-- {{ queryResults }} -->
                    <div class="selection-list">
                      <ul>
                        <template
                          v-for="queryResult in queryResults"
                          v-bind:key="queryResult.id"
                        >
                          <li
                            @click="
                              selectOption(queryResult.id, queryResult.name)
                            "
                          >
                            {{ queryResult.name }}
                          </li>
                        </template>
                      </ul>
                    </div>
                  </div>
                </Transition>
              </div>
              <div class="form-invoice-notes">
                <label>Notes </label>
                <textarea
                  type="text"
                  class="invoiceNotesHolder"
                  v-model="invoiceInfo.note"
                ></textarea>
              </div>
            </div>
            <div class="invoice-top-section-details-right">
              <div class="form-invoice-date">
                <label>Invoice Date</label>
                <input
                  type="date"
                  class="invoiceDateHolder"
                  v-model="invoiceInfo.invoice_date"
                />
              </div>
              <div class="form-due-date">
                <label>Due Date</label>
                <input
                  type="date"
                  class="invoiceDueDateHolder"
                  v-model="invoiceInfo.due_date"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- <header class="px-5 py-4 border-b border-gray-100">
                  <h2 class="font-semibold text-gray-800">Invoices</h2>
              </header> -->
        <div class="invoiceItemsTableContainer">
          <div
            class="insideinvoiceItemsContainer"
            style="
              /* overflow-x: auto; */
              margin-top: 20px;
              border-radius: 10px;
              box-shadow: black 0px 1px 8px -5px;
            "
          >
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>LineTotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width: 33%">
                    <div class="itemHolderProductInputeContainer">
                      <input
                        type="text"
                        placeholder="Enter item name"
                        class="nameInputHolder"
                        v-model="itemHolder.product_name"
                        @keyup="productSelectInput()"
                      />
                      <Transition :duration="550">
                        <div class="product-select" v-if="showProductSelect">
                          <!-- {{ queryResults }} -->
                          <div class="selection-list">
                            <ul>
                              <template
                                v-for="queryResultProduct in queryResultsProduct"
                                v-bind:key="queryResultProduct.id"
                              >
                                <li
                                  @click="
                                    selectOptionProduct(
                                      queryResultProduct.id,
                                      queryResultProduct.name,
                                      queryResultProduct.unit.short_name,
                                      queryResultProduct.sp,
                                      queryResultProduct.unit.id
                                    )
                                  "
                                >
                                  {{ queryResultProduct.name }}
                                </li>
                              </template>
                            </ul>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </td>
                  <td style="width: 15%">
                    <input
                      type="text"
                      class="quantityInputHolder"
                      v-model="itemHolder.quantity"
                    />
                  </td>
                  <td>
                    <select class="unitInputHolder" v-model="itemHolder.unit">
                      <option selected="">box</option>
                      <option>pcs</option>
                      <option>sq.ft</option>
                      <option>kg</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="priceInputHolder"
                      v-model="itemHolder.price"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="totalInputHolder"
                      disabled
                      v-bind:value="itemHolder.quantity * itemHolder.price"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="item-table-holder-button-container">
          <div class="" v-if="isItemHolderUpdating">
            <button
              class="btn-update-to-invoice"
              @click="updateItemToInvoiceBtn()"
            >
              Update item to invoice
            </button>
          </div>
          <div class="" v-else>
            <button class="btn-add-to-invoice" @click="addItemToInvoiceBtn()">
              + Add item to invoice
            </button>
          </div>
        </div>
        <div class="invoice-content-right-side">
          <div v-if="invoiceItems">
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
                  <!-- <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th>LineTotal</th>
                      <th></th>
                    </tr>
                  </thead> -->
                  <tbody>
                    <tr v-for="(item, index) in invoiceItems" :key="index">
                      <td style="width: 34%">
                        <div class="invoiceItemProductName">
                          <div>
                            <img
                              style="border-radius: 50%"
                              :src="item.image"
                              width="40"
                              height="40"
                              v-if="item.image"
                              :alt="item.product_name"
                            />
                          </div>
                          <div style="margin-left: 10%">
                            {{ item.product_name }}
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
                          {{ item.unit }}
                        </div>
                      </td>
                      <td style="width: 22%">
                        <div>
                          {{ item.price }}
                        </div>
                      </td>

                      <td>
                        <div>
                          {{ (item.lineTotal = item.quantity * item.price) }}
                        </div>
                      </td>
                      <td>
                        <button
                          @click="editInvoiceItem(item.id)"
                          class="btnEditInvoice"
                        >
                          Edit
                        </button>
                        <button
                          @click="deleteInvoiceItem(item.id)"
                          class="btnDeleteInvoice"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                    <td>{{ subTotal }}</td>
                  </tr>

                  <tr>
                    <td>
                      <div>Discount</div>
                    </td>

                    <td>
                      <input
                        type="text"
                        placeholder="discount"
                        v-model="invoiceInfo.discount"
                        class="discount-input"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div>Tax</div>
                    </td>

                    <td>{{ taxAmount }}</td>
                  </tr>

                  <tr>
                    <td>
                      <div>Grand Total</div>
                    </td>

                    <td>{{ grandTotal }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="button-container-down">
              <button class="create-invoice-btn" @click="createInvoice()">
                Create Invoice
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
    
   

  
  <script>
import { uid } from "uid";
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'

export default {
  name: "Create New Invoice",
  setup() {

    const router = useRouter()
    const route = useRoute()
    //data
    const itemHolder = reactive({
      id: "",
      product_name: "",
      product_id: "",
      quantity: 0,
      image: "",
      unit: "",
      price: 0,
      lineTotal: 0,
    });
    const store = reactive({});
    const invoiceItems = reactive([]);
    const invoiceInfo = reactive({
      // subTotal:0,
      // discount:0,
    });
    const isItemHolderUpdating = ref(false);
    const currentEditItemIDIndex = ref("");

    let queryResults = reactive([]);
    let queryResultsProduct = reactive([]);

    const errorItemHolder = reactive({
      id: "",
      product_name_name: "",
      product_id: "",
      quantity: "",
      image: "",
      unit: "",
      price: "",
    });
    const showCustomerSelect = ref(false);
    const showProductSelect = ref(false);

    const toast = inject("$toast");

    //mounted

    //on mounted start
    onMounted(() => {
      getUserStoreData();
    });

    //end of mounted

    //methods
    const editInvoiceItem = (id) => {
      isItemHolderUpdating.value = true;
      let indexForItem = invoiceItems.findIndex((item) => item.id === id);
      currentEditItemIDIndex.value = indexForItem;
      // console.log(invoiceItems[indexForItem]);

      // console.log(getInvoiceItemFromID);
      itemHolder.product_id = invoiceItems[indexForItem].product_id;
      itemHolder.product_name = invoiceItems[indexForItem].product_name;
      itemHolder.quantity = invoiceItems[indexForItem].quantity;
      // itemHolder.image="";
      itemHolder.unit = invoiceItems[indexForItem].unit;
      itemHolder.unit_id = invoiceItems[indexForItem].unit_id;
      itemHolder.price = invoiceItems[indexForItem].price;
      itemHolder.lineTotal = invoiceItems[indexForItem].lineTotal;
    };
    const deleteInvoiceItem = (id) => {
      console.log(invoiceItems);
      // have to change
      // invoiceItems = invoiceItems.filter((item) => item.id !== id);

      console.log('please add delete logic...heheheh');

    };
    const updateItemToInvoiceBtn = () => {
      if (itemHolder.product_name === "") {
        errorItemHolder.product_name = "Enter Item";
      }
      if (itemHolder.price == 0) {
        errorItemHolder.price = "Enter Price";
      }
      if (itemHolder.unit == "") {
        errorItemHolder.unit = "Select Unit";
      }
      if (itemHolder.quantity == 0) {
        errorItemHolder.quantity = "Enter Quantity";
      } else {
        let index = currentEditItemIDIndex.value;
        // get old invoiceItems and update with current itemHolder items
        invoiceItems[index].product_id = itemHolder.product_id;
        invoiceItems[index].product_name = itemHolder.product_name;
        invoiceItems[index].quantity = itemHolder.quantity;
        invoiceItems[index].unit = itemHolder.unit;
        invoiceItems[index].price = itemHolder.price;
        invoiceItems[index].lineTotal = itemHolder.price * itemHolder.quantity;

        console.log(invoiceItems);

        // invoiceItems.push({
        // id: uid(),
        // name: itemHolder.name,
        // image: "https://avatars.githubusercontent.com/u/24312128?v=4",
        // price: itemHolder.price,
        // unit: itemHolder.unit,
        // quantity: itemHolder.quantity,
        // lineTotal: itemHolder.price * itemHolder.quantity,
        // });

        clearItemHolder();
        clearErrorItemHolder();
        isItemHolderUpdating.value = false;
      }
    };
    const clearErrorItemHolder = () => {
      errorItemHolder.product_name = "";
      errorItemHolder.product_id = "";
      errorItemHolder.quantity = 0;
      // errorItemHolder.image="";
      errorItemHolder.unit = "";
      errorItemHolder.price = 0;
      errorItemHolder.lineTotal = 0;
    };
    const clearItemHolder = () => {
      itemHolder.product_name = "";
      itemHolder.product_id = "";
      itemHolder.quantity = 0;
      // itemHolder.image="";
      itemHolder.unit = "";
      itemHolder.price = 0;
      itemHolder.lineTotal = 0;
    };
    const clearInvoiceInfo = () => {
      invoiceInfo.customer_id = "";
      invoiceInfo.customer_name = "";
      invoiceInfo.due_date = "";
      invoiceInfo.invoice_date = "";
      invoiceInfo.customer_name = "";
      invoiceInfo.note = "";
      invoiceInfo.subTotal = "";
    };
    const addItemToInvoiceBtn = () => {
      if (itemHolder.product_name === "") {
        errorItemHolder.product_name = "Enter Item";
      }
      if (itemHolder.price == 0) {
        errorItemHolder.price = "Enter Price";
      }
      if (itemHolder.unit == "") {
        errorItemHolder.unit = "Select Unit";
      }
      if (itemHolder.quantity == 0) {
        errorItemHolder.quantity = "Enter Quantity";
      } else {
        invoiceItems.push({
          id: uid(),
          product_id: itemHolder.product_id,
          product_name: itemHolder.product_name,
          image: "https://avatars.githubusercontent.com/u/24312128?v=4",
          price: itemHolder.price,
          unit: itemHolder.unit,
          unit_id: itemHolder.unit_id,
          quantity: itemHolder.quantity,
          lineTotal: itemHolder.price * itemHolder.quantity,
        });
        clearItemHolder();
        clearErrorItemHolder();
      }
    };
    const addNewInvoiceItem = () => {
      invoiceItems.push({
        id: uid(),
        product_name: "",
        // product_id:'',
        image: "",
        price: 0,
        unit: "pc(s)",
        quantity: 0,
        lineTotal: 0,
      });
    };
    //   const onInput = debounce(() => {
    //   console.log('debug')
    // }, 500)

    const axios = inject("$axios");

    const customerSelectInput = () => {
      // queryResults =  [{}];

      //code
      if (invoiceInfo.customer_name === "") {
        // queryResults = [{}];
        queryResults.splice(0);
        showCustomerSelect.value = false;
      } else {
        // let formData=new FormData();
        // formData.append('searchQuery',invoiceInfo.customer)
        axios
          .post("customers/search", {
            searchQuery: invoiceInfo.customer_name,
          })
          .then((response) => {
            // queryResults=response.data;

            // console.log(response.data);

            queryResults.splice(0);

            for (let i = 0; i < response.data.data.length; i++) {
              queryResults.push(response.data.data[i]);
            }

            showCustomerSelect.value = true;

            // console.log(queryResults)

            // console.log(queryResults)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const selectOption = (customer_id, customer_name) => {
      showCustomerSelect.value = false;
      invoiceInfo.customer_name = customer_name;
      invoiceInfo.customer_id = customer_id;
    };

    //showProductSelect
    const productSelectInput = () => {
      // queryResultsProduct =  [{}];

      //code
      if (itemHolder.product_name === "") {
        // queryResults = [{}];
        queryResultsProduct.splice(0);
        showProductSelect.value = false;
      } else {
        // let formData=new FormData();
        // formData.append('searchQuery',invoiceInfo.customer)
        axios
          .post("product/search", {
            searchQuery: itemHolder.product_name,
          })
          .then((response) => {
            // queryResultsProduct=response.data;

            // console.log(response.data);

            queryResultsProduct.splice(0);

            for (let i = 0; i < response.data.data.length; i++) {
              queryResultsProduct.push(response.data.data[i]);
            }

            showProductSelect.value = true;

            // console.log(queryResultsProduct)

            // console.log(queryResultsProduct)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const selectOptionProduct = (
      product_id,
      product_name,
      product_unit,
      product_price,
      product_unit_id
    ) => {
      showProductSelect.value = false;
      itemHolder.product_name = product_name;
      itemHolder.product_id = product_id;
      itemHolder.quantity = 1;
      itemHolder.unit = product_unit;
      itemHolder.price = product_price;
      itemHolder.unit_id = product_unit_id;
    };
    const createInvoice = () => {
      axios
        .post("/invoice/create", { info: invoiceInfo, items: invoiceItems })
        .then((response) => {
          //response.data.msg have success message

          console.log(response.data);

          toast(response.data.msg, {
            showIcon: true,
            type: response.data.status,
            position: "top-center",
            transition: "zoom",
          });

          clearErrorItemHolder();
          clearItemHolder();
          clearInvoiceInfo();
          router.push({ path: '/invoices' })
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getUserStoreData = () => {
      let custom_invoice_number;

      axios
        .get("user-store/")
        .then((response) => {

          store.invoice_id_count = response.data.store.invoice_id_count;
        
          console.log(response.data);

          custom_invoice_number = store.invoice_id_count.split("-");

          custom_invoice_number[1] = parseInt(custom_invoice_number[1]) + 1;

          store.this_invoice_custom_number = custom_invoice_number.join("-");

          // console.log(store.this_invoice_custom_number);

          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-center",
            transition: "zoom",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    //end of methods

    //computed

    const subTotal = computed(() => {
      //reduce function is used to sum the array elements
      invoiceInfo.subTotal = invoiceItems.reduce(function (carry, item) {
        return carry + parseFloat(item.quantity) * parseFloat(item.price);
      }, 0);
      return parseFloat(invoiceInfo.subTotal);
    });
    const taxAmount = computed(() => {
      if (invoiceInfo.discount != null && invoiceInfo.discount !== "") {
        return parseFloat(
          (subTotal.value - parseFloat(invoiceInfo.discount)) *
            parseFloat(13 / 100)
        );
      } else {
        return parseFloat(subTotal.value * parseFloat(13 / 100));
      }
    });
    const grandTotal = computed(() => {
      if (invoiceInfo.discount != null && invoiceInfo.discount !== "") {
        return parseFloat(
          subTotal.value - parseFloat(invoiceInfo.discount) + taxAmount.value
        );
      } else {
        return parseFloat(subTotal.value + taxAmount.value);
      }
    });

    //end of computed

    //here you can return data and methods
    return {
      itemHolder,
      invoiceItems,
      invoiceInfo,
      isItemHolderUpdating,
      currentEditItemIDIndex,
      errorItemHolder,
      editInvoiceItem,
      deleteInvoiceItem,
      updateItemToInvoiceBtn,
      clearErrorItemHolder,
      clearItemHolder,
      addItemToInvoiceBtn,
      addNewInvoiceItem,
      subTotal,
      taxAmount,
      grandTotal,
      customerSelectInput,
      showCustomerSelect,
      selectOption,
      queryResults,
      queryResultsProduct,
      productSelectInput,
      showProductSelect,
      selectOptionProduct,
      createInvoice,
      getUserStoreData,
      store,
      
    };
  },
};
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
</style>
 