<template>
  <main id="accounts-page">
    <h1>Accounts Statement</h1>
    <div class="account-header"></div>
    <div class="accounts-content">
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
              <th scope="col" style="color: red">Dr.</th>
              <th scope="col" style="color: green">Cr.</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" v-bind:key="transaction.id">
              <td scope="row">
                {{ transaction.date }}
              </td>
              <td v-if="transaction.transaction_type === 'opening_balance'">
                Opening Balance
              </td>
              <td v-if="transaction.transaction_type === 'income'">Income</td>
              <td v-if="transaction.transaction_type === 'sales_payment'">
                Sales Payment
              </td>
              <td v-if="transaction.transaction_type === 'purchase_payment'">
                Purchase Payment
              </td>

              <td v-if="transaction.transaction_type === 'expense'">Expense</td>

              <td>{{ transaction.refID }}</td>

              <td v-if="transaction.transaction_type === 'expense'">
                {{ transaction.amount }}
              </td>
              <td
                v-else-if="transaction.transaction_type === 'purchase_payment'"
              >
                {{ transaction.amount }}
              </td>
              <td v-else></td>
              <td v-if="transaction.transaction_type === 'income'">
                {{ transaction.amount }}
              </td>
              <td v-else-if="transaction.transaction_type === 'sales_payment'">
                {{ transaction.amount }}
              </td>
              <td v-else></td>
              <td>
                {{ transaction.balance }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="border:top:1px solid #fff;">
              <td></td>
              <td></td>

              <td></td>

              <td style="font-weight: bold">Dr.{{ totalExpense }}</td>
              <td style="font-weight: bold">Cr.{{ totalIncome }}</td>
              <td></td>
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
    const custom_account_id = ref("");
    const axios = inject("$axios");
    const account = reactive({});
    const transactions = reactive([]);

    //on mounted start
    onMounted(() => {
      getIdFromUrl();
      getAccountDetails();
      getAccountTransactions();
    });

    const totalIncome = computed(() => {
      let totalIncome;
      //reduce function is used to sum the array elements
      totalIncome = transactions.reduce((carry, transaction) => {
        if (
          transaction.transaction_type === "income" ||
          transaction.transaction_type === "sales_payment"
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
      custom_account_id.value = route.params.id;
      //   console.log(route.params.id)
    }; //end of getIdFromUrl

    const getAccountTransactions = () => {
      axios
        .get("account/transactions/" + custom_account_id.value)
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
    const getAccountDetails = () => {
      axios
        .get("custom-account/" + custom_account_id.value)
        .then((response) => {
          account.account_info = response.data.account.account_info;
          account.date = response.data.account.date;

          account.balance = response.data.account.balance;
          account.bank_name = response.data.account.bank_name;
          account.holder_name = response.data.account.holder_name;
          account.id = response.data.account.id;
          account.name = response.data.account.name;
          account.opening_balance = response.data.account.opening_balance;
          account.created_at = response.data.account.created_at;
          account.updated_at = response.data.account.updated_at;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      getAccountTransactions,
      getAccountDetails,
      account,
      transactions,
      totalIncome,
      totalExpense,
    };
  }, //end of setup
};
</script>
      
      <style scoped>
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

.form-input-account {
  margin-bottom: 15px;
}

.account-header {
  display: flex;
  justify-content: right;
}
.accounts-content {
  /* background: white; */
}
button.btn-new-account {
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