<template>
  <main id="settings-page">
    <h1 class="icon-head-page">
      <i class="fi fi-tr-customize custom-flat-icons"></i> Store Profile
    </h1>
    <!-- <p>This is the Settings page</p> -->
    <div class="Settings-content">
      <!-- <div class="profile-settings">
                  <h2>Profile</h2>
              </div> -->

      <div class="store-settings">
        <div class="store-settings-inner-block">
          <div class="border-line-bottom"></div>
          <h2>Store Information</h2>

          <div class="inside-from1">
            <!-- <div class="big-logo-store-profile-box">
              <div class="big-logo-store-profile-holder">
                <img
                  v-bind:src="imagePreview"
                  class="product_logo_img biglogo"
                />
              </div>
            </div> -->

            <div class="inside-two-input-container">
              <div style="margin-top: 10px" class="inner-form-box">
                <label> Name</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.name ? 'is-invalid' : '',
                    ]"
                    v-model="store.name"
                  />
                </div>
              </div>
              <div v-if="errors.name" :class="['errorText']">
                <div
                  class="errorText-inner"
                  v-for="error in errors.name"
                  v-bind:key="error.id"
                >
                  <ul>
                    <li>{{ error }}</li>
                  </ul>
                </div>
              </div>
              <div style="margin-top: 10px" class="inner-form-box">
                <label> Email</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.email ? 'is-invalid' : '',
                    ]"
                    v-model="store.email"
                  />
                </div>
              </div>
              <div v-if="errors.email" :class="['errorText']">
                <div
                  class="errorText-inner"
                  v-for="error in errors.email"
                  v-bind:key="error.id"
                >
                  <ul>
                    <li>{{ error }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="inside-two-input-container">
              <div style="margin-top: 10px" class="inner-form-box">
                <label> Phone</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.phone ? 'is-invalid' : '',
                    ]"
                    v-model="store.phone"
                  />
                </div>
              </div>

              <div style="margin-top: 10px" class="inner-form-box">
                <label>Mobile</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.mobile ? 'is-invalid' : '',
                    ]"
                    v-model="store.mobile"
                  />
                </div>
              </div>
              <div style="margin-top: 10px" class="inner-form-box">
                <label> Profit %</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.profit_percentage ? 'is-invalid' : '',
                    ]"
                    v-model="store.profit_percentage"
                  />
                </div>
              </div>
            </div>
            <div v-if="errors.phone" :class="['errorText']">
              <div
                class="errorText-inner"
                v-for="error in errors.phone"
                v-bind:key="error.id"
              >
                <ul>
                  <li>{{ error }}</li>
                </ul>
              </div>
            </div>
            <div v-if="errors.mobile" :class="['errorText']">
              <div
                class="errorText-inner"
                v-for="error in errors.mobile"
                v-bind:key="error.id"
              >
                <ul>
                  <li>{{ error }}</li>
                </ul>
              </div>
            </div>
            <div v-if="errors.profit_percentage" :class="['errorText']">
              <div
                class="errorText-inner"
                v-for="error in errors.profit_percentage"
                v-bind:key="error.id"
              >
                <ul>
                  <li>{{ error }}</li>
                </ul>
              </div>
            </div>
            <div class="inside-two-input-container">
              <div style="margin-top: 10px" class="inner-form-box">
                <label>Website</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.url ? 'is-invalid' : '',
                    ]"
                    v-model="store.url"
                  />
                </div>
              </div>

              <div style="margin-top: 10px" class="inner-form-box">
                <label> Tax Number</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.tax_number ? 'is-invalid' : '',
                    ]"
                    v-model="store.tax_number"
                  />
                </div>
              </div>

              <div style="margin-top: 10px" class="inner-form-box">
                <label> Tax %</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.tax_percentage ? 'is-invalid' : '',
                    ]"
                    v-model="store.tax_percentage"
                  />
                </div>
              </div>
            </div>

            <div v-if="errors.url" :class="['errorText']">
              <div
                class="errorText-inner"
                v-for="error in errors.url"
                v-bind:key="error.id"
              >
                <ul>
                  <li>{{ error }}</li>
                </ul>
              </div>
            </div>
            <div v-if="errors.tax_number" :class="['errorText']">
              <div
                class="errorText-inner"
                v-for="error in errors.tax_number"
                v-bind:key="error.id"
              >
                <ul>
                  <li>{{ error }}</li>
                </ul>
              </div>
            </div>
            <div class="inside-two-input-container">
              <div style="margin-top: 10px" class="inner-form-box">
                <label> Address</label>
                <div class="form-input-holder-box">
                  <input
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.address ? 'is-invalid' : '',
                    ]"
                    v-model="store.address"
                  />
                </div>
              </div>
              <div style="margin-top: 10px" class="inner-form-box">
                <label> Detail</label>
                <div class="form-input-holder-box">
                  <textarea
                    type="text"
                    :class="[
                      'form-input-holder',
                      errors.detail ? 'is-invalid' : '',
                    ]"
                    spellcheck="false"
                    v-model="store.detail"
                  ></textarea>
                </div>
              </div>
            </div>
            <div v-if="errors.address" :class="['errorText']">
              <div
                class="errorText-inner"
                v-for="error in errors.address"
                v-bind:key="error.id"
              >
                <ul>
                  <li>{{ error }}</li>
                </ul>
              </div>
            </div>
            <div v-if="errors.tax_percentage" :class="['errorText']">
              <div
                class="errorText-inner"
                v-for="error in errors.tax_percentage"
                v-bind:key="error.id"
              >
                <ul>
                  <li>{{ error }}</li>
                </ul>
              </div>
            </div>
            <div v-if="errors.detail" :class="['errorText']">
              <div
                class="errorText-inner"
                v-for="error in errors.detail"
                v-bind:key="error.id"
              >
                <ul>
                  <li>{{ error }}</li>
                </ul>
              </div>
            </div>
            <div style="margin-top: 10px" class="inner-form-box-image">
              <label> Store Logo</label>

              <div class="store-image-display-box">
                <div class="image-upload-holder2">
                  <div>
                    <img v-bind:src="imagePreview" class="product_logo_img" />
                  </div>

                  <div>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      v-on:change="fileSelected"
                      :class="[
                        'form-input-holder2',
                        errors.image ? 'is-invalid' : '',
                      ]"
                    />
                    <div v-if="errors.image" :class="['errorText']">
                      <div
                        class="errorText-inner"
                        v-for="error in errors.image"
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
            </div>
          </div>
        </div>

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
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const axios = inject("$axios");
    const toast = inject("$toast");
    const stores = reactive([]);
    const errors = ref({});
    const image = ref("");
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
          store.detail = response.data.store.detail;
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
          } else {
            imagePreview.value =
              VITE_MY_APP_BACK_URL_HOME.value + store.store_logo;
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
      formdata.append("name", store.name);
      formdata.append("address", store.address);
      formdata.append("phone", store.phone);
      formdata.append("detail", store.detail);
      formdata.append("mobile", store.mobile);
      formdata.append("email", store.email);
      formdata.append("url", store.url);
      formdata.append("tax_number", store.tax_number);
      formdata.append("profit_percentage", store.profit_percentage);

      formdata.append("tax_percentage", store.tax_percentage);

      if (image.value) {
        console.log(image.value);
        formdata.append("image", image.value);
      }
      axios
        .post("update-store", formdata)
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
          if (error.response.status == 422) {
            errors.value = error.response.data.errors;
          }
        });
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
</style>