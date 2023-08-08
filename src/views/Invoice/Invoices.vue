<template>
  <main id="invoices-page">
    <h1>Invoices</h1>
    <div class="invoice-header">
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchInvoice()">
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
        <button class="btn-new-invoice" @click="newInvoiceBtn()">
          <span class="btn-name"> New Invoice</span>
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
        v-if="invoices.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="invoice in invoices" v-bind:key="invoice.id">
              <tr v-if="invoices != null">
                <td>{{ invoice.custom_invoice_id }}</td>
                <td>{{ invoice.invoice_date }}</td>
                <td>{{ invoice.customer_name }}</td>
                <td>Rs. {{ invoice.grand_total }}</td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    @click="showInvoice(invoice.custom_invoice_id)"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editInvoice(invoice.custom_invoice_id)"
                    >edit</span
                  >
                  <span
                    class="material-icons"
                    style="color: orangered; cursor: pointer"
                    @click="deleteInvoiceModal(invoice.id)"
                    >delete</span
                  >
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination-container" v-if="invoices.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getInvoices(pagination.first_link)"
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
                @click="getInvoices(pagination.prev_link)"
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
                @click="getInvoices(pagination.path_page + n)"
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
                @click="getInvoices(pagination.next_link)"
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
                @click="getInvoices(pagination.last_link)"
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

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const invoices = reactive([]);
    const axios = inject("$axios");

    //on mounted start
    onMounted(() => {
      getInvoices();
    });

    //end of onMounted

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteInvoiceModal = (invoice_id) => {
      isActivePrompt.value = true;
      delete_id.value = invoice_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteInvoice(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteInvoice = (invoice_id) => {
      axios
        .delete("invoice/" + invoice_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getInvoices();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const newInvoiceBtn = () => {
      router.push({ path: "/new-invoice" });
    };

    const editInvoice = (id) => {
      // router.push({ path: '/edit-invoice',query:'hello-from-query' })
      router.push({ path: `${id}/edit-invoice/` });
    };
    const getInvoices = (page_url) => {
      page_url = page_url || "invoices";
      invoices.length = 0;

      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            invoices.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const showInvoice = (id) => {
      // router.push({ path: '/edit-invoice',query:'hello-from-query' })
      router.push({ path: `${id}/show-invoice/` });
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
      //we are looking for empty searchQuery value. If it is empty we will fetch invoices without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getInvoices();
      }
    });

    //end of watch
    const searchInvoice = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "invoices/search/" + searchQuery.value;
        invoices.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              invoices.push(response.data.data[i]);
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
      invoices,
      newInvoiceBtn,
      getInvoices,
      editInvoice,
      showInvoice,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteInvoiceModal,
      pagination,
      makePagination,
      searchInvoice,
      searchQuery,
    };
  }, //end of setup
};
</script>

<style scoped>
.invoice-header {
  display: flex;
  justify-content: right;
}
.invoices-content {
  /* background: white; */
}
button.btn-new-invoice {
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