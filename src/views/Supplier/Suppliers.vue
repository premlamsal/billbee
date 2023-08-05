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
                    'form-input-holder',
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
                    'form-input-holder',
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
                    'form-input-holder',
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
                    'form-input-holder',
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
                    'form-input-holder',
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
        v-if="suppliers.length != 0"
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
                    @click="deleteSupplierModal(supplier.id)"
                    >delete</span
                  >
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination-container">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getSuppliers(pagination.first_link)"
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
                @click="getSuppliers(pagination.prev_link)"
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
                @click="getSuppliers(pagination.path_page + n)"
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
                @click="getSuppliers(pagination.next_link)"
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
                @click="getSuppliers(pagination.last_link)"
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

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteSupplierModal = (supplier_id) => {
      isActivePrompt.value = true;
      delete_id.value = supplier_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteSupplier(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteSupplier = (supplier_id) => {
      axios
        .delete("supplier/" + supplier_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getSuppliers();
        })
        .catch((error) => {
          console.log(error);
        });
    };

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
      clearSupplier();
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

    const getSuppliers = (page_url) => {
      // toast("Supplier Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "suppliers";

      suppliers.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            suppliers.push(response.data.data[i]);
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
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteSupplierModal,
      pagination,
      makePagination,
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