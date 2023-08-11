<template>
  <div class="login-page-container">
    <div class="form-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        v-model="user.email"
        class="form-input-holder"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="user.password"
        class="form-input-holder"
      />
      <button @click="loginBtn()" class="mt20 btn-primary">Login</button>
      <router-link to="/register">I don't have an account</router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const store = useAuthStore();

export default {
  setup() {
    const user = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const route = useRoute();
    const axios = inject("$axios");
    const toast = inject("$toast");

    //on mounted start
    onMounted(() => {
      //   router.push({ path: "/new-invoice" });
    });
    const loginBtn = () => {
      console.log(user);
      axios
        .post("user-login", user)
        .then((response) => {
          // console.log(response.data);

          // response.data.token
          // response.data.user

          //calling store function to set user data

          store.setUser(response.data.data.user, response.data.data.token);

          // router.push({ path: "/" });

          if (response.data.data.store.length != 0) {
            // console.log('has store')
            // redirect to create user
            router.push({ path: "/" });
          } else {
            //redirect to home page
            console.log("no store found for this user");
            router.push({ path: "/create-store" });
          }

          toast(response.data.message, {
            showIcon: true,
            type: "success",
            position: "top-center",
            transition: "zoom",
          });
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

          //   router.push({ path: "/" });
        });
    };

    return { user, loginBtn };
  },
};
</script>

<style scoped>
.form-container {
  /* background: linear-gradient(to bottom right, #ffffff, #f4f3f3); */
  /* border-radius: 10px; */
  /* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); */
  padding: 20px;
  margin: auto;
  margin-top: 100px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  backdrop-filter: blur(10px);
  padding-top: 0px;
}
.form-container h2 {
  /* background-color: #4caf50; */
  color: var(--primary);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

a {
  display: block;
  margin-top: 20px;
  color: var(--primary);
  text-decoration: none;
}
</style>