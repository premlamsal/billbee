<template>
  <!-- customers -->
  <main id="customers-page">
    <h1 class="icon-head-page">
      <i class="fi fi-tr-review custom-flat-icons"></i>
      <span style="font-weight: 200"> Customers</span>
    </h1>
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
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Customer Name</label>
                <input
                  type="text"
                  placeholder="Customer Name"
                  :class="[
                    'form-input-holder',
                    errors.name ? 'is-invalid' : '',
                  ]"
                  v-model="customer.name"
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
                  placeholder="Customer Address"
                  v-model="customer.address"
                  :class="[
                    'form-input-holder',
                    errors.address ? 'is-invalid' : '',
                  ]"
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
                  placeholder="Customer Phone"
                  :class="[
                    'form-input-holder',
                    errors.phone ? 'is-invalid' : '',
                  ]"
                  v-model="customer.phone"
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
                  placeholder="Customer Opening Balance"
                  v-model="customer.opening_balance"
                  :class="[
                    'form-input-holder',
                    errors.opening_balance ? 'is-invalid' : '',
                  ]"
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
                  v-model="customer.details"
                  :class="[
                    'form-input-holder',
                    errors.details ? 'is-invalid' : '',
                  ]"
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
    <div class="customer-header mt20">
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchCustomer()">
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
      <div class="button-box" v-if="hasPermission('add_customer')">
        <button class="btn-new-customer" @click="addCustomerBtn()">
          <i class="fi fi-rr-plus"></i>
          <span class="btn-name"> New Customer</span>
        </button>
      </div>
    </div>
    <div class="customers-content">
      <div
        class="table-container"
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="customers.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th @click="sortBy('name')">Name</th>
              <th @click="sortBy('address')">Address</th>
              <th @click="sortBy('phone')">Phone</th>
              <template
                v-if="
                  hasPermission('show_customer') ||
                  hasPermission('edit_customer') ||
                  hasPermission('delete_customer')
                "
              >
                <th>Actions</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="customer in sortedCustomers"
              v-bind:key="customer.id"
            >
              <tr v-if="customers != null">
                <td>{{ customer.custom_customer_id }}</td>
                <td @click="showCustomer(customer.custom_customer_id)">
                  {{ customer.name }}
                </td>
                <td>{{ customer.address }}</td>
                <td>{{ customer.phone }}</td>
                <template
                  v-if="
                    hasPermission('show_customer') ||
                    hasPermission('edit_customer') ||
                    hasPermission('delete_customer')
                  "
                >
                  <td>
                    <div class="flat-action-button-container">
                      <div
                        class="flat-action-button-box show"
                        v-if="hasPermission('show_customer')"
                        @click="showCustomer(customer.custom_customer_id)"
                      >
                        <i class="fi fi-rr-tally-4"></i>
                      </div>
                      <div
                        class="flat-action-button-box edit"
                        v-if="hasPermission('edit_customer')"
                        @click="editCustomerModal(customer.id)"
                      >
                        <i class="fi fi-rr-edit"></i>
                      </div>
                      <div
                        class="flat-action-button-box delete"
                        v-if="hasPermission('delete_customer')"
                        @click="deleteCustomerModal(customer.id)"
                      >
                        <i class="fi fi-rr-trash"></i>
                      </div>
                    </div>
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
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

    <div class="pagination-container" v-if="customers.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getCustomers(pagination.first_link)"
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
                @click="getCustomers(pagination.prev_link)"
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
                @click="getCustomers(pagination.path_page + n)"
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
                @click="getCustomers(pagination.next_link)"
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
                @click="getCustomers(pagination.last_link)"
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
    const customers = reactive([]);
    const errors = ref({});

    const sortColumn = ref("");
    const sortOder = ref("");

    const showCustomerModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const customer = reactive({});
    const modalHeader = ref(""); // Add or Edit Customer

    const storeSnipp = useSnipperStore();

    // await storeSnipp.getPermissions();

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
      getCustomers();
    });

    //end of onMounted

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteCustomerModal = (customer_id) => {
      isActivePrompt.value = true;
      delete_id.value = customer_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteCustomer(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteCustomer = (customer_id) => {
      axios
        .delete("customer/" + customer_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getCustomers();
        })
        .catch((error) => {
          console.log(error);
        });
    };
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
    const getSingleCustomer = (customer_id) => {
      console.log(customer_id);

      axios
        .get("customer/" + customer_id)
        .then((response) => {
          // console.log(response.data.customer.name);
          customer.id = response.data.customer.id;
          customer.name = response.data.customer.name;
          customer.address = response.data.customer.address;
          customer.phone = response.data.customer.phone;
          customer.opening_balance = response.data.customer.opening_balance;
          customer.details = response.data.customer.details;

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
    const displayCustomerModal = () => {
      clearCustomer();
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
      errors.value = "";
    };
    const addCustomer = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

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
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      } else {
        console.log("oaky i will add boss");

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
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      }
    };

    const showCustomer = (custom_customer_id) => {
      router.push({ path: `${custom_customer_id}/show-customer/` });
    };

    const getCustomers = (page_url) => {
      // toast("Customer Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      page_url = page_url || "customers";
      customers.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            customers.push(response.data.data[i]);
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
      //we are looking for empty searchQuery value. If it is empty we will fetch customer without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getCustomers();
      }
    });

    //end of watch
    const searchCustomer = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "customers/search/" + searchQuery.value;
        customers.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              customers.push(response.data.data[i]);
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

    const sortBy = (column) => {
      if (column === sortColumn.value) {
        sortOder.value = sortOder.value === "asc" ? "desc" : "asc";
      } else {
        sortColumn.value = column;
        sortOder.value = "asc";
      }
    };
    const sortedCustomers = computed(() => {
      if (!sortColumn.value) {
        return customers;
      }
      const compare = (a, b) => {
        if (sortOder.value === "asc") {
          return a[sortColumn.value] > b[sortColumn.value] ? 1 : -1;
        } else {
          return a[sortColumn.value] < b[sortColumn.value] ? 1 : -1;
        }
      };
      return customers.sort(compare);
    });

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
      showCustomer,
      errors,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteCustomerModal,
      makePagination,
      pagination,
      pagination,
      searchQuery,
      searchCustomer,
      sortBy,
      sortedCustomers,
      hasPermission,
    };
  }, //end of setup
};
</script>
  
  <style scoped>
.form-input-holder-container {
  margin-bottom: 15px;
}

.customer-header {
  display: flex;
  justify-content: space-between;
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