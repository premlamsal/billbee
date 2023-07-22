<template>
  <main id="suppliers-page">
    <h1>Returns Home</h1>
    <div class="return-card-container">
      <div class="return-cards-holder">
        <div class="return-card" @click="goToReturnInvoices()">
          <div class="return-invoice">
            <span class="material-icons">receipt_long</span>
            <h3>Return Invoices</h3>
            <p>Click Here to See Return Invoices</p>
          </div>
        </div>
        <div class="return-card" @click="goToReturnPurchases()">
          <span class="material-icons">description</span>
          <div class="return-purchase">
            <h3>Return Purchase</h3>
            <p>Click Here to See Return Purchase</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const goToReturnPurchases = () => {
      router.push({ path: "/return-purchases" });
    };
    const goToReturnInvoices = () => {
      router.push({ path: "/return-invoices" });
    };
    return { goToReturnPurchases, goToReturnInvoices };
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
  background: var(--danger);
  margin: 2em;
  border-radius: 10px;
  color: white;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-align: center;
  box-shadow: 1px 2px 8px -6px #000;
}
.return-card:hover {
  box-shadow: 2px 4px 12px -6px #000;
  transform: translateY(-5px);
}
.return-card span.material-icons {
  font-size: 5rem;
  color: var(--light);
  transition: 0.2s ease-out;
}
</style>