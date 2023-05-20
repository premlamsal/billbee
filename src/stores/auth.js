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

    const token=localStorage.getItem("token") || "";
    const user = reactive({});
    const isAuthenticated= ref(false);


    function setUser(temp_user,temp_token) {
        user=temp_user;
        token=temp_token
        // console.log(user);
        isAuthenticated.value=true;

        localStorage.setItem("token", user);
        localStorage.setItem("user", token);

    }
    function removeUser(){
        token="";
        user={},
        isAuthenticated.value=false;
    }

    

    return { setUser,token,user,isAuthenticated,removeUser };
});
