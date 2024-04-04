<template>
  <main id="invoices-page">
    <h1 class="icon-head-page">Return Invoices</h1>
    <div class="invoice-header mt20">
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchReturnInvoice()">
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
      <div class="button-box" v-if="hasPermission('add_return_invoice')">
        <button class="btn-new-return-invoice" @click="newReturnInvoiceBtn()">
          <span class="btn-name"> New Return Invoice</span>
          <span class="material-icons">add_circle</span>
        </button>
      </div>
    </div>
    <div class="invoices-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="return_invoices.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Return Invoice ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <template
                v-if="
                  hasPermission('show_return_invoice') ||
                  hasPermission('edit_return_invoice') ||
                  hasPermission('delete_return_invoice')
                "
              >
                <th>Actions</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="invoice in return_invoices"
              v-bind:key="invoice.id"
            >
              <tr v-if="return_invoices != null">
                <td>{{ invoice.custom_return_invoice_id }}</td>
                <td>{{ invoice.return_invoice_date }}</td>
                <td>{{ invoice.customer_name }}</td>
                <td>Rs. {{ invoice.grand_total }}</td>
                <template
                  v-if="
                    hasPermission('show_return_invoice') ||
                    hasPermission('edit_return_invoice') ||
                    hasPermission('delete_return_invoice')
                  "
                >
                  <td>
                    <span
                      class="material-icons"
                      style="color: var(--primary); cursor: pointer"
                      v-if="hasPermission('show_return_invoice')"
                      @click="
                        showReturnInvoice(invoice.custom_return_invoice_id)
                      "
                      >format_align_justify</span
                    >
                    <span
                      class="material-icons"
                      style="color: blueviolet; cursor: pointer"
                      v-if="hasPermission('edit_return_invoice')"
                      @click="
                        editInvoiceReturn(invoice.custom_return_invoice_id)
                      "
                      >edit</span
                    >
                    <span
                      class="material-icons"
                      v-if="hasPermission('delete_return_invoice')"
                      style="color: orangered; cursor: pointer"
                      @click="deleteReturnInvoiceModal(invoice.id)"
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
    <div class="pagination-container" v-if="return_invoices.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getReturnInvoices(pagination.first_link)"
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
                @click="getReturnInvoices(pagination.prev_link)"
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
                @click="getReturnInvoices(pagination.path_page + n)"
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
                @click="getReturnInvoices(pagination.next_link)"
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
                @click="getReturnInvoices(pagination.last_link)"
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
    const return_invoices = reactive([]);
    const axios = inject("$axios");
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
      getReturnInvoices();
    });

    //end of onMounted

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteReturnInvoiceModal = (return_invoice_id) => {
      isActivePrompt.value = true;
      delete_id.value = return_invoice_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteReturnInvoice(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteReturnInvoice = (return_invoice_id) => {
      axios
        .delete("return-invoice/" + return_invoice_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getReturnInvoices();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const newReturnInvoiceBtn = () => {
      router.push({ path: "/new-return-invoice" });
    };

    const editInvoiceReturn = (id) => {
      // router.push({ path: '/edit-invoice',query:'hello-from-query' })
      router.push({ path: `${id}/edit-return-invoice/` });
    };
    const getReturnInvoices = (page_url) => {
      page_url = page_url || "return-invoices";
      return_invoices.length = 0;

      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            return_invoices.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const showReturnInvoice = (id) => {
      // router.push({ path: '/edit-invoice',query:'hello-from-query' })
      router.push({ path: `${id}/show-return-invoice/` });
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
      //we are looking for empty searchQuery value. If it is empty we will fetch return invoices without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getReturnInvoices();
      }
    });

    //end of watch
    const searchReturnInvoice = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "return-invoices/search/" + searchQuery.value;
        return_invoices.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              return_invoices.push(response.data.data[i]);
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
      return_invoices,
      newReturnInvoiceBtn,
      getReturnInvoices,
      editInvoiceReturn,
      showReturnInvoice,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteReturnInvoiceModal,
      pagination,
      makePagination,
      searchQuery,
      searchReturnInvoice,
      hasPermission,
    };
  }, //end of setup
};
</script>
  
  <style scoped>
.invoice-header {
  display: flex;
  justify-content: space-between;
}
.invoices-content {
  /* background: white; */
}
button.btn-new-return-invoice {
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
</style>