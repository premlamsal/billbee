<template>
  <main id="accounts-page">
    <h1>Accounts</h1>
    <Transition :duration="550">
      <div class="modal-container" v-if="showAccountModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayAccountModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addAccount()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Account</h1>
          </div>
          <div class="modal-body">
            <div class="form-input-account">
              <label>Account Name</label>
              <input
                type="text"
                placeholder="Account Name"
                class="form-input-holder"
                v-model="account.name"
              />
            </div>
            <div class="form-input-account">
              <label> Bank Name</label>

              <input
                type="text"
                placeholder="Bank Name"
                class="form-input-holder"
                v-model="account.bank_name"
              />
            </div>
            <div class="form-input-account">
              <label> Account Holder Name</label>

              <input
                type="text"
                placeholder="Account Holder Name"
                class="form-input-holder"
                v-model="account.holder_name"
              />
            </div>
            <div class="form-input-account">
              <label> Bank Account Number</label>

              <input
                type="text"
                placeholder="Bank Account Number"
                class="form-input-holder"
                v-model="account.bank_acc_num"
              />
            </div>
            <div class="form-input-account">
              <label> Opening Balance</label>

              <input
                type="text"
                placeholder="Opening Balance"
                class="form-input-holder"
                v-model="account.opening_balance"
              />
            </div>
            <div class="form-input-account">
              <label> Account Information :</label>
              <textarea
                type="text"
                class="form-input-holder"
                v-model="account.account_info"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="account-header">
      <button class="btn-new-account" @click="addAccountBtn()">
        <span class="btn-name"> New Account</span>
        <span class="material-icons">add_circle</span>
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
        <table>
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Name</th>
              <th>Balance</th>
              <th>Acc. Holder</th>
              <th>Bank</th>
              <th>Bank Acc. Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="account in accounts" v-bind:key="account.id">
              <tr v-if="accounts != null">
                <td>{{ account.custom_account_id }}</td>
                <td  @click="showAccount(account.custom_account_id)" class="cursor">
                  {{ account.name }}
                </td>
                <td>Rs. {{ account.balance }}</td>
                <td>{{ account.holder_name }}</td>
                <td>{{ account.bank_name }}</td>
                <td>{{ account.bank_acc_num }}</td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editAccountModal(account.id)"
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
    const showAccountModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const account = reactive({});
    const modalHeader = ref(""); // Add or Edit Account

    //on mounted start
    onMounted(() => {
      getAccounts();
    });

    //end of onMounted

    const addAccountBtn = () => {
      clearAccount();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayAccountModal();
      // router.push({ path: '/new-account' })
    };
    const editAccountModal = (account_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayAccountModal();
      getSingleAccount(account_id);
    };
    const getSingleAccount = (account_id) => {
      console.log(account_id);

      axios
        .get("account/" + account_id)
        .then((response) => {
          // console.log(response.data.account.name);

          account.name = response.data.account.name;
          account.balance = response.data.account.balance;
          account.bank_name = response.data.account.bank_name;
          account.bank_acc_num = response.data.account.bank_acc_num;
          account.opening_balance = response.data.account.opening_balance;
          account.balance = response.data.account.balance;
          account.account_info = response.data.account.account_info;
          account.holder_name = response.data.account.holder_name;

          account.id = response.data.account.id; //to send id to the update controller

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
    const displayAccountModal = () => {
      if (showAccountModal.value) {
        showAccountModal.value = false;
      } else {
        showAccountModal.value = true;
      }
    };
    const clearAccount = () => {
      account.name = "";
      account.balance = "";
      account.opening_balance = "";
      account.bank_name = "";
      account.holder_name = "";
      account.account_info = "";
      account.bank_acc_num = "";
    };
    const addAccount = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formdata.append("name", account.name);
        // formdata.append('balance', account.balance);
        formdata.append("bank_name", account.bank_name);
        formdata.append("opening_balance", account.opening_balance);
        formdata.append("account_info", account.account_info);
        formdata.append("bank_acc_num", account.bank_acc_num);
        formdata.append("holder_name", account.holder_name);
        formdata.append("id", account.id);

        axios
          .post("account/edit", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear account form
            clearAccount();
            //get new data from api accounts
            getAccounts();
            //hide the account modal
            displayAccountModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", account.name);
        // formdata.append('balance', account.balance);
        formdata.append("bank_name", account.bank_name);
        formdata.append("opening_balance", account.opening_balance);
        formdata.append("account_info", account.account_info);
        formdata.append("bank_acc_num", account.bank_acc_num);
        formdata.append("holder_name", account.holder_name);
        axios
          .post("account/add", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear account form
            clearAccount();
            //get new data from api accounts
            getAccounts();
            //hide the account modal
            displayAccountModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const showAccount = (custom_account_id) => {
      router.push({ path: `${custom_account_id}/show-account/` });
    };

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

    //here you can return data and methods
    return {
      account,
      toast,
      accounts,
      addAccountBtn,
      getAccounts,
      showAccountModal,
      displayAccountModal,
      addAccount,
      editAccountModal,
      modalHeader,
      showAccount,
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