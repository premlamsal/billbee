<template>
  <main id="accounts-page">
    <h1>
      <i class="fi fi-tr-review custom-flat-icons"></i>
      <span style="font-weight: 200"> Customer Profile</span>
    </h1>
    <h3 style="font-weight: 200">
      {{ customer.name }} || Customer ID : {{ customer.custom_customer_id }}
    </h3>
    <div class="account-header">
      <button @click="goToCustomerPayments()" class="btn-custom-primary">
        <i class="fi fi-ts-coin-up-arrow"></i>
        <span class="btn-name">Payments</span>
      </button>
    </div>
    <div class="accounts-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
      >
        <table class="table" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Transaction</th>
              <th scope="col">RefID</th>
              <th scope="col">Dr.</th>
              <th scope="col">Cr.</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" v-bind:key="transaction.id">
              <td>
                {{ transaction.date }}
              </td>
              <td v-if="transaction.transaction_type === 'opening_balance'">
                Opening Balance
              </td>
              <td v-if="transaction.transaction_type === 'sales'">Sales</td>
              <td v-if="transaction.transaction_type === 'sales_return'">
                Sales Return
              </td>
              <td v-if="transaction.transaction_type === 'payment'">Payment</td>
              <td>{{ transaction.refID }}</td>
              <td v-if="transaction.transaction_type === 'sales'">
                Rs. {{ transaction.amount }}
              </td>
              <td v-else></td>
              <td v-if="transaction.transaction_type === 'payment'">
                Rs. {{ transaction.amount }}
              </td>
              <td v-else-if="transaction.transaction_type === 'sales_return'">
                Rs. {{ transaction.amount }}
              </td>
              <td v-else></td>
              <td>Rs. {{ transaction.balance }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="border:top:1px solid #fff;">
              <td></td>
              <td></td>

              <td></td>
              <td style="font-weight: bold">Dr. Rs. {{ totalSales }}</td>
              <td style="font-weight: bold">Cr. Rs. {{ totalPayment }}</td>
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
import { useSnipperStore } from "@/stores/snipper";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const custom_customer_id = ref("");
    const axios = inject("$axios");
    const customer = reactive({});
    const transactions = reactive([]);
    const payments = reactive([]);
    const accounts = reactive([]);

    //on mounted start
    onMounted(() => {
      getIdFromUrl();
      getCustomerDetails();
      getCustomerTransactions();
      getCustomerPayments();
      getAccounts();
    });

    const totalSales = computed(() => {
      let totalSales;
      //reduce function is used to sum the array elements
      totalSales = transactions.reduce((carry, transaction) => {
        if (transaction.transaction_type === "sales") {
          return carry + parseFloat(transaction.amount);
        } else {
          return carry + 0;
        }
      }, 0);
      return totalSales;
    });
    const totalPayment = computed(() => {
      let totalPayment;
      //reduce function is used to sum the array elements
      totalPayment = transactions.reduce((carry, transaction) => {
        if (
          transaction.transaction_type === "payment" ||
          transaction.transaction_type === "sales_return"
        ) {
          return carry + parseFloat(transaction.amount);
        } else {
          return carry + 0;
        }
      }, 0);
      return totalPayment;
    });

    //end of onMounted

    const getIdFromUrl = () => {
      custom_customer_id.value = route.params.id;
      //   console.log(route.params.id)
    }; //end of getIdFromUrl

    const getAccounts = () => {
      // toast("Account Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      accounts.length = 0;
      axios
        .get("accounts")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            accounts.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const addPaymentBtn = () => {
      clearPayment();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayPaymentModal();
      // router.push({ path: '/new-payment' })
    };
    const editPaymentModal = (payment_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayPaymentModal();
      getSinglePayment(payment_id);
    };
    const getSinglePayment = (payment_id) => {
      console.log(payment_id);

      axios
        .get("payment/" + payment_id)
        .then((response) => {
          // console.log(response.data.payment.name);
          payment.id = response.data.payment.id;
          payment.name = response.data.payment.name;
          payment.address = response.data.payment.address;
          payment.phone = response.data.payment.phone;
          payment.opening_balance = response.data.payment.opening_balance;
          payment.details = response.data.payment.details;

          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const displayPaymentModal = () => {
      if (showPaymentModal.value) {
        showPaymentModal.value = false;
      } else {
        showPaymentModal.value = true;
      }
    };
    const clearPayment = () => {
      payment.name = "";
      payment.address = "";
      payment.phone = "";
      payment.opening_balance = "";
      payment.details = "";
    };
    const addPayment = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formData.append("_METHOD", "POST");
        formData.append("payment_id", this.payment.id);
        formData.append("customer_id", this.customer_id);
        formData.append("date", this.payment.date);
        formData.append("amount", this.payment.amount);
        formData.append("old_amount", this.payment.old_amount);
        formData.append("notes", this.payment.notes);
        formData.append("image", this.image);
        formData.append("account_id", this.payment.account_id);
        formData.append("old_account_id", this.payment.old_account_id);

        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        axios
          .post("customer/update-payment", formData, config)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear payment form
            clearPayment();
            //get new data from api payments
            getPayments();
            //hide the payment modal
            displayPaymentModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formData.append("_METHOD", "POST");
        formData.append("customer_id", this.customer_id);
        formData.append("amount", this.payment.amount);
        formData.append("notes", this.payment.notes);
        formData.append("date", this.payment.date);
        formData.append("account_id", this.payment.account_id);

        formData.append("image", this.image);

        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        axios
          .post("customer/add-payment", formData, config)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear payment form
            clearPayment();
            //get new data from api payments
            getPayments();
            //hide the payment modal
            displayPaymentModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const goToCustomerPayments = () => {
      // router.push({
      //   path: `${custom_customer_id.value}/customer-payments/`,
      // });
      router.push({ name: "CustomerPayments", params: { custom_customer_id } }); // -> /user/eduardo
    };
    const getCustomerTransactions = () => {
      axios
        .get("customer/transactions/" + custom_customer_id.value)
        .then((response) => {
          for (let i = 0; i < response.data.transactions.length; i++) {
            transactions.push(response.data.transactions[i]);
          }
          console.log(transactions);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getCustomerPayments = () => {
      axios
        .get("customer/payments/" + custom_customer_id.value)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            payments.push(response.data.data[i]);
            console.log(payments);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getCustomerDetails = () => {
      axios
        .get("custom-customer/" + custom_customer_id.value)
        .then((response) => {
          customer.name = response.data.customer.name;
          customer.address = response.data.customer.address;
          customer.custom_customer_id =
            response.data.customer.custom_customer_id;
          customer.details = response.data.customer.details;
          customer.id = response.data.customer.id;
          customer.opening_balance = response.data.customer.opening_balance;
          customer.phone = response.data.customer.phone;
          customer.store_id = response.data.customer.store_id;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      addPaymentBtn,
      editPaymentModal,
      addPayment,
      getCustomerPayments,
      getCustomerTransactions,
      getCustomerDetails,
      transactions,
      accounts,
      customer,
      getAccounts,
      totalSales,
      totalPayment,
      goToCustomerPayments,
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