<template>
  <main id="purchases-page">
    <h1 class="icon-head-page">
      <i class="fi fi-tr-cart-shopping-fast custom-flat-icons"></i>
      <span style="font-weight: 200"> Return Purchases</span>
    </h1>
    <div class="purchase-header mt20">
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchReturnPurchase()">
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
      <div class="button-box" v-if="hasPermission('add_return_purchase')">
        <button class="btn-new-return-purchase" @click="newReturnPurchaseBtn()">
          <span class="btn-name"> New Return Purchase</span>
          <i class="fi fi-rr-plus"></i>
        </button>
      </div>
    </div>
    <div class="purchases-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="return_purchases.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Return Purchase ID</th>
              <th>Date</th>
              <th>Supplier Name</th>
              <th>Amount</th>
              <template
                v-if="
                  hasPermission('show_return_purchase') ||
                  hasPermission('edit_return_purchase') ||
                  hasPermission('delete_return_purchase')
                "
              >
                <th>Actions</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="purchase in return_purchases"
              v-bind:key="purchase.id"
            >
              <tr v-if="return_purchases != null">
                <td>{{ purchase.custom_return_purchase_id }}</td>
                <td>{{ purchase.return_purchase_date }}</td>
                <td>{{ purchase.supplier_name }}</td>
                <td>Rs. {{ purchase.grand_total }}</td>
                <template
                  v-if="
                    hasPermission('show_return_purchase') ||
                    hasPermission('edit_return_purchase') ||
                    hasPermission('delete_return_purchase')
                  "
                >
                  <td>
                    <div class="flat-action-button-container">
                      <div
                        class="flat-action-button-box show"
                        v-if="hasPermission('show_return_purchase')"
                        @click="
                          showReturnPurchase(purchase.custom_return_purchase_id)
                        "
                      >
                        <i class="fi fi-rr-tally-4"></i>
                      </div>
                      <div
                        class="flat-action-button-box edit"
                        v-if="hasPermission('edit_return_purchase')"
                        @click="
                          editPurchaseReturn(purchase.custom_return_purchase_id)
                        "
                      >
                        <i class="fi fi-rr-edit"></i>
                      </div>
                      <div
                        class="flat-action-button-box delete"
                        v-if="hasPermission('delete_return_purchase')"
                        @click="deleteReturnPurchaseModal(purchase.id)"
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
    <div class="pagination-container" v-if="return_purchases.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getReturnPurchases(pagination.first_link)"
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
                @click="getReturnPurchases(pagination.prev_link)"
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
                @click="getReturnPurchases(pagination.path_page + n)"
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
                @click="getReturnPurchases(pagination.next_link)"
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
                @click="getReturnPurchases(pagination.last_link)"
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
    const return_purchases = reactive([]);
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
      getReturnPurchases();
    });

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteReturnPurchaseModal = (return_purchase_id) => {
      isActivePrompt.value = true;
      delete_id.value = return_purchase_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteReturnPurchase(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteReturnPurchase = (return_purchase_id) => {
      axios
        .delete("return-purchase/" + return_purchase_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getReturnPurchases();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //end of onMounted

    const newReturnPurchaseBtn = () => {
      router.push({ path: "/new-return-purchase" });
    };

    const editPurchaseReturn = (id) => {
      // router.push({ path: '/edit-purchase',query:'hello-from-query' })
      router.push({ path: `${id}/edit-return-purchase/` });
    };
    const getReturnPurchases = (page_url) => {
      page_url = page_url || "return-purchases";
      return_purchases.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            return_purchases.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const showReturnPurchase = (id) => {
      // router.push({ path: '/edit-purchase',query:'hello-from-query' })
      router.push({ path: `${id}/show-return-purchase/` });
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
      //we are looking for empty searchQuery value. If it is empty we will fetch return purchase without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getReturnPurchases();
      }
    });

    //end of watch
    const searchReturnPurchase = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "return-purchases/search/" + searchQuery.value;
        return_purchases.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              return_purchases.push(response.data.data[i]);
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
      return_purchases,
      newReturnPurchaseBtn,
      getReturnPurchases,
      editPurchaseReturn,
      showReturnPurchase,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteReturnPurchaseModal,
      pagination,
      makePagination,
      searchQuery,
      searchReturnPurchase,
      hasPermission,
    };
  }, //end of setup
};
</script>
    
    <style scoped>
.purchase-header {
  display: flex;
  justify-content: space-between;
}
.purchases-content {
  /* background: white; */
}
button.btn-new-return-purchase {
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