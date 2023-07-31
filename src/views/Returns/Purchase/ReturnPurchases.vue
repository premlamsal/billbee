<template>
  <main id="purchases-page">
    <h1>Return Purchases</h1>
    <div class="purchase-header">
      <button class="btn-new-return-purchase" @click="newReturnPurchaseBtn()">
        <span class="btn-name"> New Return Purchase</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="purchases-content">
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
              <th>Return Purchase ID</th>
              <th>Date</th>
              <th>Supplier Name</th>
              <th>Amount</th>
              <th>Actions</th>
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
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    @click="
                      showReturnPurchase(purchase.custom_return_purchase_id)
                    "
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="
                      editPurchaseReturn(purchase.custom_return_purchase_id)
                    "
                    >edit</span
                  >
                  <span
                    class="material-icons"
                    style="color: orangered; cursor: pointer"
                    @click="deleteReturnPurchaseModal(purchase.id)"
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
    const return_purchases = reactive([]);
    const axios = inject("$axios");

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
        .delete("return_purchase/" + return_purchase_id)
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
    const getReturnPurchases = () => {
      axios
        .get("return-purchases")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            return_purchases.push(response.data.data[i]);
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
    };
  }, //end of setup
};
</script>
    
    <style scoped>
.purchase-header {
  display: flex;
  justify-content: right;
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