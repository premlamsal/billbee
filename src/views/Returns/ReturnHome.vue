<template>
  <main id="suppliers-page">
    <h1>
      <span style="font-weight: 200"> Return Home</span>
    </h1>
    <div class="return-card-container">
      <div class="return-cards-holder">
        <div
          class="return-card"
          @click="goToReturnInvoices()"
          v-if="hasPermission('view_return_invoice')"
        >
          <div class="return-invoice">
            <span
              class="fi fi-tr-file-invoice-dollar custom-flat-icons flat-icon-larger"
            ></span>
            <h3 style="font-weight: 200">Return Invoices</h3>
            <p>Click Here to See Return Invoices</p>
          </div>
        </div>
        <div
          class="return-card"
          @click="goToReturnPurchases()"
          v-if="hasPermission('view_return_purchase')"
        >
          <i
            class="fi fi-tr-cart-shopping-fast custom-flat-icons flat-icon-larger"
          ></i>
          <div class="return-purchase">
            <h3 style="font-weight: 200">Return Purchases</h3>
            <p>Click Here to See Return Purchase</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
import { useSnipperStore } from "@/stores/snipper";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const storeSnipp = useSnipperStore();
    const hasAccess = storeSnipp.permissions;
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

    const goToReturnPurchases = () => {
      router.push({ path: "/return-purchases" });
    };
    const goToReturnInvoices = () => {
      router.push({ path: "/return-invoices" });
    };
    return { goToReturnPurchases, goToReturnInvoices, hasPermission };
  },
};
</script>

<style scoped>
.return-cards-holder {
  display: flex;
  justify-content: center;
}
.return-card {
  padding: 3em;
  background: var(--dark);
  margin: 2em;
  border-radius: 10px;
  color: white;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-align: center;
  box-shadow: 1px 2px 8px -6px #000;
}
.return-card:hover {
  box-shadow: 2px 4px 12px -6px #000;
  transform: translateY(-9px);
  background: var(--primary);
}
.return-card span.material-icons {
  font-size: 5rem;
  color: var(--light);
  transition: 0.2s ease-out;
}
</style>