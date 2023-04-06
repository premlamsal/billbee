<template>
    <main id="suppliers-page">
      <h1>Suppliers</h1>
      <div class="supplier-header">
        <button class="btn-new-supplier" @click="newSupplierBtn()">
         <span class="btn-name"> New Supplier</span>
        <span class="material-icons">add_circle</span>
  
        </button>
  
      </div>
      <div class="suppliers-content">
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
                <th>Supplier ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
  
              </tr>
            </thead>
            <tbody>
              <template v-for="supplier in suppliers" v-bind:key="supplier.id">
                <tr v-if="suppliers!=null">
                  <td>{{ supplier.custom_supplier_id }}</td>
                  <td>{{ supplier.name }}</td>
                  <td>{{ supplier.address }}</td>
                  <td>{{ supplier.phone }}</td>
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
      const suppliers = reactive([]);
      const axios = inject("$axios");
  
      //on mounted start
        onMounted(() => {
          getSuppliers();
  
        });
  
    //end of onMounted
  
      const newSupplierBtn=()=>{
        // router.push({ path: '/new-supplier' })
      }
  
      const getSuppliers=()=>{
        
  
        axios.get('suppliers')
        .then(response=>{
  
            for (let i = 0; i < response.data.data.length; i++) {
                  suppliers.push(response.data.data[i]);
                }
  
        })
        .catch(error=>{
          console.log(error);
        })
  
  
      }
  
  
  
  
  
    //here you can return data and methods
    return {
       suppliers, newSupplierBtn,
       getSuppliers
      };
  
  
  
  
  
    },//end of setup
  
   
    
  }
  </script>
  
  <style scoped>
  .supplier-header{
    display: flex;
    justify-content: right;
  }
  .suppliers-content{
    /* background: white; */
  }
  button.btn-new-supplier {
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