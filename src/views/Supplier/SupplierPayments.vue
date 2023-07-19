<template>
  <main id="payments-page">
    <h1>Supplier Payments</h1>
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
                  v-model="payment.account_id"
                  :class="[
                    'paymentAccountHolder',
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
                    'paymentAmountHolder',
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
                    'paymentDateHolder',
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
                  :class="[
                    'paymentNotesHolder',
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
                <br />
                <img v-bind:src="imagePreview" class="payment_image_upload" />
                <input
                  type="file"
                  :class="[
                    'paymentImageHolder',
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
    <div class="payment-header">
      <button class="btn-new-payment" @click="addPaymentBtn()">
        <span class="btn-name"> New Payment</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="payments-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
      >
        <table class="table" v-if="payments.length != 0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Image</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in payments" v-bind:key="payment.id">
              <td>{{ payment.date }}</td>
              <td>Rs. {{ payment.amount }}</td>
              <td>
                <img
                  :src="VITE_MY_APP_BACK_URL_HOME + payment.image"
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
                  @click="editPaymentModal(payment.id)"
                  >edit</span
                >
                <span
                  class="material-icons"
                  style="color: orangered; cursor: pointer"
                  >delete</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Add Some Payments</p>
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
    const payments = reactive([]);
    const accounts = reactive([]);
    const errors = ref({});

    const showPaymentModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const payment = reactive({});
    const modalHeader = ref(""); // Add or Edit Payment
    const custom_supplier_id = ref("");
    // const custom_supplier_id = ref("");
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
      custom_supplier_id.value = route.params.id;
      // console.log(custom_supplier_id.value);
    }; //end of getIdFromUrl

    const getSinglePayment = (payment_id) => {
      console.log(payment_id);

      axios
        .get("supplier/payment/" + payment_id)
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
      if (showPaymentModal.value) {
        showPaymentModal.value = false;
      } else {
        showPaymentModal.value = true;
      }
    };
    const clearPayment = () => {
      payment.account = "";
      payment.amount = "";
      payment.notes = "";
      payment.data = "";
      payment.image = "";
      errors.value = "";
    };
    const addPayment = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formData = new FormData();
        formData.append("_METHOD", "POST");
        formData.append("payment_id", payment.id);
        // formData.append("supplier_id", custom_supplier_id.value);
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
          .post("supplier/update-payment", formData, config)
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
        formData.append("supplier_id", custom_supplier_id.value);
        formData.append("amount", payment.amount);
        formData.append("notes", payment.notes);
        formData.append("date", payment.date);
        formData.append("account_id", payment.account_id);

        formData.append("image", image.value);

        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        axios
          .post("supplier/add-payment", formData, config)
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
      imagePreview.value = "/img/upload_image.png";
    };

    const getPayments = () => {
      // toast("Payment Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      payments.length = 0;
      axios
        .get("/supplier/payments/" + custom_supplier_id.value)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            payments.push(response.data.data[i]);
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
        .get("/accounts")
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
      custom_supplier_id,
      fileSelected,
      image,
      imagePreview,
      VITE_MY_APP_BACK_URL_HOME,
      setAvtarUploadImage,
      errors,
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

select.paymentAccountHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.paymentDateHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.paymentAmountHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.paymentNotesHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.paymentImageHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
.form-input-holder-container {
  margin-bottom: 15px;
}

.payment-header {
  display: flex;
  justify-content: right;
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