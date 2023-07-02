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


export const useSnipperStore = defineStore("snipper", () => {

    const permissions = reactive([]);
    const isLoadedPermissions= ref(false);
    const stores=reactive([]);//will hold store available to the user
    const hasStore=ref(false);//will get true if user has store //hit api to get if user has store or not

    async function getPermissions() {
        permissions.splice(0);  //clearing array

        await axios.get('permissions/check/')
            .then((response) => {
                //    console.log(response.data.permissions)
                let data = response.data
                if (data.permissions) {
                    for (let i = 0; i < data.permissions.length; i++) {
                        permissions.push(data.permissions[i])
                    }
                    isLoadedPermissions.value=true;//set data loaded success to true
                    console.log('call inside store  permissions')
                }
            })

    }
    async function getStores() {
        
        stores.splice(0);  //clearing array

        await axios.get('stores/check/')
            .then((response) => {
                let data = response.data
                if (data.stores) {
                    for (let i = 0; i < data.stores.length; i++) {
                        stores.push(data.stores[i])
                    }
                    hasStore.value=true;//set data loaded success to true
                    console.log('call inside store : stores')
                }
            })

    }
    

    return { permissions, getPermissions,stores, hasStore,getStores };
});
