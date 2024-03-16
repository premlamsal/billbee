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
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label for="User Type">Account</label>
                <select
                  v-model="transaction.account_id"
                  :class="[
                    'form-input-holder',
                    errors.account_id ? 'is-invalid' : '',
                  ]"
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
                <div v-if="errors.account_id" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.account_id"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-input-holder-container">
                <label for="Name">TransactionName:</label>
                <input
                  type="text"
                  v-model="transaction.transaction_name"
                  :class="[
                    'form-input-holder',
                    errors.transaction_name ? 'is-invalid' : '',
                  ]"
                />
                <div v-if="errors.transaction_name" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.transaction_name"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label for="Amount">Amount:</label>
                <input
                  type="text"
                  v-model="transaction.amount"
                  :class="[
                    'form-input-holder',
                    errors.amount ? 'is-invalid' : '',
                  ]"
                />
                <div v-if="errors.amount" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.amount"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-input-holder-container">
                <label for="Date">Date:</label>
                <input
                  type="date"
                  v-model="transaction.date"
                  :class="[
                    'form-input-holder',
                    errors.date ? 'is-invalid' : '',
                  ]"
                />
                <div v-if="errors.date" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.date"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label for="Phone">Notes:</label>
                <textarea
                  v-model="transaction.notes"
                  :class="[
                    'form-input-holder',
                    errors.notes ? 'is-invalid' : '',
                  ]"
                ></textarea>
                <div v-if="errors.notes" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.notes"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <div class="">Transaction Type</div>
                <div class="radio-inputs">
                  <div class="radio-box">
                    <label>
                      <input
                        type="radio"
                        name="engine"
                        id="income"
                        value="income"
                        v-model="transaction.transaction_type"
                        :class="[
                          'radio-input',
                          errors.transaction_type ? 'is-invalid' : '',
                        ]"
                      />
                      <span class="radio-tile">
                        <span class="radio-icon">
                          <svg
                            stroke="currentColor"
                            xml:space="preserve"
                            viewBox="0 0 1024 1024"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns="http://www.w3.org/2000/svg"
                            id="Capa_1"
                            version="1.1"
                            width="200px"
                            height="200px"
                            fill="none"
                          >
                            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                            <g
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              id="SVGRepo_tracerCarrier"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M277.675 981.521c5.657 0 10.24-4.583 10.24-10.24V499.514c0-5.651-4.588-10.24-10.24-10.24h-81.92c-5.652 0-10.24 4.589-10.24 10.24v471.767c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V499.514c0-28.271 22.924-51.2 51.2-51.2h81.92c28.276 0 51.2 22.929 51.2 51.2v471.767c0 28.278-22.922 51.2-51.2 51.2zm275.456-40.96c5.657 0 10.24-4.583 10.24-10.24V408.777c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v562.504c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V408.777c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v562.504c0 28.278-22.922 51.2-51.2 51.2zm275.456-40.016c5.657 0 10.24-4.583 10.24-10.24V318.974c0-5.651-4.588-10.24-10.24-10.24h-81.92c-5.652 0-10.24 4.589-10.24 10.24v653.251c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V318.974c0-28.271 22.924-51.2 51.2-51.2h81.92c28.276 0 51.2 22.929 51.2 51.2v653.251c0 28.278-22.922 51.2-51.2 51.2zM696.848 40.96l102.39.154c11.311.017 20.494-9.138 20.511-20.449S810.611.171 799.3.154L696.91 0c-11.311-.017-20.494 9.138-20.511 20.449s9.138 20.494 20.449 20.511z"
                              />
                              <path
                                d="M778.789 20.571l-.307 101.827c-.034 11.311 9.107 20.508 20.418 20.542s20.508-9.107 20.542-20.418l.307-101.827C819.783 9.384 810.642.187 799.331.153s-20.508 9.107-20.542 20.418z"
                              />
                              <path
                                d="M163.84 317.682h154.184a51.207 51.207 0 0036.211-14.999L457.208 199.71a10.263 10.263 0 017.237-3.003h159.754a51.235 51.235 0 0036.198-14.976l141.13-141.13c7.998-7.998 7.998-20.965 0-28.963s-20.965-7.998-28.963 0L631.447 152.755a10.265 10.265 0 01-7.248 2.992H464.445a51.226 51.226 0 00-36.201 14.999L325.271 273.719a10.244 10.244 0 01-7.248 3.003H163.839c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span class="radio-label">Income</span>
                      </span>
                    </label>
                  </div>

                  <div class="radio-box">
                    <label>
                      <input
                        checked=""
                        class="radio-input"
                        type="radio"
                        name="engine"
                        id="expense"
                        value="expense"
                        v-model="transaction.transaction_type"
                      />
                      <span class="radio-tile">
                        <span class="radio-icon">
                          <svg
                            stroke="currentColor"
                            xml:space="preserve"
                            viewBox="0 0 122.88 101.33"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns="http://www.w3.org/2000/svg"
                            id="Capa_1"
                            version="1.1"
                            width="800px"
                            height="800px"
                            fill="none"
                          >
                            <path
                              class="st0"
                              d="M90.62,33.32h18.4v-2.79c-2.88-10.73-10.2-10.66-19.25-10.57c-1.49,0.02-2.84,0.03-2.92,0.03H18.07 c-1.58,0-2.86-1.28-2.86-2.86c0-1.58,1.28-2.86,2.86-2.86h68.78c2.03,0,2.46,0,2.87-0.01c7.74-0.08,14.5-0.15,19.3,4.38v-1.31 c0-3.2-1.31-6.1-3.42-8.21c-2.11-2.11-5.02-3.42-8.21-3.42H17.34c-3.2,0-6.1,1.31-8.21,3.42c-2.11,2.11-3.42,5.02-3.42,8.21v66.64 c0,3.2,1.31,6.1,3.42,8.21c2.11,2.11,5.02,3.42,8.21,3.42h80.04c3.2,0,6.1-1.31,8.21-3.42c2.11-2.11,3.42-5.02,3.42-8.21v-9.46 h-18.4c-5.55,0-10.6-2.27-14.25-5.92c-3.65-3.65-5.92-8.7-5.92-14.25v-0.87c0-5.55,2.27-10.6,5.92-14.25 C80.02,35.59,85.06,33.32,90.62,33.32L90.62,33.32z M114.73,33.43c2.07,0.31,3.92,1.29,5.33,2.71c1.74,1.74,2.81,4.14,2.81,6.78 v21.6c0,2.76-1.12,5.26-2.93,7.07c-1.39,1.39-3.2,2.38-5.21,2.76v9.63c0,4.77-1.95,9.11-5.09,12.25 c-3.14,3.14-7.48,5.09-12.25,5.09H17.34c-4.77,0-9.11-1.95-12.25-5.09C1.95,93.1,0,88.76,0,83.99V17.34 c0-4.77,1.95-9.11,5.09-12.25C8.23,1.95,12.57,0,17.34,0h80.04c4.77,0,9.11,1.95,12.25,5.09c3.14,3.14,5.09,7.48,5.09,12.25V33.43 L114.73,33.43z M88.14,46.11c4.05,0,7.33,3.28,7.33,7.33c0,4.05-3.28,7.33-7.33,7.33c-4.05,0-7.33-3.28-7.33-7.33 C80.81,49.39,84.09,46.11,88.14,46.11L88.14,46.11z"
                            />
                          </svg>
                        </span>
                        <span class="radio-label">Expense</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div v-if="errors.transaction_type" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.transaction_type"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Reference Image</label>
                <br />
                <img
                  v-bind:src="imagePreview"
                  v-if="imagePreview"
                  class="product_logo_img"
                  width="40"
                  height="40"
                />
                <input
                  type="file"
                  :class="[
                    'form-input-holder',
                    errors.image ? 'is-invalid' : '',
                  ]"
                  v-on:change="fileSelected"
                />
                <div v-if="errors.image" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.image"
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
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="transaction-header mt20">
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchTransaction()">
            <span class="material-icons">search</span>
          </div>
          <input
            type="text"
            class="searchInputTable"
            placeholder="Search.."
            v-model="searchQuery"
          />
        </div>
      </div>
      <div class="button-box" v-if="hasPermission('add_transaction')">
        <button class="btn-new-transaction" @click="addTransactionBtn()">
          <span class="btn-name"> New Transaction</span>
          <span class="material-icons">add_circle</span>
        </button>
      </div>
    </div>
    <div class="transactions-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="transactions.length != 0"
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
              <template
                v-if="
                  hasPermission('show_transaction') ||
                  hasPermission('edit_transaction') ||
                  hasPermission('delete_transaction')
                "
              >
                <th>Actions</th>
              </template>
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
                <template
                  v-if="
                    hasPermission('show_transaction') ||
                    hasPermission('edit_transaction') ||
                    hasPermission('delete_transaction')
                  "
                >
                  <td>
                    <span
                      class="material-icons"
                      style="color: var(--primary); cursor: pointer"
                      v-if="hasPermission('show_transaction')"
                      >format_align_justify</span
                    >
                    <span
                      class="material-icons"
                      style="color: blueviolet; cursor: pointer"
                      @click="editTransactionModal(transaction.id)"
                      v-if="hasPermission('show_transaction')"
                      >edit</span
                    >
                    <span
                      class="material-icons"
                      style="color: orangered; cursor: pointer"
                      @click="deleteTransactionModal(transaction.id)"
                      v-if="hasPermission('show_transaction')"
                      >delete</span
                    >
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination-container" v-if="transactions.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getTransactions(pagination.first_link)"
                class="page-link"
              >
                <span class="material-icons">first_page</span>
                First
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.prev_link }"
              v-if="pagination.prev_link"
            >
              <button
                @click="getTransactions(pagination.prev_link)"
                class="page-link"
              >
                <span class="material-icons">chevron_left</span>

                Prev
              </button>
            </li>
            <li
              v-for="n in pagination.last_page"
              v-bind:key="n"
              class="page-item"
              v-bind:class="{ active: pagination.current_page == n }"
            >
              <button
                @click="getTransactions(pagination.path_page + n)"
                class="page-link"
              >
                {{ n }}
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.next_link }"
              v-if="pagination.next_link"
            >
              <button
                @click="getTransactions(pagination.next_link)"
                class="page-link"
              >
                <span class="material-icons">chevron_right</span>

                Next
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.last_link }"
            >
              <button
                @click="getTransactions(pagination.last_link)"
                class="page-link"
              >
                <span class="material-icons">last_page</span>

                Last
              </button>
            </li>
          </ul>
        </div>
        <div class="pagination-footer">
          Page: {{ pagination.current_page }}-{{ pagination.last_page }} Total
          Records: {{ pagination.total_pages }}
        </div>
      </div>
    </div>
  </main>
  <prompt
    :is-prompt="isActivePrompt"
    @event-confirm="callbackPrompt"
    @event-cancel="callbackPromptCancel"
  ></prompt>
