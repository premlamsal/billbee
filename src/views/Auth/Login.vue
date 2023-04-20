<template>
  <div class="login-page-container">
    <div class="form-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" v-model="user.email" />
      <input type="password" placeholder="Password" v-model="user.password" />
      <button @click="loginBtn()">Login</button>
      <router-link to="/register">I don't have an account</router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

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


          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user", response.data.data.user);

          router.push({ path: "/" });
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
body {
  background-color: #f2f2f2;
}
.form-container {
  background: linear-gradient(to bottom right, #ffffff, #e6e6e6);
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
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
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}
input[type="email"],
input[type="password"] {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  width: 100%;
}
input[type="submit"] {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  width: 100%;
}
a {
  display: block;
  margin-top: 20px;
  color: #4caf50;
  text-decoration: none;
}
</style>