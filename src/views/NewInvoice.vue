<template>
  <main id="Invoice-page">
    <h1>Invoice</h1>
    <p>This is the Invoice page</p>
    <div class="huge-invoice-container">
      <div class="Invoice-content">
        <div class="invoice-top-section">
          <div>For Invoice Details</div>
        </div>
        <!-- <header class="px-5 py-4 border-b border-gray-100">
                  <h2 class="font-semibold text-gray-800">Invoices</h2>
              </header> -->
        <div class="invoiceItemsTableContainer">
          <div
          class="insideinvoiceItemsContainer"
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
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>LineTotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width:33%">
                    <input
                      type="text"
                      placeholder="Enter item name"
                      class="nameInputHolder"
                      v-model="itemHolder.name"
                    />
                  </td>
                  <td style="width:15%">
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
                  <thead>
                    <tr>
                      <!-- <th>Product</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th>LineTotal</th>
                      <th>Actions</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in invoiceItems" :key="index">
                      <td style="width:34%">
                        <div class="invoiceItemProductName">
                          <div>
                            <img
                              style="border-radius: 10%"
                              :src="item.image"
                              width="40"
                              height="40"
                              v-if="item.image"
                              :alt="item.name"
                            />
                          </div>
                          <div style="margin-left: 10%">
                            {{ item.name }}
                          </div>
                        </div>
                      </td>
                      <td style="width:16%">
                        <div>
                          {{ item.quantity }}
                        </div>
                      </td>
                      <td style="width:10%">
                        <div>
                          {{ item.unit }}
                        </div>
                      </td>
                      <td style="width:22%">
                        <div>
                          {{ item.price }}
                        </div>
                      </td>

                      <td >
                        <div>
                          {{ (item.lineTotal = item.quantity * item.price) }}
                        </div>
                      </td>
                      <td>
                        <button @click="editInvoiceItem(item.id)" class="btnEditInvoice">Edit</button>
                        <button @click="deleteInvoiceItem(item.id)" class="btnDeleteInvoice">
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
              <button class="create-invoice-btn">Create Invoice</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
    
   

  
  <script>
