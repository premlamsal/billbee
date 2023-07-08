<template>
  <main id="transactions-page">
    <h1>Transactions</h1>
    <Transition :duration="550">
      <div class="modal-container" v-if="showTransactionModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayTransactionModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addTransaction()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Transaction</h1>
          </div>
          <div class="modal-body">
            <!-- <div class="form-input-transaction">
                <label>Transaction Name</label>
                <input
                  type="text"
                  placeholder="Transaction Name"
                  class="transactionNameHolder"
                  v-model="transaction.name"
                />
              </div>
              <div class="form-input-transaction">
                <label> Address</label>
  
                <input
                  type="text"
                  placeholder="Transaction Address"
                  class="transactionAddressHolder"
                  v-model="transaction.address"
                />
              </div>
              <div class="form-input-transaction">
                <label> Phone</label>
  
                <input
                  type="text"
                  placeholder="Transaction Phone"
                  class="transactionPhoneHolder"
                  v-model="transaction.phone"
                />
              </div>
              <div class="form-input-transaction">
                <label> Opening Balance</label>
  
                <input
                  type="text"
                  placeholder="Transaction Opening Balance"
                  class="transactionOpeningBalanceHolder"
                  v-model="transaction.opening_balance"
                />
              </div>
              <div class="form-input-transaction">
                <label> Details</label>
                <textarea
                  type="text"
                  class="transactionDetailsHolder"
                  v-model="transaction.details"
                ></textarea>
              </div> -->
            <div class="form-input-transaction">
              <input type="hidden" v-model="transaction.id" />
              <div class="form-input-transaction">
                <label for="User Type">Account</label>
                <select
                  class="transactionAccountHolder"
                  v-model="transaction.account_id"
                >
                  <option
                    selected=""
                    v-for="account in accounts"
                    :value="account.id"
                    v-bind:key="account.id"
                  >
                    {{ account.name }}
                  </option>
                </select>
              </div>

              <div class="form-input-transaction">
                <div class="">Transaction Type</div>
                <div class="transactionTypeOuterHolder">
                  <input
                    type="radio"
                    id="income"
                    value="income"
                    class="transactionTypeHolder"
                    v-model="transaction.transaction_type"
                  />
                  <label for="Income">Income</label>
                </div>
                <div class="transactionTypeOuterHolder">
                  <input
                    type="radio"
                    id="expense"
                    value="expense"
                    class="transactionTypeHolder"
                    v-model="transaction.transaction_type"
                  />
                  <label for="Expense">Expense</label>
                </div>
              </div>

              <label for="Amount">Amount:</label>
              <input
                type="text"
                v-model="transaction.amount"
                :class="['transactionAmountHolder']"
              />
            </div>
            <div class="form-input-transaction">
              <label for="Date">Date:</label>
              <input
                type="date"
                v-model="transaction.date"
                :class="['transactionDateHolder']"
              />
            </div>
            <div class="form-input-transaction">
              <label for="Name">TransactionName:</label>
              <input
                type="text"
                v-model="transaction.transaction_name"
                :class="['transactionNameHolder']"
              />
            </div>
            <div class="form-input-transaction">
              <label for="Phone">Notes:</label>
              <textarea
                v-model="transaction.notes"
                :class="['transactionNotesHolder']"
              ></textarea>
            </div>
            <div class="form-input-transaction" >
              <label>Reference Image</label>
              <br />
              <img v-bind:src="imagePreview" v-if="imagePreview" class="product_logo_img" width="40" height="40" />
              <input
                type="file"
                :class="['transactionImageHolder']"
                v-on:change="fileSelected"
              />
            </div>
          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="transaction-header">
      <button class="btn-new-transaction" @click="addTransactionBtn()">
        <span class="btn-name"> New Transaction</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="transactions-content">
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
              <th>Date</th>
              <th>Transaction Name</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Account</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="transaction in transactions"
              v-bind:key="transaction.id"
            >
              <tr v-if="transaction.id">
                <td @click="transactionProfile(transaction.id)" class="cursor">
                  {{ transaction.date }}
                </td>
                <td>{{ transaction.transaction_name }}</td>
                <td>{{ transaction.transaction_type }}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.notes }}</td>
                <td>{{ transaction.account_id }}</td>
                <td>
                  <img
                    :src="VITE_MY_APP_BACK_URL_HOME + transaction.image"
                    width="40"
                    height="40"
                  />
                </td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editTransactionModal(transaction.id)"
                    >edit</span
                  >
                  <span
                    class="material-icons"
                    style="color: orangered; cursor: pointer"
                    >delete</span
                  >
                </td>
              </tr>
            </template>
          </tbody>
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
    const accounts = reactive([]);
    // const transaction_id = reactive("");
    const image = ref("");
    const imagePreview = ref("");

    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );
  

    

    const transaction = reactive({
      date: "",
      transaction_name: "",
      transaction_type: "",
      notes: "",
      refID: "",
      amount: "",
      account_id: "",
      old_account_id:"",
      oldamount:'',
      image: "",
      store_id: "",
    });
    const showTransactionModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const transactions = reactive([]);
    const modalHeader = ref(""); // Add or Edit Transaction

    //on mounted start
    onMounted(() => {
      getTransactions();
      fetchAccounts();
    });

    //end of onMounted

    // const remove_underscore = (value) => {
    //   if (value != null) {
    //     return value.replace(/_/g, " ");
    //   } else {
    //     return "";
    //   }
    // };
    const setAvtarUploadImage = () => {
      imagePreview.value = "/img/upload_image.png";
    };
    const fileSelected = (e) => {
      image.value = e.target.files[0];

      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          imagePreview.value = reader.result;
        }.bind(),
        false
      );

      if (image.value) {
        if (/\.(jpe?g|png|gif)$/i.test(image.value.name)) {
          reader.readAsDataURL(image.value);
        }
      }
    };

    const addTransactionBtn = () => {
      clearTransaction();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayTransactionModal();
      // router.push({ path: '/new-transaction' })
    };
    const editTransactionModal = (transaction_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayTransactionModal();
      getSingleTransaction(transaction_id);
    };
    const getSingleTransaction = (transaction_id) => {
      console.log(transaction_id);

      axios
        .get("transaction/" + transaction_id)
        .then((response) => {
          // console.log(response.data.transaction.name);
          transaction.id = response.data.data[0].id;
          transaction.notes = response.data.data[0].notes;
          transaction.amount = response.data.data[0].amount;
          transaction.oldamount = response.data.data[0].amount;
          transaction.transaction_name = response.data.data[0].transaction_name;
          transaction.date = response.data.data[0].date;
          transaction.transaction_type =response.data.data[0].transaction_type;
          transaction.account_id = response.data.data[0].account_id;
          imagePreview.value = response.data.data[0].image;
        
          if (isValidHttpUrl(response.data.data[0].image)) {
            transaction.image = response.data.data[0].image;
            imagePreview.value = transaction.image;
            // console.log('valid')
          } else {
            // console.log('no-valid')
            // console.log(VITE_MY_APP_BACK_URL_HOME.value)
            transaction.image =
              VITE_MY_APP_BACK_URL_HOME.value + response.data.data[0].image;
            imagePreview.value = transaction.image;
          }

        //   toast(response.data.message, {
        //     showIcon: true,
        //     type: response.data.status,
        //     position: "top-right",
        //     transition: "zoom",
        //   });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchAccounts = () => {
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
    const displayTransactionModal = () => {
      if (showTransactionModal.value) {
        showTransactionModal.value = false;
      } else {
        showTransactionModal.value = true;
      }
    };
    const clearTransaction = () => {
      transaction.id = "";
      transaction.amount = "";
      transaction.oldamount = "";
      transaction.transaction_name = "";
      transaction.transaction_name = "";
      transaction.account_id = "";
      transaction.date = "";
      image.value = "";
      imagePreview.value="";
    };
    const addTransaction = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formData = new FormData();
        formData.append("_METHOD", "POST");
        formData.append("transaction_id", transaction.id);
        formData.append("amount", transaction.amount);
        formData.append("oldamount", transaction.oldamount);
        formData.append("notes", transaction.notes);
        formData.append("transaction_type", transaction.transaction_type);
        formData.append("transaction_name", transaction.transaction_name);
        formData.append("account_id", transaction.account_id);
        formData.append("date", transaction.date);
        if (image.value) {
            formData.append("image", image.value);
        }
        formData.append("image", "");


        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        axios
          .post("transaction/edit", formData, config)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear transaction form
            clearTransaction();
            //get new data from api transactions
            getTransactions();
            //hide the transaction modal
            displayTransactionModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("oaky i will add boss");

        let formData = new FormData();
        formData.append("_METHOD", "POST");
        formData.append("amount", transaction.amount);
        formData.append("notes", transaction.notes);
        formData.append("date", transaction.date);
        formData.append("transaction_type", transaction.transaction_type);
        formData.append("transaction_name", transaction.transaction_name);
        formData.append("account_id", transaction.account_id);
        if (image.value) {
            formData.append("image", image.value);
        }
        formData.append("image", "");

        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        axios
          .post("transaction/add", formData, config)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear transaction form
            clearTransaction();
            //get new data from api transactions
            getTransactions();
            //hide the transaction modal
            displayTransactionModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
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

    const getTransactions = () => {
      // toast("Transaction Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      transactions.length = 0;
      axios
        .get("transactions")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            transactions.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      transaction,
      toast,
      transactions,
      addTransactionBtn,
      getTransactions,
      showTransactionModal,
      displayTransactionModal,
      addTransaction,
      editTransactionModal,
      modalHeader,
      fetchAccounts,
      accounts,
      fileSelected,
      image,
      imagePreview,
      VITE_MY_APP_BACK_URL_HOME,
      setAvtarUploadImage,
      isValidHttpUrl,

    //   transaction_id,
      imagePreview,
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

input.transactionNameHolder,
input.transactionDateHolder,
input.transactionAmountHolder,
input.transactionAccountHolder,

input.transactionImageHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
select.transactionAccountHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
input.transactionTypeHolder {
  border: 0px;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
}

textarea.transactionNotesHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

.form-input-transaction {
  margin-bottom: 15px;
}

.transaction-header {
  display: flex;
  justify-content: right;
}
.transactions-content {
  /* background: white; */
}
button.btn-new-transaction {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
img.product_logo_img {
  width: 60px;
  /* margin-top: 15px; */
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