</template>
    <script>
import { computed, reactive, ref, inject, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSnipperStore } from "@/stores/snipper";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const accounts = reactive([]);
    const errors = ref({});

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
      old_account_id: "",
      oldamount: "",
      image: "",
      store_id: "",
    });
    const showTransactionModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const transactions = reactive([]);
    const modalHeader = ref(""); // Add or Edit Transaction
    const storeSnipp = useSnipperStore();
    const hasAccess = storeSnipp.permissions;

    // console.log("hello from soft");

    // console.log(hasAccess);

    const hasPermission = (action) => {
      // if (hasAccess.includes(action) || hasAccess.includes("all")) {
      //   return true;
      // } else {
      //   return false;
      // }
      return hasAccess.includes(action) || hasAccess.includes("all")
        ? true
        : false;
    };
    //on mounted start
    onMounted(() => {
      getTransactions();
      fetchAccounts();
    });

    //end of onMounted

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteTransactionModal = (transaction_id) => {
      isActivePrompt.value = true;
      delete_id.value = transaction_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteTransaction(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteTransaction = (transaction_id) => {
      axios
        .delete("transaction/" + transaction_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getTransactions();
        })
        .catch((error) => {
          console.log(error);
        });
    };

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
          transaction.transaction_type = response.data.data[0].transaction_type;
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
      clearTransaction();
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
      imagePreview.value = "";
      errors.value = "";
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
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
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
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
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

    const getTransactions = (page_url) => {
      // toast("Transaction Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "transactions";

      transactions.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            transactions.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const pagination = ref({});

    const makePagination = (meta, links) => {
      let pagination_temp = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        from_page: meta.from,
        to_page: meta.to,
        total_pages: meta.total,
        path_page: meta.path + "?page=",
        first_link: links.first,
        last_link: links.last,
        prev_link: links.prev,
        next_link: links.next,
      };
      pagination.value = pagination_temp;
    };

    const searchQuery = ref("");

    //watching seach query
    watch(searchQuery, (newX) => {
      //newX is new value of searchQuery
      //we are looking for empty searchQuery value. If it is empty we will fetch transactions without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getTransactions();
      }
    });

    //end of watch
    const searchTransaction = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "transactions/search/" + searchQuery.value;
        transactions.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              transactions.push(response.data.data[i]);
            }
            if (response.data.data.length != null) {
              makePagination(response.data.meta, response.data.links);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        //end of api call
      } else {
        //no search query
        console.log("i cannot seach with empy query");
      }
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
      errors,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteTransactionModal,
      pagination,
      makePagination,
      searchQuery,
      searchTransaction,
      hasPermission,
    };
  }, //end of setup
};
</script>
    
    <style scoped>
