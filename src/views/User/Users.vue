<template>
  <main id="users-page">
    <h1>Users</h1>
    
    <Prompt :isPrompt="pressedDelete" v-if="pressedDelete" @event-confirm="eventPrompt" @event-cancel="eventPrompt" />
   
    <Transition :duration="550">
      <div class="modal-container" v-if="showUserModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayUserModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addUser()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} User</h1>
          </div>
          <div class="modal-body">
            <div class="form-input-user">
              <label>User Name</label>
              <input
                type="text"
                placeholder="User Name"
                class="userNameHolder"
                v-model="user.name"
              />
            </div>
            <div class="form-input-user">
              <label>Email</label>
              <input
                type="email"
                placeholder="User Email"
                class="userEmailHolder"
                v-model="user.email"
              />
            </div>
            <div class="form-input-user">
              <label>Password</label>
              <input
                type="password"
                placeholder="User Password"
                class="userPasswordHolder"
                v-model="user.password"
              />
            </div>

            <div class="form-input-user">
              <label> Role</label>

              <select v-model="user.role_id" class="userRoleHolder">
                <template v-for="role in roles" v-bind:key="role.id">
                  <option selected :value="role.id">
                    {{ role.name }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="user-header">
      <div class="link-button-container">
        <router-link to="/roles"> Roles </router-link>

        <router-link to="/permissions"> Permissions </router-link>
      </div>

      <button class="btn-new-user" @click="addUserBtn()">
        <span class="btn-name"> New User</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="users-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>

              <th>Last Login</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="user in users" v-bind:key="user.id">
              <tr v-if="users != null">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td v-if="user.roles[0]">{{ user.roles[0].name }}</td>
                <td v-else>Please attach Role</td>
             


                <td>{{ user.last_login }}</td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editUserModal(user.id)"
                    >edit</span
                  >
                  <span
                    class="material-icons"
                    style="color: orangered; cursor: pointer"
                    @click="delBtn(user.id)"
                    >delete</span
                  >
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
	<script>
import { useCounterStore } from "@/stores/counter";

import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const users = reactive([]);
    const roles = reactive([]);


    const showUserModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const user = reactive({});
    const modalHeader = ref(""); // Add or Edit User

    // access the `store` variable anywhere in the component ✨
    const store = useCounterStore();

    //on mounted start
    onMounted(() => {
      getUsers();

      getRoles();

      console.log(store.count);
      store.increment();
      console.log(store.count);
    });
    
    //propmt start


    //for prompt
    const pressedDelete = ref(false);
    const deleteUserId=ref(""); 

    const eventPrompt = (returned_val) => {
      // console.log(returned_val);

      if(returned_val){
        // console.log('HELLO CONFIRM');
        axios.delete('user/' + deleteUserId.value)
        .then(response=>{

          toast(response.data.msg, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });

          getUsers();

        })
        .catch(error=>{
          console.log(error);
        })


      }else{
      console.log('HELLO CANCEL');
        //nothing to do when cancel button is pressed
      }

      delBtn();
    
    };

    const delBtn = (user_id) => {
      // console.log(user_id);
      
      //save user id to pass to prompt function
      deleteUserId.value=user_id;


      if (pressedDelete.value) {
        pressedDelete.value = false;
      } else {
        pressedDelete.value = true;
      }
    };
//prompt ends




    //end of onMounted

    const addUserBtn = () => {
      clearUser();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayUserModal();
      // router.push({ path: '/new-user' })
    };
    const editUserModal = (user_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayUserModal();
      getSingleUser(user_id);
    };
    const getSingleUser = (user_id) => {
      console.log(user_id);

      axios
        .get("user/" + user_id)
        .then((response) => {
          // console.log(response.data.user.name);
          user.id = response.data.user.id;
          user.name = response.data.user.name;
          user.email = response.data.user.email;
          user.password = response.data.user.password;
          user.role_id = response.data.user.roles[0].id;
          user.role_id_old = response.data.user.roles[0].id;

          toast(response.data.msg, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const displayUserModal = () => {
      if (showUserModal.value) {
        showUserModal.value = false;
      } else {
        showUserModal.value = true;
      }
    };

    const clearUser = () => {
      user.name = "";
      user.email = "";
      user.password = "";
      user.role_id = "";
    };
    const addUser = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formdata.append("id", user.id);
        formdata.append("name", user.name);
        formdata.append("email", user.email);
        formdata.append("password", user.password);
        formdata.append("role_id", user.role_id);
        formdata.append("role_id_old", user.role_id_old);

        axios
          .post("user/edit", formdata)
          .then((response) => {
            toast(response.data.msg, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear user form
            clearUser();
            //get new data from api users
            getUsers();
            //hide the user modal
            displayUserModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", user.name);
        formdata.append("email", user.email);
        formdata.append("password", user.password);
        formdata.append("role_id", user.role_id);

        axios
          .post("user/add", formdata)
          .then((response) => {
            toast(response.data.msg, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear user form
            clearUser();
            //get new data from api users
            getUsers();
            //hide the user modal
            displayUserModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const getUsers = () => {
      // toast("User Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      users.length = 0;
      axios
        .get("users")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            users.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getRoles = () => {
      // toast("Role Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      roles.length = 0;
      axios
        .get("roles")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            roles.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      user,
      toast,
      users,
      addUserBtn,
      getUsers,
      showUserModal,
      displayUserModal,
      addUser,
      editUserModal,
      modalHeader,
      getRoles,
      roles,
      pressedDelete,
      delBtn,
      eventPrompt,
      isModalUpdating
    };
  }, //end of setup
};
</script>
	
	<style scoped>
/* for modal */
.modal-container {
  background: #000000d6;
  padding: 0px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  min-height: 100%;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  /* padding: 15px; */
  position: relative;
}
.modal-header {
  background: var(--primary);

  padding: 20px;
  color: #fff;
}
.modal-body {
  padding: 20px;
}

.modal-footer {
  background: var(--grey);
  padding: 20px;
  color: #fff;
}
.modal-close-btn-container {
  position: absolute;
  right: -11px;
  color: white;
  top: -12px;
  font-size: 25px;
  cursor: pointer;
}

.modal-tick-btn-container {
  position: absolute;
  right: -30px;
  color: white;
  bottom: -5px;
  font-size: 25px;
  cursor: pointer;
}

input.userNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.userPhoneHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.userAddressHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.userEmailHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
input.userPasswordHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.userDetailsHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.userOpeningBalanceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
.form-input-user {
  margin-bottom: 15px;
}

.user-header {
  display: flex;
  justify-content: space-between;
}
.users-content {
  /* background: white; */
}
button.btn-new-user {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
table {
  background: #fff;
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  white-space: nowrap;
}

th,
td {
  text-align: left;
  padding: 16px;
}

th {
  background-color: var(--primary);
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

@media (max-width: 767px) {
  table {
    font-size: 14px;
  }
}

@media (max-width: 479px) {
  table {
    font-size: 12px;
  }
}

/* vue animation */
.v-enter-active,
.v-leave-active {
  /* transition: opacity 0.5s ease; */
  transition: all 0.5s ease-in-out;
  /* transition-delay: 0.25s; */
}

.v-enter-from {
  transform: translateY(-500px);
  opacity: 0.001;
}
.v-leave-to {
  transform: translateY(-500px);
  opacity: 0.001;
}
.link-button-container {
  /* margin: 10px; */
}
.link-button-container a {
  text-decoration: none;
  margin-right: 5px;
  background: var(--grey);
  color: white;
  padding: 4px;
  border-radius: 10px;
}
.link-button-container a:hover {
  background: var(--dark);
}

select.userRoleHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
</style>