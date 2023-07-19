<template>
  <main id="suppliers-page">
    <h1>Suppliers</h1>
    <Transition :duration="550">
      <div class="modal-container" v-if="showSupplierModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displaySupplierModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addSupplier()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Supplier</h1>
          </div>
          <div class="modal-body">
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Supplier Name</label>
                <input
                  type="text"
                  placeholder="Supplier Name"
                  v-model="supplier.name"
                  :class="[
                    'supplierNameHolder',
                    errors.name ? 'is-invalid' : '',
                  ]"
                />
                <div v-if="errors.name" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.name"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-input-holder-container">
                <label> Address</label>

                <input
                  type="text"
                  placeholder="Supplier Address"
                  :class="[
                    'supplierAddressHolder',
                    errors.address ? 'is-invalid' : '',
                  ]"
                  v-model="supplier.address"
                />
                <div v-if="errors.address" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.address"
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
                <label> Phone</label>

                <input
                  type="text"
                  placeholder="Supplier Phone"
                  :class="[
                    'supplierPhoneHolder',
                    errors.phone ? 'is-invalid' : '',
                  ]"
                  v-model="supplier.phone"
                />
                <div v-if="errors.phone" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.phone"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-input-holder-container">
                <label> Opening Balance</label>

                <input
                  type="text"
                  placeholder="Supplier Opening Balance"
                  :class="[
                    'supplierOpeningBalanceHolder',
                    errors.opening_balance ? 'is-invalid' : '',
                  ]"
                  v-model="supplier.opening_balance"
                />
                <div v-if="errors.opening_balance" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.opening_balance"
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
                <label> Details</label>
                <textarea
                  type="text"
                  :class="[
                    'supplierDetailsHolder',
                    errors.details ? 'is-invalid' : '',
                  ]"
                  v-model="supplier.details"
                ></textarea>
                <div v-if="errors.details" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.details"
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
    <div class="supplier-header">
      <button class="btn-new-supplier" @click="addSupplierBtn()">
        <span class="btn-name"> New Supplier</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="suppliers-content">
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
              <th>Supplier ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="supplier in suppliers" v-bind:key="supplier.id">
              <tr v-if="suppliers != null">
                <td>{{ supplier.custom_supplier_id }}</td>
                <td @click="showSupplier(supplier.custom_supplier_id)">
                  {{ supplier.name }}
                </td>
                <td>{{ supplier.address }}</td>
                <td>{{ supplier.phone }}</td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editSupplierModal(supplier.id)"
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
    const suppliers = reactive([]);
    const errors = ref({});

    const showSupplierModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const supplier = reactive({});
    const modalHeader = ref(""); // Add or Edit Supplier

    //on mounted start
    onMounted(() => {
      getSuppliers();
    });

    //end of onMounted
    const showSupplier = (custom_supplier_id) => {
      router.push({ path: `${custom_supplier_id}/show-supplier/` });
    };
    const addSupplierBtn = () => {
      clearSupplier();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displaySupplierModal();
      // router.push({ path: '/new-supplier' })
    };
    const editSupplierModal = (supplier_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displaySupplierModal();
      getSingleSupplier(supplier_id);
    };
    const getSingleSupplier = (supplier_id) => {
      console.log(supplier_id);

      axios
        .get("supplier/" + supplier_id)
        .then((response) => {
          // console.log(response.data.supplier.name);
          supplier.id = response.data.supplier.id;
          supplier.name = response.data.supplier.name;
          supplier.address = response.data.supplier.address;
          supplier.phone = response.data.supplier.phone;
          supplier.opening_balance = response.data.supplier.opening_balance;
          supplier.details = response.data.supplier.details;

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

    const displaySupplierModal = () => {
      if (showSupplierModal.value) {
        showSupplierModal.value = false;
      } else {
        showSupplierModal.value = true;
      }
    };
    const clearSupplier = () => {
      supplier.name = "";
      supplier.address = "";
      supplier.phone = "";
      supplier.opening_balance = "";
      supplier.details = "";
      errors.value = "";
    };
    const addSupplier = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formdata.append("id", supplier.id);
        formdata.append("name", supplier.name);
        formdata.append("address", supplier.address);
        formdata.append("phone", supplier.phone);
        formdata.append("opening_balance", supplier.opening_balance);
        formdata.append("details", supplier.details);
        axios
          .post("supplier/edit", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear supplier form
            clearSupplier();
            //get new data from api suppliers
            getSuppliers();
            //hide the supplier modal
            displaySupplierModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", supplier.name);
        formdata.append("address", supplier.address);
        formdata.append("phone", supplier.phone);
        formdata.append("opening_balance", supplier.opening_balance);
        formdata.append("details", supplier.details);
        axios
          .post("supplier/add", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear supplier form
            clearSupplier();
            //get new data from api suppliers
            getSuppliers();
            //hide the supplier modal
            displaySupplierModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      }
    };

    const getSuppliers = () => {
      // toast("Supplier Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      suppliers.length = 0;
      axios
        .get("suppliers")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            suppliers.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      supplier,
      toast,
      suppliers,
      addSupplierBtn,
      getSuppliers,
      showSupplierModal,
      displaySupplierModal,
      addSupplier,
      editSupplierModal,
      modalHeader,
      showSupplier,
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

input.supplierNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.supplierPhoneHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.supplierAddressHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.supplierDetailsHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.supplierOpeningBalanceHolder {
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

.supplier-header {
  display: flex;
  justify-content: right;
}
.suppliers-content {
  /* background: white; */
}
button.btn-new-supplier {
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