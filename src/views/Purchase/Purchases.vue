<template>
    <main id="purchases-page">
      <h1>Purchases</h1>
      <div class="purchase-header">
        <button class="btn-new-purchase" @click="newPurchaseBtn()">
         <span class="btn-name"> New Purchase</span>
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
                <th>Purchase ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Actions</th>
  
              </tr>
            </thead>
            <tbody>
              <template v-for="purchase in purchases" v-bind:key="purchase.id">
                <tr v-if="purchases!=null">
                  <td>{{ purchase.custom_purchase_id }}</td>
                  <td>{{ purchase.purchase_date }}</td>
                  <td>{{ purchase.customer_name }}</td>
                  <td>{{ purchase.grand_total }}</td>
                  <td><span class="material-icons" style="color:var(--primary);cursor: pointer;">format_align_justify</span> <span class="material-icons" style="color:blueviolet;cursor: pointer;">edit</span>  <span class="material-icons" style="color:orangered;cursor: pointer;">delete</span></td>
                </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>
  <script>
  import { computed, reactive, ref, inject ,onMounted} from "vue";
  import { useRouter, useRoute } from 'vue-router'
  
  export default{
  
    setup() {
      const router = useRouter()
      const route = useRoute()
      const purchases = reactive([]);
      const axios = inject("$axios");
  
      //on mounted start
        onMounted(() => {
          getPurchases();
  
        });
  
    //end of onMounted
  
      const newPurchaseBtn=()=>{
        router.push({ path: '/new-purchase' })
      }
  
      const getPurchases=()=>{
        
  
        axios.get('purchases')
        .then(response=>{
  
            for (let i = 0; i < response.data.data.length; i++) {
                  purchases.push(response.data.data[i]);
                }
  
        })
        .catch(error=>{
          console.log(error);
        })
  
  
      }
  
  
  
  
  
    //here you can return data and methods
    return {
       purchases, newPurchaseBtn,
       getPurchases
      };
  
  
  
  
  
    },//end of setup
  
   
    
  }
  </script>
  
  <style scoped>
  .purchase-header{
    display: flex;
    justify-content: right;
  }
  .purchases-content{
    /* background: white; */
  }
  button.btn-new-purchase {
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