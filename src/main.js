import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// import the library
import {createToast} from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'

import * as ConfirmDialog from 'vuejs-confirm-dialog'

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

Axios.defaults.baseURL = appUrl;

// const instance = Axios.create({
//   baseURL: "https://jobmalai.test/api/v1/",
// });
//axios config
//end of axios

app.provide('$axios', Axios);

app.provide('$toast', createToast);

app.use(createPinia());
app.use(router);

app.use(ConfirmDialog);

import Prompt from './components/Prompt.vue'

app.component('Prompt', Prompt)

app.mount("#app");
