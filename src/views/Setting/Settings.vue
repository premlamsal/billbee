<template>
  <main id="settings-page">
    <h1 style="color: var(--primary)">Settings</h1>
    <!-- <p>This is the Settings page</p> -->
    <div class="border-line-bottom"></div>
    <div class="Settings-content">
      <!-- <div class="profile-settings">
				<h2>Profile</h2>
			</div> -->

      <div class="store-settings">
        <h2>Store</h2>

        <div class="store-settings-inner-block">
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
        <div class="store-settings-btn-block mt10">
          <button class="btn-save-store" @click="updateStoreBtn()">Update Store</button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const axios = inject("$axios");
    const toast = inject("$toast");
    const stores = reactive([]);
    const selectedStore = ref(0);//0 will render default option of select i.e "Select an option" (only on mounted) and changed after default store is loaded from database

    //on mounted start
    onMounted(() => {
      getStores();
      //   router.push({ path: "/new-invoice" });
    });
    const getStores = () => {
      axios
        .get("user-stores")
        .then((response) => {
          // console.log(response.data.stores);
          // stores=response.data.stores;
          let data = response.data;
		  const defaultStore=data.default_store;
          if (data.stores) {
            for (let i = 0; i < data.stores.length; i++) {
              stores.push(data.stores[i]);
            }
          }
		  //will assign default store to select store to render UI
		  selectedStore.value=parseInt(defaultStore)
		//   console.log(selectedStore.value)
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const updateStoreBtn = () => {
		let formdata= new FormData();
		formdata.append("_METHOD","POST");
		formdata.append("selected_store",selectedStore.value);

      axios
        .post("save-store", formdata)
        .then((response) => {
          console.log(response.data);

          console.log(response.data.message);

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
    return { updateStoreBtn, getStores, stores, selectedStore };
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
  display: inline-block;
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
</style>