<template>
  <main id="settings-page">
    <div class="main-top-container">
      <div>
        <h1 class="icon-head-page">
          <i class="fi fi-tr-customize custom-flat-icons"></i>
          <span style="font-weight: 200"> Settings</span>
        </h1>
      </div>
      <div class="mt10">
        <button class="button" @click="showHideViewBox()">
          <!-- <i class="fi fi-ts-store-alt custom-flat-icons"></i> -->
          <h2 class="icon-head-page">
            <span style="font-weight: 200"> My Profile</span>
          </h2>
        </button>
      </div>
    </div>
    <!-- <p>This is the Settings page</p> -->
    <div class="border-line-bottom"></div>
    <div class="Settings-content">
      <!-- <div class="profile-settings">
				<h2>Profile</h2>
			</div> -->

      <div class="store-settings">
        <h2>Store</h2>

        <div class="store-settings-inner-block">
          <div style="margin-top: 10px" class="inner-form-box">
            <label>Select Default Store</label>
            <div class="select-store-block mt10">
              <div class="select-wrapper">
                <select class="custom-select" v-model="selectedStore">
                  <option value="0" selected disabled>Select an option</option>
                  <template v-for="store in stores" v-bind:key="store.id">
                    <option :value="store.id">{{ store.name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="button-container mt10 mt10">
            <div>
              <router-link to="/create-store" class="button">
                <i class="fi fi-ts-store-alt custom-flat-icons"></i>
                <span class="text">Create New Store</span>
              </router-link>
            </div>
          </div>
          <div class="border-line-bottom"></div>
        </div>
        <transition>
          <div class="profile-viewbox" v-if="isProfileViewBoxActive">
            <div class="profile-container">
              <div class="profile-section">
                <div class="profile-picture">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 532 532"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <circle
                      cx="270.75986"
                      cy="260.93427"
                      r="86.34897"
                      fill="#ffb6b6"
                    />
                    <polygon
                      points="221.18982 360.05209 217.28876 320.6185 295.18982 306.05209 341.18982 418.05209 261.18982 510.05209 204.18982 398.05209 221.18982 360.05209"
                      fill="#ffb6b6"
                    />
                    <path
                      d="m216.0374,340.35736l17.03111,3.84802s-13.38821-42.45453-8.84396-46.50766c4.54427-4.05316,15.68007,2.33328,15.68007,2.33328l11.70201,13.1199,14.25394-14.51239s15.47495-19.2421,21.53397-24.6463-3.67319-25.46364-3.67319-25.46364c0,0,89.89185-24.23923,56.44299-67.83968,0,0-19.61093-34.18452-25.99734-23.04871-6.38641,11.1358-14.00162-6.55013-14.00162-6.55013l-23.25381,4.42198s-45.89429-27.06042-89.45331,30.82959c-43.55902,57.89003,28.57916,154.01572,28.57916,154.01572h-.00002Z"
                      fill="#2f2e41"
                    />
                    <path
                      d="m433.16003,472.95001c-47.19,38.26001-105.57001,59.04999-167.16003,59.04999-56.23999,0-109.81-17.33997-154.62-49.47998.08002-.84003.16003-1.66998.23004-2.5,1.19-13,2.25-25.64001,2.94995-36.12,2.71002-40.69,97.64001-67.81,97.64001-67.81,0,0,.42999.42999,1.29004,1.17999,5.23999,4.59998,26.50995,21.27997,63.81,25.94,33.25995,4.15997,44.20996-15.57001,47.51996-25.02002,1-2.88,1.30005-4.81,1.30005-4.81l97.63995,46.10999c6.37,9.10004,8.86005,28.70001,9.35004,50.73004.01996.90997.03998,1.81.04999,2.72998Z"
                      fill="#00bfa6"
                    />
                    <path
                      d="m454.09003,77.91003C403.85004,27.66998,337.05005,0,266,0S128.15002,27.66998,77.91003,77.91003C27.67004,128.15002,0,194.95001,0,266c0,64.85004,23.05005,126.16003,65.29004,174.57001,4.02997,4.63,8.23999,9.14001,12.62,13.52002,1.02997,1.02997,2.07001,2.06,3.12,3.06,2.79999,2.70996,5.65002,5.35999,8.54999,7.92999,1.76001,1.57001,3.54004,3.10999,5.34003,4.62,1.40997,1.19,2.82001,2.35999,4.25,3.51001.02997.02997.04999.04999.07996.07001,3.97003,3.19995,8.01001,6.27997,12.13,9.23999,44.81,32.14001,98.37999,49.47998,154.61998,49.47998,61.59003,0,119.97003-20.78998,167.16003-59.04999,3.84998-3.12,7.62-6.35999,11.32001-9.71002,3.26996-2.95996,6.46997-6.01001,9.60999-9.14996.98999-.98999,1.97998-1.98999,2.95001-3,2.70001-2.78003,5.32001-5.61005,7.88-8.48004,43.37-48.71997,67.07996-110.83997,67.07996-176.60999,0-71.04999-27.66998-137.84998-77.90997-188.08997Zm10.17999,362.20997c-2.5,2.84003-5.06,5.64001-7.67999,8.37-4.08002,4.25-8.28998,8.37-12.64001,12.34003-1.64996,1.52002-3.32001,3-5.01001,4.46997-1.91998,1.67004-3.85999,3.31-5.82996,4.92004-15.53003,12.75-32.54004,23.75-50.73004,32.70996-7.19,3.54999-14.56,6.78003-22.09998,9.67004-29.28998,11.23999-61.08002,17.39996-94.28003,17.39996-32.03998,0-62.75995-5.73999-91.19-16.23999-11.66998-4.29999-22.94995-9.40997-33.77997-15.26001-1.59003-.85999-3.16998-1.72998-4.73999-2.62-8.26001-4.67999-16.25-9.78998-23.91998-15.31-.25-.17999-.51001-.37-.76001-.54999-5.46002-3.94-10.77002-8.09003-15.90002-12.45001-1.88-1.59003-3.73999-3.20001-5.57001-4.84998-2.97998-2.65002-5.89996-5.38-8.75-8.18005-5.39996-5.28998-10.56-10.79999-15.48999-16.52997C26.09003,391.77002,2,331.65002,2,266,2,120.42999,120.43005,2,266,2s264,118.42999,264,264c0,66.66003-24.82996,127.62-65.72998,174.12Z"
                      fill="#3f3d56"
                    />
                  </svg>
                </div>
                <h1 style="font-weight: 200">
                  {{ storeAuth.authData.user.name }}
                </h1>
                <p style="color: var(--primary)">
                  {{ snippStore.checkPermission("all") ? "Admin" : "User" }}
                </p>

                <div class="profile-button-container mt10 mt10">
                  <div class="button-profile">
                    <button
                      class="btn-change-password"
                      @click="changePasswordBtn()"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="button-container-top">
              <span class="close-btn" @click="showHideViewBox()"
                ><i class="fi fi-rr-circle-xmark"></i>
              </span>
            </div>
          </div>
        </transition>
        <Transition :duration="550">
          <div class="modal-container" v-if="showPasswordModal">
            <div class="modal">
              <div class="modal-close-btn-container">
                <span class="material-icons" @click="displayPasswordModal()"
                  >cancel</span
                >
              </div>
              <div class="modal-tick-btn-container">
                <span
                  class="material-icons"
                  style="font-size: 50px; color: var(--primary)"
                  @click="changePassword()"
                  >check_box</span
                >
              </div>
              <div class="modal-header">
                <h1>Change Password</h1>
              </div>
              <div class="modal-body">
                <div class="inside-two-input-container">
                  <div class="form-input-holder-container">
                    <label>Current Passowd</label>
                    <input
                      type="password"
                      placeholder="Current Password"
                      :class="[
                        'form-input-holder',
                        userErrors.currentPassword ? 'is-invalid' : '',
                      ]"
                      v-model="user.currentPassword"
                    />
                    <div
                      v-if="userErrors.currentPassword"
                      :class="['errorText']"
                    >
                      <div
                        class="errorText-inner"
                        v-for="error in userErrors.currentPassword"
                        v-bind:key="error.id"
                      >
                        <ul>
                          <li>{{ error }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="inside-two-input-container">
                  <div class="form-input-holder-container">
                    <label>New Password</label>
                    <input
                      type="password"
                      placeholder="New Password"
                      :class="[
                        'form-input-holder',
                        userErrors.newPassword ? 'is-invalid' : '',
                      ]"
                      v-model="user.newPassword"
                    />
                    <div v-if="userErrors.newPassword" :class="['errorText']">
                      <div
                        class="errorText-inner"
                        v-for="error in userErrors.newPassword"
                        v-bind:key="error.id"
                      >
                        <ul>
                          <li>{{ error }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="inside-two-input-container">
                  <div class="form-input-holder-container">
                    <label> Confirm Passowrd</label>

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      :class="[
                        'form-input-holder',
                        userErrors.confirmPassword ? 'is-invalid' : '',
                      ]"
                      v-model="user.confirmPassword"
                    />
                    <div
                      v-if="userErrors.confirmPassword"
                      :class="['errorText']"
                    >
                      <div
                        class="errorText-inner"
                        v-for="error in userErrors.confirmPassword"
                        v-bind:key="error.id"
                      >
                        <ul>
                          <li>{{ error }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <h4>Please fill above details and submit form</h4>
              </div>
            </div>
          </div>
        </Transition>
        <div class="store-settings-btn-block mt10">
          <button class="btn-save-store" @click="updateStoreBtn()">
            Update
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import logoURL from "../../assets/alogo.png";
import { useAuthStore } from "@/stores/auth";
import { useSnipperStore } from "@/stores/snipper";
const storeAuth = useAuthStore();
const snippStore = useSnipperStore();

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const axios = inject("$axios");
    const toast = inject("$toast");
    const stores = reactive([]);
    const errors = ref({});
    const image = ref("");

    const userErrors = ref({});

    const modalHeader = ref(""); // Add or Edit Unit
    const showPasswordModal = ref(false);
    const isProfileViewBoxActive = ref(false);
    const store = reactive({
      name: "",
      address: "",
      phone: "",
      detail: "",
      mobile: "",
      email: "",
      url: "",
      tax_number: "",
      tax_percentage: "",
      profit_percentage: "",
      store_logo: "",
    });

    const user = reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    const selectedStore = ref(0); //0 will render default option of select i.e "Select an option" (only on mounted) and changed after default store is loaded from database
    const imagePreview = ref(""); //for displaying image while uploading

    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );
    //on mounted start
    onMounted(() => {
      getStores();
      getStoreData();
      //   router.push({ path: "/new-invoice" });
    });
    const getStores = () => {
      axios
        .get("user-stores")
        .then((response) => {
          // console.log(response.data.stores);
          // stores=response.data.stores;
          let data = response.data;
          const defaultStore = data.default_store;
          if (data.stores) {
            for (let i = 0; i < data.stores.length; i++) {
              stores.push(data.stores[i]);
            }
          }
          //will assign default store to select store to render UI
          selectedStore.value = parseInt(defaultStore);
          //   console.log(selectedStore.value)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const showHideViewBox = () => {
      if (isProfileViewBoxActive.value) {
        isProfileViewBoxActive.value = false;
      } else {
        isProfileViewBoxActive.value = true;
      }
    };

    const fileSelected = (e) => {
      image.value = e.target.files[0];

      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          imagePreview.value = reader.result;
        }.bind(),
        false
      );

      if (image.value) {
        if (/\.(jpe?g|png|gif)$/i.test(image.value.name)) {
          reader.readAsDataURL(image.value);
        }
      }
    };
    const getStoreData = () => {
      axios
        .get("user-store")
        .then((response) => {
          // console.log(response.data.store.name);

          store.name = response.data.store.name;
          store.address = response.data.store.address;
          store.phone = response.data.store.phone;
          store.detail = response.data.store.details;
          store.mobile = response.data.store.mobile;
          store.email = response.data.store.email;
          store.url = response.data.store.url;
          store.tax_number = response.data.store.tax_number;
          store.tax_percentage = response.data.store.tax_percentage;
          store.profit_percentage = response.data.store.profit_percentage;
          store.store_logo = response.data.store.store_logo;
          if (store.store_logo === null) {
            store.store_logo = logoURL;
            imagePreview.value = logoURL;
          }
          // console.log("store logo is " + store.store_logo);

          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-center",
            transition: "zoom",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const updateStoreBtn = () => {
      let formdata = new FormData();
      formdata.append("_METHOD", "POST");
      formdata.append("selected_store", selectedStore.value);

      axios
        .post("save-store", formdata)
        .then((response) => {
          console.log(response.data);

          console.log(response.data.message);
          getStoreData();
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-center",
            transition: "zoom",
          });
          //push to save-store
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
        });
    };

    const changePasswordBtn = () => {
      displayPasswordModal();
    };

    const displayPasswordModal = () => {
      if (showPasswordModal.value) {
        showPasswordModal.value = false;
      } else {
        showPasswordModal.value = true;
      }
    };
    const changePassword = () => {
      let formData = new FormData();

      formData.append("currentPassword", user.currentPassword);
      formData.append("newPassword", user.newPassword);
      formData.append("confirmPassword", user.confirmPassword);

      axios
        .post("user/changepassword", formData)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-center",
            transition: "zoom",
          });
          //clear unit form
          clearPassword();
          //hide the unit modal
          displayPasswordModal();

          logoutBtn(); //after password change calling logout function to remove all previous password hashes and datas
        })
        .catch((error) => {
          if (error.response.status == 422) {
            userErrors.value = error.response.data.errors;
          }
        });
    };

    const clearPassword = () => {
      user.currentPassword = "";
      user.newPassword = "";
      user.confirmPassword = "";
    };

    const logoutBtn = () => {
      storeAuth.removeUser();
      snippStore.setStoreFalse();
      router.push({ path: "/login" });
    };

    return {
      updateStoreBtn,
      getStores,
      stores,
      selectedStore,
      store,
      errors,
      imagePreview,
      fileSelected,
      image,
      showHideViewBox,
      isProfileViewBoxActive,
      storeAuth,
      showPasswordModal,
      modalHeader,
      user,
      userErrors,
      changePasswordBtn,
      displayPasswordModal,
      changePassword,
      snippStore,
    };
  },
};
</script>
<style scoped>
.border-line-bottom {
  border-bottom: 1px solid rgb(131, 127, 127);
  margin-top: 20px;
  margin-bottom: 20px;
}
.store-settings-inner-block {
  margin-top: 10px;
}
/* Style for the select wrapper */
.select-wrapper {
  position: relative;
  /* display: inline-block; */
}

