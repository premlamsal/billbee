<template>
  <div class="register-page-container">
    <div class="register-form">
      <div class="form-container">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          v-model="user.name"
          class="form-input-holder"
        />

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
        <button @click="registerBtn()" class="mt20 btn-primary">
          Register
        </button>
        <router-link to="/login">I have an account</router-link>
      </div>
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
    const isRegisterSuccess = ref(false);

    //on mounted start
    onMounted(() => {
      //   router.push({ path: "/new-invoice" });
    });
    const registerBtn = () => {
      console.log(user);
      axios
        .post("user-register", user)
        .then((response) => {
          console.log(response.data);

          console.log(response.data.message);

          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-center",
            transition: "zoom",
          });
          router.push({ path: "/login" });
          //push to create-store
          isRegisterSuccess.value = true;
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

    return { user, registerBtn, isRegisterSuccess };
  },
};
</script>
  
  <style scoped>
.form-container {
  /* background: linear-gradient(to bottom right, #ffffff, #e6e6e6); */
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