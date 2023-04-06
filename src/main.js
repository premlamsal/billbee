import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";



const app = createApp(App);


import "./assets/main.css";

//axios
import Axios from "axios";
//axios config
Axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Accept: "application/json",
};


const appUrl = import.meta.env.VITE_MY_APP_URL;

Axios.defaults.baseURL =appUrl;

// const instance = Axios.create({
//   baseURL: "https://jobmalai.test/api/v1/",
// });
//axios config
//end of axios

app.provide('$axios', Axios);  

app.use(createPinia());
app.use(router);
app.mount("#app");
