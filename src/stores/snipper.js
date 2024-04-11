import { ref, computed, reactive, inject } from "vue";
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
    const toast = inject("$toast");
    const isAPISeverUP = ref(true);
    const permissions = reactive([]);
    const isLoadedPermissions = ref(false);
    const stores = reactive([]);//will hold store available to the user

    const hasStore = ref(false);//will get true if user has store //hit api to get if user has store or not

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
                    isLoadedPermissions.value = true;//set data loaded success to true
                    console.log('call inside store  permissions')
                }
            })
            .catch((error) => {
                console.log('some error')
            })

    }
    async function checkPermission(permission_name) {
        if (permissions.includes(permission_name) || permissions.includes('all')) {
            return true;
        }
        return false;
    }
    async function checkIfAPIServerUp() {
        isAPISeverUP.value = false;
        await axios.get('check-server-status')
            .then((response) => {
                isAPISeverUP.value = true
                console.log('API UP AND WORKING from snipper')
                return true;
            })
            .catch((error) => {
                if (error.code === "ERR_NETWORK") {
                    isAPISeverUP.value = false;

                }
                console.log('API DOWN from snipper')
                return false;



            })
    }

    function setStoreFalse() {
        hasStore.value = false;
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
                    hasStore.value = true;//set data loaded success to true
                    console.log('call inside store : stores')
                }
            })
            .catch((error) => {
                if (error.code === "ERR_NETWORK") {
                    stores.length = 0;
                    hasStore.value = false;
                    toast("Your API server might be down or not responding!", {
                        showIcon: true,
                        type: "warning",
                        position: "top-center",
                        transition: "zoom",
                    });
                }

                // return "hello";

            })

    }


    return { permissions, getPermissions, checkPermission, stores, hasStore, getStores, isAPISeverUP, checkIfAPIServerUp, setStoreFalse };
});
