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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1001</td>
              <td>2022-03-15</td>
              <td>John Doe</td>
              <td>$100.00</td>
            </tr>
            <tr>
              <td>1002</td>
              <td>2022-03-16</td>
              <td>Jane Doe</td>
              <td>$150.00</td>
            </tr>
            <tr>
              <td>1003</td>
              <td>2022-03-17</td>
              <td>Mike Smith</td>
              <td>$200.00</td>
            </tr>
            <tr>
              <td>1004</td>
              <td>2022-03-18</td>
              <td>Sarah Johnson</td>
              <td>$50.00</td>
            </tr>
            <tr>
              <td>1005</td>
              <td>2022-03-19</td>
              <td>Tom Brown</td>
              <td>$75.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
export default{
  data(){
    return{

    };
  },
  methods:{
    newInvoiceBtn(){
      this.$router.push({ path: '/new-invoice' })
    }
  },
}
</script>

<style scoped>
.invoice-header{
  display: flex;
  justify-content: right;
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