/* Style for the custom select */
.custom-select {
  appearance: none;
  outline: none;
  background-color: #2b2e2c40;
  padding: 10px 40px 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  width: auto;
}
button.btn-save-store {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

/* Style for the arrow icon */
.custom-select::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-left: 2px solid #333;
  border-bottom: 2px solid #333;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
}

/* Style for the arrow icon on hover */
.custom-select:hover::after {
  transform: translateY(-50%) rotate(-45deg);
}

/* Style for the options */
.custom-select option {
  background-color: rgb(223, 215, 215);
  color: #333;
}
.mt10 {
  margin-top: 10px;
}
.mb10 {
  margin-bottom: 10px;
}
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
.form-input-holder-box {
  width: auto;
}
.inner-form-box {
  width: 100%;
  margin: 5px;
}
.image-upload-holder {
  display: flex;
}
img.product_logo_img {
  width: 60px;
  /* margin-top: 15px; */
}
.image-upload-icon-holder {
  width: 60px;
  color: var(--primary);
}
/* 
input[type="file"]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: var(--primary);
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

input[type="file"]::file-selector-button:hover {
  background: var(--primary);
} */

.inside-from1 {
  background: white;
  padding: 1em;
  margin-top: 10px;
  border-radius: 10px;
}
.button-container {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}
.button-container a {
  text-decoration: none;
  padding: 5px;
  /* margin: 10px; */
  color: var(--dark);
  display: flex;
  align-items: center;
}
.button-container a:hover {
  color: var(--primary);
}
.button-container span {
  margin: 8px;
}

.profile-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #fff;
  margin-bottom: 20px;
  /* background: url("https://via.placeholder.com/150") no-repeat center center; */
  background-size: cover;
  background: #607d8b;
}
.profile-container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.profile-viewbox {
  background: #1b1717b8;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
}
.profile-container h1 {
  color: white;
}
.profile-container p {
  color: white;
}
.button-container-top {
  position: absolute;
  top: 0;
  right: 0;
}
.button-profile button {
  color: white;
  background: var(--primary);
  padding: 10px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}
.button-profile button:hover {
  background: #1b1717b8;
}
.main-top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>