import { uid } from "uid";
export default {
  name: "Create New Invoice",
  methods: {
    addNewInvoiceItem() {
      this.invoiceItems.push({
        id: uid(),
        name: "",
        image: "",
        price: 0,
        unit: "pc(s)",
        quantity: 0,
        lineTotal: 0,
      });
    },
    addItemToInvoiceBtn() {
      if (this.itemHolder.name === "") {
        this.errorItemHolder.name = "Enter Item";
      }
      if (this.itemHolder.price == 0) {
        this.errorItemHolder.price = "Enter Price";
      }
      if (this.itemHolder.unit == "") {
        this.errorItemHolder.unit = "Select Unit";
      }
      if (this.itemHolder.quantity == 0) {
        this.errorItemHolder.quantity = "Enter Quantity";
      } else {
        this.invoiceItems.push({
          id: uid(),
          name: this.itemHolder.name,
          image: "https://avatars.githubusercontent.com/u/24312128?v=4",
          price: this.itemHolder.price,
          unit: this.itemHolder.unit,
          quantity: this.itemHolder.quantity,
          lineTotal: this.itemHolder.price * this.itemHolder.quantity,
        });
        this.clearItemHolder();
        this.clearErrorItemHolder();
      }
    },
    clearItemHolder() {
      this.itemHolder.name = "";
      this.itemHolder.quantity = 0;
      // this.itemHolder.image="";
      this.itemHolder.unit = "";
      this.itemHolder.price = 0;
      this.itemHolder.lineTotal = 0;
    },
    clearErrorItemHolder() {
      this.errorItemHolder.name = "";
      this.errorItemHolder.quantity = 0;
      // this.errorItemHolder.image="";
      this.errorItemHolder.unit = "";
      this.errorItemHolder.price = 0;
      this.errorItemHolder.lineTotal = 0;
    },
    updateItemToInvoiceBtn() {
      if (this.itemHolder.name === "") {
        this.errorItemHolder.name = "Enter Item";
      }
      if (this.itemHolder.price == 0) {
        this.errorItemHolder.price = "Enter Price";
      }
      if (this.itemHolder.unit == "") {
        this.errorItemHolder.unit = "Select Unit";
      }
      if (this.itemHolder.quantity == 0) {
        this.errorItemHolder.quantity = "Enter Quantity";
      } else {
        let index = this.currentEditItemIDIndex;
        // get old invoiceItems and update with current itemHolder items
        this.invoiceItems[index].name = this.itemHolder.name;
        this.invoiceItems[index].quantity = this.itemHolder.quantity;
        this.invoiceItems[index].unit = this.itemHolder.unit;
        this.invoiceItems[index].price = this.itemHolder.price;
        this.invoiceItems[index].lineTotal =
          this.itemHolder.price * this.itemHolder.quantity;

        console.log(this.invoiceItems);

        // this.invoiceItems.push({
        // id: uid(),
        // name: this.itemHolder.name,
        // image: "https://avatars.githubusercontent.com/u/24312128?v=4",
        // price: this.itemHolder.price,
        // unit: this.itemHolder.unit,
        // quantity: this.itemHolder.quantity,
        // lineTotal: this.itemHolder.price * this.itemHolder.quantity,
        // });

        this.clearItemHolder();
        this.clearErrorItemHolder();
        this.isItemHolderUpdating = false;
      }
    },
    deleteInvoiceItem(id) {
      this.invoiceItems = this.invoiceItems.filter((item) => item.id !== id);
    },
    editInvoiceItem(id) {
      this.isItemHolderUpdating = true;
      let indexForItem = this.invoiceItems.findIndex((item) => item.id === id);
      this.currentEditItemIDIndex = indexForItem;
      // console.log(this.invoiceItems[indexForItem]);

      // console.log(getInvoiceItemFromID);

      this.itemHolder.name = this.invoiceItems[indexForItem].name;
      this.itemHolder.quantity = this.invoiceItems[indexForItem].quantity;
      // this.itemHolder.image="";
      this.itemHolder.unit = this.invoiceItems[indexForItem].unit;
      this.itemHolder.price = this.invoiceItems[indexForItem].price;
      this.itemHolder.lineTotal = this.invoiceItems[indexForItem].lineTotal;
    },
  },
  watch: {
    // "invoiceInfo.discount": function (val, oldVal) {
    //   if (this.invoiceInfo.discount === "") {
    //     this.invoiceInfo.discount = 0;
    //   }
    // },
  },
  computed: {
    subTotal: function () {
      //reduce function is used to sum the array elements
      this.invoiceInfo.subTotal = this.invoiceItems.reduce(function (
        carry,
        item
      ) {
        return carry + parseFloat(item.quantity) * parseFloat(item.price);
      },
      0);
      return parseFloat(this.invoiceInfo.subTotal);
    },

    taxAmount: function () {
      if (
        this.invoiceInfo.discount != null &&
        this.invoiceInfo.discount !== ""
      ) {
        return parseFloat(
          (this.subTotal - parseFloat(this.invoiceInfo.discount)) *
            parseFloat(13 / 100)
        );
      } else {
        return parseFloat(this.subTotal * parseFloat(13 / 100));
      }
    },

    grandTotal: function () {
      if (
        this.invoiceInfo.discount != null &&
        this.invoiceInfo.discount !== ""
      ) {
        return parseFloat(
          this.subTotal - parseFloat(this.invoiceInfo.discount) + this.taxAmount
        );
      } else {
        return parseFloat(this.subTotal + this.taxAmount);
      }
    },
  },
  data() {
    return {
      itemHolder: {
        name: "",
        quantity: 0,
        image: "",
        unit: "",
        price: 0,
        lineTotal: 0,
      },
      invoiceItems: [],
      invoiceInfo: {},

      isItemHolderUpdating: false,

      currentEditItemIDIndex: "",

      errorItemHolder: {
        name: "",
        quantity: "",
        image: "",
        unit: "",
        price: "",
      },
    };
  },
};
</script>
<style scoped>
input.quantityInputHolder{
border: 0px;
  padding: 10px;
  border:1px solid #4ade809c;
  border-radius:10px ;
  width: 100%;

  font-size:14px ;
}
input.nameInputHolder,
select.unitInputHolder,
input.priceInputHolder,
input.totalInputHolder {
  border: 0px;
  padding: 10px;
  border:1px solid #4ade809c;
  border-radius:10px ;
  width: 100%;
  font-size:14px ;
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
  border:1px solid #4ade809c;
  border-radius:10px ;
  width: 100%;
  font-size:14px ;
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
button.btnEditInvoice{
  background: #ffc107;
  color: white;
  padding: 5px;
  border-radius: 2px;
}
button.btnDeleteInvoice{
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
</style>
 