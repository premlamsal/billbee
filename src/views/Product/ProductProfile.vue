<template>
  <main id="products-page">
    <h1>Products Statement</h1>
    <div class="product-header"></div>
    <div class="products-content">
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
              <th scope="col">Date</th>
              <th scope="col">Transaction</th>
              <th scope="col">RefID</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col" style="color: green">Stock IN</th>
              <th scope="col" style="color: red">Stock Out</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" v-bind:key="transaction.id">
              <td scope="row">
                {{ transaction.date }}
              </td>
              <td>{{ transaction.transaction_name }}</td>
              <td>{{ transaction.refID }}</td>
              <td>{{ transaction.quantity }}</td>
              <td>{{ transaction.price }}</td>

              <td v-if="transaction.transaction_type === 'stock_in'">
                {{ transaction.quantity }}
              </td>
              <td v-else></td>

              <td v-if="transaction.transaction_type === 'stock_out'">
                {{ transaction.quantity }}
              </td>

              <td v-else></td>
              <td>
                {{ transaction.balance }}
              </td>
            </tr>
          </tbody>
          <!-- <tfoot>
            <tr style="border:top:1px solid #fff;">
              <td></td>
              <td></td>

              <td></td>

              <td style="font-weight: bold">Dr.{{ totalExpense }}</td>
              <td style="font-weight: bold">Cr.{{ totalIncome }}</td>
              <td></td>
            </tr>
          </tfoot> -->
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
    const custom_product_id = ref("");
    const axios = inject("$axios");
    const product = reactive({});
    const transactions = reactive([]);

    //on mounted start
    onMounted(() => {
      getIdFromUrl();
      getProductDetails();
      getProductTransactions();
    });

    const totalIncome = computed(() => {
      let totalIncome;
      //reduce function is used to sum the array elements
      totalIncome = transactions.reduce((carry, transaction) => {
        if (
          transaction.transaction_type === "stock_in" ||
          transaction.transaction_type === "stock_out"
        ) {
          return carry + parseFloat(transaction.amount);
        } else {
          return carry + 0;
        }
      }, 0);
      return totalIncome;
    });
    const totalExpense = computed(() => {
      let totalExpense;
      //reduce function is used to sum the array elements
      totalExpense = transactions.reduce((carry, transaction) => {
        if (
          transaction.transaction_type === "expense" ||
          transaction.transaction_type == "purchase_payment"
        ) {
          return carry + parseFloat(transaction.amount);
        } else {
          return carry + 0;
        }
      }, 0);
      return totalExpense;
    });

    //end of onMounted

    const getIdFromUrl = () => {
      custom_product_id.value = route.params.id;
      //   console.log(route.params.id)
    }; //end of getIdFromUrl

    const getProductTransactions = () => {
      axios
        .get("product/transactions/" + custom_product_id.value)
        .then((response) => {
          for (let i = 0; i < response.data.transactions.length; i++) {
            transactions.push(response.data.transactions[i]);
            console.log(transactions);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getProductDetails = () => {
      axios
        .get("product/" + custom_product_id.value)
        .then((response) => {
          product.product_info = response.data.product.product_info;
          product.date = response.data.product.date;

          product.balance = response.data.product.balance;
          product.bank_name = response.data.product.bank_name;
          product.holder_name = response.data.product.holder_name;
          product.id = response.data.product.id;
          product.name = response.data.product.name;
          product.opening_balance = response.data.product.opening_balance;
          product.created_at = response.data.product.created_at;
          product.updated_at = response.data.product.updated_at;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      getProductTransactions,
      getProductDetails,
      product,
      transactions,
      totalIncome,
      totalExpense,
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

input.form-input-holder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.form-input-holder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

.form-input-product {
  margin-bottom: 15px;
}

.product-header {
  display: flex;
  justify-content: right;
}

.products-content {
  /* background: white; */
}

button.btn-new-product {
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
</style>