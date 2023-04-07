<template>
    <main id="customers-page">
      <h1>Customers</h1>
      <Transition :duration="550">
      <div class="modal-container" v-if="showCustomerModal">
        <div class="modal">
          <div class="modal-close-btn-container">
				<span class="material-icons" @click="displayCustomerModal()">cancel</span>
            
          </div>
          <div class="modal-tick-btn-container">

				<span class="material-icons" style="font-size:50px; color:var(--primary)" @click="">check_box</span>
          </div>
          <div class="modal-header">
            <h1>Add Customer</h1>

          </div>
          <div class="modal-body">

           <div class="form-input-customer">
            <label>Customer Name</label>
            <input type="text" placeholder="Customer Name" class="customerNameHolder"/>
           </div>
           <div class="form-input-customer">
            <label> Address</label>

            <input type="text" placeholder="Customer Address" class="customerAddressHolder"/>
           </div>
           <div class="form-input-customer">
            <label> Phone</label>

            <input type="text" placeholder="Customer Phone" class="customerPhoneHolder"/>
           </div>
           <div class="form-input-customer">
            <label> Details</label>
            <textarea type="text" class="customerDetailsHolder"></textarea>
           </div>

          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
      </Transition>
      <div class="customer-header">
        <button class="btn-new-customer" @click="displayCustomerModal()">
         <span class="btn-name"> New Customer</span>
        <span class="material-icons">add_circle</span>
  
        </button>
  
      </div>
      <div class="customers-content">
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
                <th>Customer ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
  
              </tr>
            </thead>
            <tbody>
              <template v-for="customer in customers" v-bind:key="customer.id">
                <tr v-if="customers!=null">
                  <td>{{ customer.custom_customer_id }}</td>
                  <td>{{ customer.name }}</td>
                  <td>{{ customer.address }}</td>
                  <td>{{ customer.phone }}</td>
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
      const customers = reactive([]);
      const showCustomerModal= ref(false);
      const axios = inject("$axios");
  
      //on mounted start
        onMounted(() => {
          getCustomers();
  
        });
  
    //end of onMounted
  
      const newCustomerBtn=()=>{
        // router.push({ path: '/new-customer' })

      


      }
      const displayCustomerModal=()=>{
        if(showCustomerModal.value){
          showCustomerModal.value=false;
        }else{
          showCustomerModal.value=true;
        }
      }
    
  
      const getCustomers=()=>{
        
  
        axios.get('customers')
        .then(response=>{
  
            for (let i = 0; i < response.data.data.length; i++) {
                  customers.push(response.data.data[i]);
                }
  
        })
        .catch(error=>{
          console.log(error);
        })
  
  
      }
  
  
  
  
  
    //here you can return data and methods
    return {
       customers, newCustomerBtn,
       getCustomers,showCustomerModal,displayCustomerModal
      };
  
  
  
  
  
    },//end of setup
  
   
    
  }
  </script>
  
  <style scoped>
   /* for modal */
   .modal-container {
    background: #000000d6;
    padding: 0px;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #fff;
    /* padding: 15px; */
  position: relative;
}
.modal-header {
  background: var(--primary);

    padding: 20px;
    color: #fff;

}
.modal-body {
    padding: 20px;
}

.modal-footer {
  background: var(--grey);
    padding: 20px;
  color: #fff;

}
.modal-close-btn-container {
  position: absolute;
    right: -11px;
    color: white;
    top: -12px;
    font-size: 25px;
    cursor: pointer;
}



.modal-tick-btn-container {
  position: absolute;
    right: -30px;
    color: white;
    bottom: -5px;
    font-size: 25px;
    cursor: pointer;
}

input.customerNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}


input.customerPhoneHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.customerAddressHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}


textarea.customerDetailsHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}
.form-input-customer{
  margin-bottom:15px ;
}

  .customer-header{
    display: flex;
    justify-content: right;
  }
  .customers-content{
    /* background: white; */
  }
  button.btn-new-customer {
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
  
  
/* vue animation */
.v-enter-active,
.v-leave-active {
  /* transition: opacity 0.5s ease; */
  transition: all 0.5s ease-in-out;
  /* transition-delay: 0.25s; */
}

.v-enter-from {
  transform: translateY(-500px);
  opacity: 0.001;
}
.v-leave-to {
  transform: translateY(-500px);
  opacity: 0.001;
}
  </style>