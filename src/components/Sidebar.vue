<template>
  <aside :class="`${is_expanded ? 'is-expanded scroll' : 'scroll'}`">
    <div class="logo-box">
      <div class="logo">
        <img :src="logoURL" alt="Vue" />
      </div>
    </div>

    <div class="warp-box">
      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-icons">keyboard_double_arrow_right</span>
        </button>
      </div>
    </div>

    <!-- <h3>Menu</h3> -->
    <div class="menu">
      <router-link to="/" class="button">
        <i class="fi fi-tr-house-chimney custom-flat-icons"></i>
        <span class="text">Home</span>
      </router-link>
      <template v-if="hasPermission('view_account')">
        <router-link to="/accounts" class="button">
          <i class="fi fi-ts-bank custom-flat-icons"></i>
          <span class="text">Accounts</span>
        </router-link>
      </template>
      <template v-if="hasPermission('view_customer')">
        <router-link to="/customers" class="button">
          <i class="fi fi-tr-review custom-flat-icons"></i>
          <span class="text">Customers</span>
        </router-link>
      </template>

      <template v-if="hasPermission('view_invoice')">
        <router-link to="/invoices" class="button">
          <span class="fi fi-tr-file-invoice-dollar custom-flat-icons"></span>
          <span class="text">Invoices</span>
        </router-link>
      </template>
      <template v-if="hasPermission('view_product')">
        <router-link to="/products" class="button">
          <i class="fi fi-tr-box-open-full custom-flat-icons"></i>
          <span class="text">Products</span>
        </router-link>
      </template>
      <template v-if="hasPermission('view_purchase')">
        <router-link to="/purchases" class="button">
          <i class="fi fi-tr-cart-shopping-fast custom-flat-icons"></i>
          <span class="text">Purchases</span>
        </router-link>
      </template>
      <template
        v-if="
          hasPermission('view_return_invoice') ||
          hasPermission('view_return_invoice')
        "
      >
        <router-link to="/returns" class="button">
          <i class="fi fi-tr-house-return custom-flat-icons"></i>
          <span class="text">Returns</span>
        </router-link>
      </template>
      <template v-if="hasPermission('view_supplier')">
        <router-link to="/suppliers" class="button">
          <i class="fi fi-tr-supplier-alt custom-flat-icons"></i>
          <span class="text">Suppliers</span>
        </router-link>
      </template>
      <template v-if="hasPermission('view_stock')">
        <router-link to="/stocks" class="button">
          <i class="fi fi-tr-boxes custom-flat-icons"></i>
          <span class="text">Stocks</span>
        </router-link>
      </template>
      <template v-if="hasPermission('view_transaction')">
        <router-link to="/transactions" class="button">
          <i class="fi fi-ts-money-coin-transfer custom-flat-icons"></i>
          <span class="text">Transactions</span>
        </router-link>
      </template>
      <template v-if="hasPermission('view_user')">
        <router-link to="/users" class="button">
          <i class="fi fi-tr-admin-alt custom-flat-icons"></i>
          <span class="text">Users</span>
        </router-link>
      </template>
    </div>

    <div class="flex"></div>
    <template v-if="hasPermission('view_setting')">
      <div class="menu">
        <router-link to="/settings" class="button">
          <i class="fi fi-tr-customize custom-flat-icons"></i>
          <span class="text">Settings</span>
        </router-link>
        <router-link to="/storeprofile" class="button">
          <i class="fi fi-ts-store-alt custom-flat-icons"></i>
          <span class="text">Store Profile</span>
        </router-link>
      </div>
    </template>
  </aside>
</template>

<script setup>
import { reactive, ref } from "vue";
import logoURL from "../assets/logo.png";

import { useSnipperStore } from "@/stores/snipper";
const storeSnipp = useSnipperStore();

await storeSnipp.getPermissions();

const hasAccess = storeSnipp.permissions;

// console.log("hello from soft");

// console.log(hasAccess);

const hasPermission = (action) => {
  // if (hasAccess.includes(action) || hasAccess.includes("all")) {
  //   return true;
  // } else {
  //   return false;
  // }
  return hasAccess.includes(action) || hasAccess.includes("all") ? true : false;
};

// console.log(hasPermission("view_invoices"));

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px);
  overflow: hidden;
  /* min-height: 100vh; */
  padding: 1rem;
  transition: 0.8s ease-in-out;
  // position: fixed;
  overflow-y: scroll;
  height: 100vh;
}

aside .flex {
  flex: 1 1 0%;
}
aside .logo {
  margin-bottom: 1rem;
}

aside .logo img {
  width: 3rem;
}
aside .menu-toggle-wrap {
  margin-bottom: 1rem;
  position: relative;
  top: 0;
  transition: 0.8s ease-in-out;
}
aside .menu-toggle-wrap .menu-toggle {
  transition: 0.8s ease-in-out;
}
aside .menu-toggle-wrap .menu-toggle .material-icons {
  font-size: 2rem;
  color: var(--light);
  transition: 0.8s ease-out;
}
aside .menu-toggle-wrap .menu-toggle:hover .material-icons {
  color: var(--primary);
  transform: translateX(0.5rem);
}
aside h3,
aside .button .text {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
aside h3 {
  color: var(--grey);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}
aside .menu {
  margin: 0 -1rem;
}
aside .menu .button {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  padding: 1rem 1rem;
  border-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
aside .menu .button .material-icons {
  font-size: 2rem;
  color: var(--light);
  transition: 0.2s ease-in-out;
}
aside .menu .button .custom-flat-icons {
  // font-size: 1.9em;
  color: var(--light);
  transition: 0.2s ease-in-out;
}
aside .menu .button .text {
  color: var(--light);

  margin-left: 10px;
  transition: 0.2s ease-in-out;
}
aside .menu .button:hover {
  // background-color: var(--dark-alt);
}
aside .menu .button:hover .material-icons,
aside .menu .button:hover .text {
  color: var(--primary);
}

aside .menu .button:hover .custom-flat-icons,
aside .menu .button:hover .text {
  color: var(--primary);
}
aside .menu .button.router-link-exact-active {
  background-color: var(--primary);

  // border-right: 5px solid var(--primary);
}
aside .menu .button.router-link-exact-active .custom-flat-icons,
aside .menu .button.router-link-exact-active .text {
  color: white;
}
aside .menu .button.router-link-exact-active .custom-flat-icons,
aside .menu .button.router-link-exact-active .text {
  color: white;
}
aside .footer {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
aside .footer p {
  font-size: 0.875rem;
  color: var(--grey);
}
aside.is-expanded {
  width: var(--sidebar-width);
}
aside.is-expanded .menu-toggle-wrap {
  top: -3rem;
}
aside.is-expanded .menu-toggle-wrap .menu-toggle {
  transform: rotate(-180deg);
}
aside.is-expanded h3,
aside.is-expanded .button .text {
  opacity: 1;
}
aside.is-expanded .button .material-icons {
  margin-right: 1rem;
}
aside.is-expanded .footer {
  opacity: 0;
}
@media (max-width: 1024px) {
  aside {
    position: absolute;
    z-index: 99;
  }
}
.logo {
  display: flex;
  justify-content: center;
}
.warp-box {
  display: flex;
  justify-content: flex-end;
}
</style>