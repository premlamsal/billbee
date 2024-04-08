<template>
  <main id="payments-page">
    <h1>
      <i class="fi fi-ts-coin-up-arrow custom-flat-icons"></i>
      <span style="font-weight: 200"> Customer Payments</span>
    </h1>
    <Transition :duration="550">
      <div class="modal-container" v-if="showPaymentModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayPaymentModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addPayment()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Payment</h1>
          </div>
          <div class="modal-body">
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label for="User Type">Account</label>
                <select
                  class="paymentAccountHolder"
                  v-model="payment.account_id"
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
                <label for="Amount">Amount:</label>
                <input
                  type="text"
                  v-model="payment.amount"
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
            </div>
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label for="Date">Date:</label>
                <input
                  type="date"
                  v-model="payment.date"
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
              <div class="form-input-holder-container">
                <label for="Phone">Notes:</label>
                <textarea
                  v-model="payment.notes"
                  class="paymentNotesHolder"
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
                <label>Reference Image</label>
                <div class="image-upload-icon-holder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 2v3m0 3V5m0 0h3m-3 0h-3"
                    />
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M13 2H5a3 3 0 0 0-3 3v10.5c0 .086.011.17.032.25A1 1 0 0 0 2 16v3a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-7a1 1 0 0 0-.032-.25A1 1 0 0 0 22 11.5V11h-2v.016c-4.297.139-7.4 1.174-9.58 2.623.826.293 1.75.71 2.656 1.256 1.399.84 2.821 2.02 3.778 3.583a1 1 0 1 1-1.706 1.044c-.736-1.203-1.878-2.178-3.102-2.913-1.222-.734-2.465-1.192-3.327-1.392a15.466 15.466 0 0 0-3.703-.386h-.022c-.348.005-.68.02-.994.045V5a1 1 0 0 1 1-1h8V2zM8.5 6a2.68 2.68 0 0 0-1.522.488C6.408 6.898 6 7.574 6 8.5c0 .926.408 1.601.978 2.011A2.674 2.674 0 0 0 8.5 11c.41 0 1.003-.115 1.522-.489.57-.41.978-1.085.978-2.011 0-.926-.408-1.601-.978-2.012A2.674 2.674 0 0 0 8.5 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <img
                  v-bind:src="imagePreview"
                  class="payment_image_upload"
                  v-if="imagePreview"
                />
                <input
                  type="file"
                  v-on:change="fileSelected"
                  :class="[
                    'form-input-holder',
                    errors.image ? 'is-invalid' : '',
                  ]"
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
    <div class="payment-header">
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchPayment()">
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
      <div class="button-box">
        <button class="btn-new-payment" @click="addPaymentBtn()">
          <i class="fi fi-rr-plus"></i>
          <span class="btn-name"> New Payment</span>
        </button>
      </div>
    </div>
    <div class="payments-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="payments.length != 0"
      >
        <table class="table" v-if="payments.length != 0">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Image</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments" v-bind:key="payment.id">
              <td>{{ payment.custom_customer_payment_id }}</td>
              <td>{{ payment.date }}</td>
              <td>Rs. {{ payment.amount }}</td>
              <td>
                <template v-if="payment.image !== '' && payment.image !== null">
                  <img
                    :src="VITE_MY_APP_BACK_URL_HOME + payment.image"
                    width="40"
                    height="40"
                /></template>
                <template v-else>
                  <i class="fi fi-ts-coin-up-arrow custom-flat-icons"></i>
                </template>
              </td>
              <td>
                <div class="flat-action-button-container">
                  <div
                    class="flat-action-button-box edit"
                    @click="editPaymentModal(payment.id)"
                  >
                    <i class="fi fi-rr-edit"></i>
                  </div>
                  <div
                    class="flat-action-button-box delete"
                    @click="deletePaymentModal(payment.id)"
                  >
                    <i class="fi fi-rr-trash"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Add Some Payments</p>
      </div>
      <div class="empty-container" v-else>
        <div class="empty-box">
          <div class="round-empty-holder">
            <!-- <span class="material-icons empty-box">account_balance_wallet</span> -->
            <h4>No Data Found</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-container" v-if="payments.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getPayments(pagination.first_link)"
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
                @click="getPayments(pagination.prev_link)"
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
                @click="getPayments(pagination.path_page + n)"
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
                @click="getPayments(pagination.next_link)"
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
                @click="getPayments(pagination.last_link)"
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
    const payments = reactive([]);
    const accounts = reactive([]);
    const errors = ref({});

    const showPaymentModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const payment = reactive({});
    const modalHeader = ref(""); // Add or Edit Payment
    const custom_customer_id = ref("");
    // const custom_customer_id = ref("");
    const image = ref("");
    const imagePreview = ref("");

    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );

    //on mounted start
    onMounted(() => {
      getIdFromUrl();
      getPayments();
      getAccounts();
    });

    //end of onMounted

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deletePaymentModal = (payment_id) => {
      isActivePrompt.value = true;
      delete_id.value = payment_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deletePayment(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deletePayment = (payment_id) => {
      axios
        .delete("payment/" + payment_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getPayments();
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
    const getIdFromUrl = () => {
      custom_customer_id.value = route.params.id;
      // console.log(custom_customer_id.value);
    }; //end of getIdFromUrl

    const getSinglePayment = (payment_id) => {
      console.log(payment_id);

      axios
        .get("customer/payment/" + payment_id)
        .then((response) => {
          // console.log(response.data.payment.name);
          payment.id = response.data.data[0].id;
          payment.notes = response.data.data[0].notes;
          payment.date = response.data.data[0].date;
          payment.amount = response.data.data[0].amount;
          payment.old_amount = response.data.data[0].amount;
          payment.account_id = response.data.account_id;
          payment.old_account_id = response.data.account_id;
          imagePreview.value =
            VITE_MY_APP_BACK_URL_HOME.value + response.data.data[0].image;

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
      console.log("hello payment");
      clearPayment();
      if (showPaymentModal.value) {
        showPaymentModal.value = false;
      } else {
        showPaymentModal.value = true;
      }
    };
    const clearPayment = () => {
      payment.account = "";
      payment.account_id = "";
      payment.old_account_id = "";
      payment.amount = "";
      payment.notes = "";
      payment.date = "";
      payment.image = "";
      imagePreview.value = "";
      errors.value = "";
    };
    const addPayment = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formData = new FormData();
        formData.append("_METHOD", "POST");
        formData.append("payment_id", payment.id);
        // formData.append("customer_id", custom_customer_id.value);
        formData.append("date", payment.date);
        formData.append("amount", payment.amount);
        formData.append("old_amount", payment.old_amount);
        formData.append("notes", payment.notes);
        formData.append("image", image.value);
        formData.append("account_id", payment.account_id);
        formData.append("old_account_id", payment.old_account_id);

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
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      } else {
        console.log("oaky i will add boss");

        let formData = new FormData();
        formData.append("_METHOD", "POST");
        formData.append("customer_id", custom_customer_id.value);
        formData.append("amount", payment.amount);
        formData.append("notes", payment.notes);
        formData.append("date", payment.date);
        formData.append("account_id", payment.account_id);

        formData.append("image", image.value);

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
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      }
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
    const setAvtarUploadImage = () => {
      // imagePreview.value = "/img/upload_image.png";
    };

    const getPayments = (page_url) => {
      // toast("Payment Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "customer/payments/" + custom_customer_id.value;

      payments.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            payments.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getAccounts = () => {
      // toast("Payment Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      payments.length = 0;
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
      //we are looking for empty searchQuery value. If it is empty we will fetch customer payments without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getPayments();
      }
    });

    //end of watch
    const searchPayment = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "customers/payment/search/" + searchQuery.value;
        payments.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              payments.push(response.data.data[i]);
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
      payment,
      toast,
      payments,
      accounts,
      addPaymentBtn,
      getPayments,
      getAccounts,
      showPaymentModal,
      displayPaymentModal,
      addPayment,
      editPaymentModal,
      modalHeader,
      getIdFromUrl,
      custom_customer_id,
      fileSelected,
      image,
      imagePreview,
      VITE_MY_APP_BACK_URL_HOME,
      setAvtarUploadImage,
      errors,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deletePaymentModal,
      pagination,
      makePagination,
      searchQuery,
      searchPayment,
    };
  }, //end of setup
};
</script>
    
    <style scoped>
.form-input-payment {
  margin-bottom: 15px;
}

.payment-header {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.payments-content {
  /* background: white; */
}
button.btn-new-payment {
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
.payment_image_upload {
  width: 285px;
  height: 230px;
  margin: 0 auto;
  display: flex;
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