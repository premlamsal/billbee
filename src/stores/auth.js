import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

//axios
import axios from "axios";
//axios config
axios.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
};


const appUrl = import.meta.env.VITE_MY_APP_URL;

axios.defaults.baseURL = appUrl;


export const useAuthStore = defineStore("auth", () => {

    let authData = reactive({
        token: "",
        user: "",
        isAuthenticated: false,
    });

    authData.token = localStorage.getItem("token") || "";

    authData.isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

    // console.log(authData.isAuthenticated)


    // const isAuthenticated = computed(() => authData.isAuthenticated)
    // console.log(isAuthenticated)

    function setUser(temp_user, temp_token) {
        authData.user = temp_user;
        authData.token = temp_token
        // console.log(user);
        authData.isAuthenticated = true;
        localStorage.setItem("user", authData.user);
        localStorage.setItem("token", authData.token);
        localStorage.setItem("isAuthenticated", true);


    }
    function removeUser() {
        authData.token = "";
        authData.user = "",
            authData.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");


    }



    return { setUser, authData, removeUser};
});
