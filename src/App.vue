<template>
  <div class="app">
    <Suspense>
      <!-- Sidebar -->
      <Sidebar
        v-if="storeAuth.authData.isAuthenticated && snippStore.hasStore"
      />
    </Suspense>
    <div class="router-view-container scrollable scroll">
      <template v-if="snippStore.isAPISeverUP">
        <div
          class="top-nav-container"
          v-if="storeAuth.authData.isAuthenticated"
        >
          <div class="top-nav-menu">
            <button
              style="display: flex; align-items: center; font-size: 18px"
              @click="showDropDown()"
              :class="isDropDown ? 'drop-down pressed' : 'drop-down'"
            >
              <div>
                <i class="fi fi-tr-circle-user"></i>
              </div>
              <div style="margin-left: 4px">
                {{ storeAuth.authData.user.name }}
              </div>
              <div>
                <span class="material-icons">arrow_drop_down</span>
              </div>
            </button>
            <div class="dropdown-content" v-if="isDropDown">
              <a href="#" @click="logoutBtn()"
                ><span class="material-icons">logout</span> Logout</a
              >
            </div>
          </div>
        </div>
      </template>
      <!-- Content -->
      <!-- <router-view /> -->
      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade">
          <div :key="route.path">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useSnipperStore } from "@/stores/snipper";

import { ref, onMounted, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
const storeAuth = useAuthStore();
const snippStore = useSnipperStore();

onMounted(async () => {
  //   await store.getPermissions();
  // await snippStore.checkIfAPIServerUp();
  // await snippStore.getStores();
  await snippStore.getPermissions();
  console.log("first app vue");
});

// console.log('store.permissions');

// Watch for changes in is_expanded

const isDropDown = ref(false);
const showDropDown = () => {
  console.log("buttonpressed");
  if (isDropDown.value) {
    isDropDown.value = false;
  } else {
    isDropDown.value = true;
  }
};

const router = useRouter();
const logoutBtn = () => {
  storeAuth.removeUser();
  snippStore.setStoreFalse();
  router.push({ path: "/login" });
  showDropDown();
};
import Sidebar from "./components/Sidebar.vue";
</script>

<style lang="scss">
:root {
  --primary: #17c671;
  // --primary: linear-gradient(45deg, #8bc34a, #cddc39);
  --danger: #f44336;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--light);
  font-family: "Fira Sans", sans-serif;
  font-weight: 100;
  font-style: normal;
  // zoom: 0.8; /* Adjust the zoom level as needed */
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.router-view-container {
  width: 100%;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
.top-nav-menu {
  display: flex;
  align-items: center;
  position: relative;
}
.top-nav-container {
  display: flex;
  justify-content: right;
  margin-right: 15px;
  margin-top: 15px;
}
.dropdown-content {
  position: absolute;
  top: 50px;
  right: 20px;
}
.dropdown-content a {
  background: #fff;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;
  align-content: center;
  border-bottom-right-radius: 13px;
}
.dropdown-content a:hover {
  background-color: #ddd;
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
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  // transition: all 0.2s cubic-bezier(1, 1, 1, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-90px);
}
.drop-down {
  padding: 10px;
  border-radius: 10px;
  display: flex;
}
.drop-down i {
  font-size: 30px;
}
.pressed {
  // background: var(--primary-alt);
  color: var(--primary-alt);
}
</style>