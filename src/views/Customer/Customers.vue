<template>
  <main id="customers-page">
    <h1>Customers</h1>
    <Transition :duration="550">
      <div class="modal-container" v-if="showCustomerModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayCustomerModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addCustomer()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Customer</h1>
          </div>
          <div class="modal-body">
            <div class="form-input-customer">
              <label>Customer Name</label>
              <input
                type="text"
                placeholder="Customer Name"
                class="customerNameHolder"
                v-model="customer.name"
              />
            </div>
            <div class="form-input-customer">
              <label> Address</label>

              <input
                type="text"
                placeholder="Customer Address"
                class="customerAddressHolder"
                v-model="customer.address"
              />
            </div>
            <div class="form-input-customer">
              <label> Phone</label>

              <input
                type="text"
                placeholder="Customer Phone"
                class="customerPhoneHolder"
                v-model="customer.phone"
              />
            </div>
            <div class="form-input-customer">
              <label> Opening Balance</label>

              <input
                type="text"
                placeholder="Customer Opening Balance"
                class="customerOpeningBalanceHolder"
                v-model="customer.opening_balance"
              />
            </div>
            <div class="form-input-customer">
              <label> Details</label>
              <textarea
                type="text"
                class="customerDetailsHolder"
                v-model="customer.details"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="customer-header">
      <button class="btn-new-customer" @click="addCustomerBtn()">
        <span class="btn-name"> New Customer</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="customers-content">
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
              <th>Customer ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="customer in customers" v-bind:key="customer.id">
              <tr v-if="customers != null">
                <td>{{ customer.custom_customer_id }}</td>
                <td @click="showCustomer(customer.custom_customer_id)">{{ customer.name }}</td>
                <td>{{ customer.address }}</td>
                <td>{{ customer.phone }}</td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editCustomerModal(customer.id)"
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
    const customers = reactive([]);
    const showCustomerModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const customer = reactive({});
    const modalHeader = ref(""); // Add or Edit Customer

    //on mounted start
    onMounted(() => {
      getCustomers();
    });

    //end of onMounted

    const addCustomerBtn = () => {
      clearCustomer();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayCustomerModal();
      // router.push({ path: '/new-customer' })
    };
    const editCustomerModal = (customer_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayCustomerModal();
      getSingleCustomer(customer_id);
    };
    const getSingleCustomer=(customer_id)=>{

      console.log(customer_id);

      axios.get('customer/'+customer_id)
      .then(response=>{
        // console.log(response.data.customer.name);
        customer.id=response.data.customer.id
        customer.name=response.data.customer.name
        customer.address=response.data.customer.address
        customer.phone=response.data.customer.phone
        customer.opening_balance=response.data.customer.opening_balance
        customer.details=response.data.customer.details;
        
        toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-right",
              transition: "zoom",
            });


      })
      .catch(error=>{
        console.log(error);
      })



    }
    const displayCustomerModal = () => {
      if (showCustomerModal.value) {
        showCustomerModal.value = false;
      } else {
        showCustomerModal.value = true;
      }
    };
    const clearCustomer = () => {
      customer.name = "";
      customer.address = "";
      customer.phone = "";
      customer.opening_balance = "";
      customer.details = "";
    };
    const addCustomer = () => {
      if (isModalUpdating.value) {
        console.log('okay i will update boos')

        let formdata = new FormData();
        formdata.append("id", customer.id);
        formdata.append("name", customer.name);
        formdata.append("address", customer.address);
        formdata.append("phone", customer.phone);
        formdata.append("opening_balance", customer.opening_balance);
        formdata.append("details", customer.details);
        axios
          .post("customer/edit", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear customer form
            clearCustomer();
            //get new data from api customers
            getCustomers();
            //hide the customer modal
            displayCustomerModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('oaky i will add boss')

        let formdata = new FormData();
        formdata.append("name", customer.name);
        formdata.append("address", customer.address);
        formdata.append("phone", customer.phone);
        formdata.append("opening_balance", customer.opening_balance);
        formdata.append("details", customer.details);
        axios
          .post("customer/add", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear customer form
            clearCustomer();
            //get new data from api customers
            getCustomers();
            //hide the customer modal
            displayCustomerModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const showCustomer = (custom_customer_id) => {
      router.push({ path: `${custom_customer_id}/show-customer/` });
    };

    const getCustomers = () => {
      // toast("Customer Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      customers.length = 0;
      axios
        .get("customers")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            customers.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      customer,
      toast,
      customers,
      addCustomerBtn,
      getCustomers,
      showCustomerModal,
      displayCustomerModal,
      addCustomer,
      editCustomerModal,
      modalHeader,
      showCustomer
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

input.customerNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.customerPhoneHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.customerAddressHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.customerDetailsHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.customerOpeningBalanceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
.form-input-customer {
  margin-bottom: 15px;
}

.customer-header {
  display: flex;
  justify-content: right;
}
.customers-content {
  /* background: white; */
}
button.btn-new-customer {
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