.form-input-holder-container {
  margin-bottom: 15px;
}

.transaction-header {
  display: flex;
  justify-content: space-between;
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

/* radio button */
.radio-box {
  flex: 1;
}
.radio-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-width: 350px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.radio-inputs > * {
  margin: 6px;
}

.radio-input:checked + .radio-tile {
  border-color: var(--primary-alt);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: var(--primary-alt);
}

.radio-input:checked + .radio-tile:before {
  transform: scale(1);
  opacity: 1;
  background-color: var(--primary-alt);
  border-color: var(--primary-alt);
}

.radio-input:checked + .radio-tile .radio-icon svg {
  fill: var(--primary-alt);
}

.radio-input:checked + .radio-tile .radio-label {
  color: var(--primary-alt);
}

.radio-input:focus + .radio-tile {
  border-color: var(--primary-alt);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--primary);
  /* background: var(--primary); */
  color: white;
}

.radio-input:focus + .radio-tile:before {
  transform: scale(1);
  opacity: 1;
}

.radio-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: 80px; */
  min-height: 80px;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;
}

.radio-tile:before {
  content: "";
  position: absolute;
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  border-radius: 50%;
  top: 0.25rem;
  left: 0.25rem;
  opacity: 0;
  transform: scale(0);
  transition: 0.25s ease;
}

.radio-tile:hover {
  border-color: var(--primary-alt);
}

.radio-tile:hover:before {
  transform: scale(1);
  opacity: 1;
}

.radio-icon svg {
  width: 2rem;
  height: 2rem;
  fill: #494949;
}

.radio-label {
  color: #707070;
  transition: 0.375s ease;
  text-align: center;
  font-size: 13px;
}

.radio-input {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  outline: none;
}
.radio-input::focus {
}

/* radio button end */
</style>