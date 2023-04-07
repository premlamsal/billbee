<template>
  <main id="invoices-page">
    <h1>Invoices</h1>
    <div class="invoice-header">
      <button class="btn-new-invoice" @click="newInvoiceBtn()">
        <span class="btn-name"> New Invoice</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="invoices-content">
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
    const invoices = reactive([]);
    const axios = inject("$axios");

    //on mounted start
    onMounted(() => {
      getInvoices();
    });

    //end of onMounted

    const newInvoiceBtn = () => {
      router.push({ path: "/new-invoice" });
    };

    const editInvoice = (id) => {
      // router.push({ path: '/edit-invoice',query:'hello-from-query' })
      router.push({ path: `${id}/edit-invoice/` });
    };
    const getInvoices = () => {
      axios
        .get("invoices")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            invoices.push(response.data.data[i]);
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

    //here you can return data and methods
    return {
      invoices,
      newInvoiceBtn,
      getInvoices,
      editInvoice,
      showInvoice
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