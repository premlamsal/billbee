<template>
  <main id="Invoice-page">
    <h1>New Return Invoice</h1>
    <p>Welcome to new Return Invoice page</p>
    <div class="huge-return-purchase-container">
      <div class="Invoice-content">
        <div class="purchase-top-section">
          <div class="top-return-purchase-section">
            <div class="purchase-top-section-details-left">
              <div class="return-return-purchase-custom-id">
                <label>Return Invoice No </label>
                <label style="color: var(--primary)">{{
                  store.this_return_purchase_custom_number
                }}</label>
              </div>
              <div class="form-return-purchase-supplier">
                <label>Supplier </label>
                <input
                  type="text"
                  :class="[
                    'form-input-holder',
                    errors.supplier_name ? 'is-invalid' : '',
                  ]"
                  placeholder="Choose Supplier"
                  v-model="purchaseInfo.supplier_name"
                  @keyup="supplierSelectInput()"
                />

                <Transition :duration="550">
                  <div class="supplier-select" v-if="showSupplierSelect">
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
                <div v-if="errors.supplier_name" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.supplier_name"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-return-purchase-notes">
                <label>Notes </label>
                <textarea
                  type="text"
                  :class="[
                    'form-input-holder',
                    errors.note ? 'is-invalid' : '',
                  ]"
                  v-model="purchaseInfo.note"
                ></textarea>
                <div v-if="errors.note" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.note"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="purchase-top-section-details-right">
              <div class="form-return-purchase-date">
                <label>Return Invoice Date</label>
                <input
                  type="date"
                  :class="[
                    'form-input-holder',
                    errors.return_purchase_date ? 'is-invalid' : '',
                  ]"
                  v-model="purchaseInfo.return_purchase_date"
                />
                <div v-if="errors.return_purchase_date" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.return_purchase_date"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-due-date">
                <label>Due Date</label>
                <input
                  type="date"
                  :class="[
                    'form-input-holder',
                    errors.due_date ? 'is-invalid' : '',
                  ]"
                  v-model="purchaseInfo.due_date"
                />
                <div v-if="errors.due_date" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.due_date"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-return-purchase-reference-holder">
                <label>Return Purchase Reference ID</label>
                <input
                  type="text"
                  :class="[
                    'form-input-holder',
                    errors.return_purchase_reference_id ? 'is-invalid' : '',
                  ]"
                  v-model="purchaseInfo.return_purchase_reference_id"
                />
                <div
                  v-if="errors.return_purchase_reference_id"
                  :class="['errorText']"
                >
                  <div
                    class="errorText-inner"
                    v-for="error in errors.return_purchase_reference_id"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <header class="px-5 py-4 border-b border-gray-100">
                      <h2 class="font-semibold text-gray-800">Invoices</h2>
                  </header> -->
        <div class="purchaseItemsTableContainer">
          <div
            class="insidepurchaseItemsContainer"
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
                                      queryResultProduct.product.id,
                                      queryResultProduct.product.name,
                                      queryResultProduct.product.unit
                                        .short_name,
                                      queryResultProduct.product.sp,
                                      queryResultProduct.product.unit.id,
                                      queryResultProduct.id,
                                      queryResultProduct.product.image
                                    )
                                  "
                                >
                                  {{ queryResultProduct.product.name }} --
                                  {{ queryResultProduct.quantity }}
                                  {{
                                    queryResultProduct.product.unit.short_name
                                  }}
                                  -- Rs. {{ queryResultProduct.price }}

                                  <!-- {{ queryResultProduct.name }} -->
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
                    <select
                      class="unitInputHolder"
                      v-model="itemHolder.unit_id"
                      disabled
                    >
                      <option selected="" disabled>Select Unit</option>
                      <template v-for="unit in units" v-bind:key="unit.id">
                        <option selected :value="unit.id">
                          {{ unit.short_name }}
                        </option>
                      </template>
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
              class="btn-update-to-return-purchase"
              @click="updateItemToInvoiceBtn()"
            >
              Update item to return-purchase
            </button>
          </div>
          <div class="" v-else>
            <button class="btn-add-to-purchase" @click="addItemToInvoiceBtn()">
              + Add item to return purchase
            </button>
          </div>
        </div>
        <div class="return-return-purchase-content-right-side">
          <div v-if="purchaseItems">
            <!-- <header class="px-5 py-4 border-b border-gray-100">
                      <h2 class="font-semibold text-gray-800">Invoices</h2>
                  </header> -->
            <div class="purchaseItemsTableContainer">
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
                    <tr v-for="(item, index) in purchaseItems" :key="index">
                      <td style="width: 34%">
                        <div class="purchaseItemProductName">
                          <div>
                            <img
                              style="border-radius: 50%"
                              :src="VITE_MY_APP_BACK_URL_HOME + item.image"
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
                        v-model="purchaseInfo.discount"
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
              <button
                class="create-return-purchase-btn"
                @click="createReturnInvoice()"
              >
                Create Return Invoice
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
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Create New Return Invoice",
  setup() {
    const router = useRouter();
    const route = useRoute();
    //data
    const itemHolder = reactive({
      id: "",
      product_name: "",
      product_id: "",
      quantity: 0,
      image: "",
      unit: "",
      stock_id: "",

      price: 0,
      lineTotal: 0,
    });
    const store = reactive({});
    const purchaseItems = reactive([]);
    const purchaseInfo = reactive({
      // subTotal:0,
      // discount:0,
    });
    const isItemHolderUpdating = ref(false);
    const currentEditItemIDIndex = ref("");

    const units = reactive([]);

    const errors = ref({});

    let queryResults = reactive([]);
    let queryResultsProduct = reactive([]);

    const errorItemHolder = reactive({
      id: "",
      product_name_name: "",
      product_id: "",
      quantity: "",
      image: "",
      unit: "",
      image: "",
      stock_id: "",

      price: "",
    });
    const showSupplierSelect = ref(false);
    const showProductSelect = ref(false);

    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );
    const toast = inject("$toast");

    //mounted

    //on mounted start
    onMounted(() => {
      getUserStoreData();
      getUnits();
      purchaseInfo.discount = 0;
    });

    //end of mounted

    //methods
    const getUnits = () => {
      // toast("Unit Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      units.length = 0;
      axios
        .get("units")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            units.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const editInvoiceItem = (id) => {
      isItemHolderUpdating.value = true;
      let indexForItem = purchaseItems.findIndex((item) => item.id === id);
      currentEditItemIDIndex.value = indexForItem;
      // console.log(purchaseItems[indexForItem]);

      // console.log(getInvoiceItemFromID);
      itemHolder.product_id = purchaseItems[indexForItem].product_id;
      itemHolder.product_name = purchaseItems[indexForItem].product_name;
      itemHolder.quantity = purchaseItems[indexForItem].quantity;
      // itemHolder.image="";
      itemHolder.unit = purchaseItems[indexForItem].unit;
      itemHolder.unit_id = purchaseItems[indexForItem].unit_id;
      itemHolder.stock_id = purchaseItems[indexForItem].stock_id;
      itemHolder.image = purchaseItems[indexForItem].image;

      itemHolder.price = purchaseItems[indexForItem].price;
      itemHolder.lineTotal = purchaseItems[indexForItem].lineTotal;
    };
    const deleteInvoiceItem = (id) => {
      console.log(purchaseItems);
      // have to change
      // purchaseItems = purchaseItems.filter((item) => item.id !== id);

      console.log("please add delete logic...heheheh");
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
      if (itemHolder.unit_id == "") {
        errorItemHolder.unit_id = "Select Unit";
      }
      if (itemHolder.quantity == 0) {
        errorItemHolder.quantity = "Enter Quantity";
      } else {
        let index = currentEditItemIDIndex.value;
        // get old purchaseItems and update with current itemHolder items
        purchaseItems[index].product_id = itemHolder.product_id;
        purchaseItems[index].product_name = itemHolder.product_name;
        purchaseItems[index].quantity = itemHolder.quantity;
        purchaseItems[index].unit = itemHolder.unit;
        purchaseItems[index].unit_id = itemHolder.unit_id;
        purchaseItems[index].stock_id = itemHolder.stock_id;
        purchaseItems[index].image = itemHolder.image;

        purchaseItems[index].price = itemHolder.price;
        purchaseItems[index].lineTotal = itemHolder.price * itemHolder.quantity;

        console.log(purchaseItems);

        // purchaseItems.push({
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
      errorItemHolder.unit_id = "";
      errorItemHolder.stock_id = "";
      errorItemHolder.image = "";

      errorItemHolder.price = 0;
      errorItemHolder.lineTotal = 0;
    };
    const clearItemHolder = () => {
      itemHolder.product_name = "";
      itemHolder.product_id = "";
      itemHolder.quantity = 0;
      // itemHolder.image="";
      itemHolder.unit = "";
      itemHolder.unit_id = "";
      itemHolder.stock_id = "";
      itemHolder.image = "";

      itemHolder.price = 0;
      itemHolder.lineTotal = 0;
    };
    const clearInvoiceInfo = () => {
      purchaseInfo.supplier_id = "";
      purchaseInfo.supplier_name = "";
      purchaseInfo.due_date = "";
      purchaseInfo.return_purchase_date = "";
      purchaseInfo.supplier_name = "";
      purchaseInfo.note = "";
      purchaseInfo.subTotal = "";
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
      if (itemHolder.unit_id == "") {
        errorItemHolder.unit_id = "Select Unit";
      }
      if (itemHolder.quantity == 0) {
        errorItemHolder.quantity = "Enter Quantity";
      } else {
        purchaseItems.push({
          id: uid(),
          product_id: itemHolder.product_id,
          product_name: itemHolder.product_name,
          image: itemHolder.image,
          unit_id: itemHolder.unit_id,

          stock_id: itemHolder.stock_id,
          price: itemHolder.price,
          unit: itemHolder.unit,

          quantity: itemHolder.quantity,
          lineTotal: itemHolder.price * itemHolder.quantity,
        });
        clearItemHolder();
        clearErrorItemHolder();
      }
    };
    const addNewInvoiceItem = () => {
      purchaseItems.push({
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

    const supplierSelectInput = () => {
      // queryResults =  [{}];

      //code
      if (purchaseInfo.supplier_name === "") {
        // queryResults = [{}];
        queryResults.splice(0);
        showSupplierSelect.value = false;
      } else {
        // let formData=new FormData();
        // formData.append('searchQuery',purchaseInfo.supplier)
        axios
          .post("suppliers/search", {
            searchQuery: purchaseInfo.supplier_name,
          })
          .then((response) => {
            // queryResults=response.data;

            // console.log(response.data);

            queryResults.splice(0);

            for (let i = 0; i < response.data.data.length; i++) {
              queryResults.push(response.data.data[i]);
            }

            showSupplierSelect.value = true;

            // console.log(queryResults)

            // console.log(queryResults)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const selectOption = (supplier_id, supplier_name) => {
      showSupplierSelect.value = false;
      purchaseInfo.supplier_name = supplier_name;
      purchaseInfo.supplier_id = supplier_id;
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
        // formData.append('searchQuery',purchaseInfo.supplier)
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
      product_unit_id,
      product_stock_id,
      product_image
    ) => {
      showProductSelect.value = false;
      itemHolder.product_name = product_name;
      itemHolder.product_id = product_id;
      itemHolder.quantity = 1;
      itemHolder.unit = product_unit;
      itemHolder.unit_id = product_unit_id;
      itemHolder.price = product_price;
      itemHolder.unit_id = product_unit_id;
      itemHolder.stock_id = product_stock_id;
      itemHolder.image = product_image;
    };
    const createReturnInvoice = () => {
      const purchase_slip = {
        items: purchaseItems,
        supplier_id: purchaseInfo.supplier_id,
        supplier_name: purchaseInfo.supplier_name,
        due_date: purchaseInfo.due_date,
        return_purchase_date: purchaseInfo.return_purchase_date,
        note: purchaseInfo.note,
        discount: purchaseInfo.discount,
        // id: purchaseInfo.id,
      };
      axios
        .post("/return-purchase/create", purchase_slip)
        .then((response) => {
          //response.data.message have success message

          console.log(response.data);

          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-center",
            transition: "zoom",
          });

          clearErrorItemHolder();
          clearItemHolder();
          clearInvoiceInfo();
          router.push({ path: "/return-purchases" });
        })
        .catch((error) => {
          errors.supplier_name = "";
          errors.due_date = "";
          errors.return_purchase_date = "";
          errors.note = "";
          errors.message = "";
          if (error.response.status == 422) {
            errors.value = error.response.data.errors;
            toast(error.response.data.message, {
              showIcon: true,
              type: "danger",
              position: "top-center",
              transition: "zoom",
            });
          }
        });
    };
    const getUserStoreData = () => {
      let custom_return_purchase_number;

      axios
        .get("user-store/")
        .then((response) => {
          store.return_purchase_id_count =
            response.data.store.return_purchase_id_count;

          console.log(response.data);

          custom_return_purchase_number =
            store.return_purchase_id_count.split("-");

          custom_return_purchase_number[1] =
            parseInt(custom_return_purchase_number[1]) + 1;

          store.this_return_purchase_custom_number =
            custom_return_purchase_number.join("-");

          // console.log(store.this_return_purchase_custom_number);

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
      purchaseInfo.subTotal = purchaseItems.reduce(function (carry, item) {
        return carry + parseFloat(item.quantity) * parseFloat(item.price);
      }, 0);
      return parseFloat(purchaseInfo.subTotal);
    });
    const taxAmount = computed(() => {
      if (purchaseInfo.discount != null && purchaseInfo.discount !== "") {
        return parseFloat(
          (subTotal.value - parseFloat(purchaseInfo.discount)) *
            parseFloat(13 / 100)
        );
      } else {
        return parseFloat(subTotal.value * parseFloat(13 / 100));
      }
    });
    const grandTotal = computed(() => {
      if (purchaseInfo.discount != null && purchaseInfo.discount !== "") {
        return parseFloat(
          subTotal.value - parseFloat(purchaseInfo.discount) + taxAmount.value
        );
      } else {
        return parseFloat(subTotal.value + taxAmount.value);
      }
    });

    //end of computed

    //here you can return data and methods
    return {
      itemHolder,
      purchaseItems,
      purchaseInfo,
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
      supplierSelectInput,
      showSupplierSelect,
      selectOption,
      queryResults,
      queryResultsProduct,
      productSelectInput,
      showProductSelect,
      selectOptionProduct,
      createReturnInvoice,
      getUserStoreData,
      store,
      getUnits,
      units,
      VITE_MY_APP_BACK_URL_HOME,
      errors,
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
input.supplierInputHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
textarea.purchaseNotesHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}
input.purchaseDateHolder,
input.purchaseDueDateHolder {
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
.form-return-purchase-reference-holder {
  margin-top: 10px;
}

input.purchaseReferenceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 5px;
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
button.create-return-purchase-btn {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 10px;
}
button.btn-update-to-purchase,
button.btn-add-to-purchase {
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
.purchase-header {
  display: flex;
  justify-content: right;
}
button.btn-new-purchase {
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

.top-return-purchase-section {
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

.purchaseItemProductName {
  display: flex;
  padding: 0px;
  align-items: center;
}
.top-return-purchase-section label {
  margin: 5px;
}
.form-return-purchase-notes {
  margin-top: 10px;
}
.form-return-purchase-supplier {
  margin-top: 10px;
}
.purchase-custom-id {
  margin-top: 10px;
}
.form-return-purchase-date {
  margin-top: 10px;
}
.form-due-date {
  margin-top: 10px;
}
.form-return-purchase-supplier {
  position: relative;
}
.supplier-select {
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
.supplier-select.show {
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
     