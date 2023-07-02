<template>
    <div class="store-page-container">
      <div class="store-form">
        <div class="form-container">
          <h2>Create Store</h2>
          <div class="input-container">
            <input type="text" placeholder="Store Name" v-model="store.name" />
            <input type="text" placeholder="Address" v-model="store.address" />
          </div>
          <div class="input-container">
            <input type="text" placeholder="Phone" v-model="store.phone" />
          <input type="text" placeholder="Mobile" v-model="store.mobile" />
          </div>
         
          <div class="input-container">
            <input type="email" placeholder="Email" v-model="store.email" />
          <input type="text" placeholder="URL" v-model="store.url" />
          </div>
        
          <div class="input-container">
            <input type="text" placeholder="Tax Number" v-model="store.tax_number" />
          <input type="text" placeholder="Tax Percentage" v-model="store.tax_percentage" />
          </div>

          <div class="input-container">
            <input type="text" placeholder="Profit Percentage" v-model="store.profit_percentage" />
          </div>
       
          <button @click="createStoreBtn()">Create Store</button>
        </div>
      </div>
      
    </div>
  </template>
    
    <script>
  import { computed, reactive, ref, inject, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  export default {
    setup() {
      const store = reactive({
        name:"",
        address:"",
        phone:"",
        mobile:"",
        email:"",
        url:"",
        tax_number:"",
        tax_percentage:"",
        profit_percentage:"",

      });
      const router = useRouter();
      const route = useRoute();
      const axios = inject("$axios");
      const toast = inject("$toast");
      const isCreateStoreSuccess= ref(false);
  
      //on mounted start
      onMounted(() => {
        //   router.push({ path: "/new-invoice" });
      });
      const createStoreBtn = () => {
        axios
          .post("create-store", store)
          .then((response) => {
            console.log(response.data);
  
            console.log(response.data.message);
  
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            router.push({ path: "/" });
            //push to create-store
            isCreateStoreSuccess.value=true;
          })
          .catch((error) => {
            console.log(error);
  
            if (error.response.status == 400) {
              toast(error.response.data.message, {
                showIcon: true,
                type: "danger",
                position: "top-center",
                transition: "zoom",
              });
            }
  
            //   router.push({ path: "/" });
          });
      };
  
      return { store, createStoreBtn,isCreateStoreSuccess};
    },
  };
  </script>
    
    <style scoped>
  body {
    background-color: #f2f2f2;
  }
  .form-container {
    background: linear-gradient(to bottom right, #ffffff, #e6e6e6);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    padding: 20px;
    margin: auto;
    margin-top: 100px;
    max-width: 800px;
    margin-bottom: 100px;
    /* width: 100%; */
    text-align: center;
    backdrop-filter: blur(10px);
    padding-top: 0px;
  }
  .form-container h2 {
    /* background-color: #4caf50; */
    color: #4caf50;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  input[type="email"],
  input[type="text"],
  input[type="password"] {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    width: 200px;
  }
  button {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    border: none;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    /* width: 100%; */
  }
  a {
    display: block;
    margin-top: 20px;
    color: #4caf50;
    text-decoration: none;
  }
  </style>