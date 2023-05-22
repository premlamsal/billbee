<template>
  <div class="app">
    <!-- Sidebar -->
    <Sidebar v-if="storeAuth.authData.isAuthenticated"/>

    <div class="router-view-container">
      <div class="top-nav-container"  v-if="storeAuth.authData.isAuthenticated">
        <div class="top-nav-menu">
          <span class="text">Prem Lamsal</span>
          <button @click="showDropDown()">
            <span class="material-icons">arrow_drop_down</span>
          </button>
          <div class="dropdown-content" v-if="isDropDown">
            <a href="#" @click="logoutBtn()"
              ><span class="material-icons">logout</span> Logout</a
            >
          </div>
        </div>
      </div>
      <!-- Content -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const storeAuth = useAuthStore();

onMounted(() => {
//   await store.getPermissions();
});

// console.log('store.permissions');

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
  router.push({ path: "/login" });
  showDropDown();
};
import Sidebar from "./components/Sidebar.vue";
</script>

<style lang="scss">
:root {
  --primary: #4ade80;
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
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
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
  top: 25px;
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
</style>