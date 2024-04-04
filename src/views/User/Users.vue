<template>
  <main id="users-page">
    <h1 class="icon-head-page">
      <i class="fi fi-tr-admin-alt custom-flat-icons"></i> Users
    </h1>

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
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="User Name"
                  v-model="user.name"
                  :class="[
                    'form-input-holder',
                    errors.name ? 'is-invalid' : '',
                  ]"
                />
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
              </div>
              <div class="form-input-holder-container">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="User Email"
                  v-model="user.email"
                  :class="[
                    'form-input-holder',
                    errors.email ? 'is-invalid' : '',
                  ]"
                />
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
            </div>
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="User Password"
                  v-model="user.password"
                  :class="[
                    'form-input-holder',
                    errors.password ? 'is-invalid' : '',
                  ]"
                />
                <div v-if="errors.password" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.password"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="form-input-holder-container">
                <label> Role</label>

                <select
                  v-model="user.role_id"
                  :class="[
                    'form-input-holder',
                    errors.role_id ? 'is-invalid' : '',
                  ]"
                >
                  <template v-for="role in roles" v-bind:key="role.id">
                    <option selected :value="role.id">
                      {{ role.name }}
                    </option>
                  </template>
                </select>
                <div v-if="errors.role_id" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.role_id"
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
    <div class="user-header">
      <div class="link-button-container">
        <router-link to="/roles"> Roles </router-link>

        <router-link to="/permissions"> Permissions </router-link>
      </div>
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchUser()">
            <span class="material-icons">search</span>
          </div>
          <input
            type="text"
            class="searchInputTable"
            placeholder="Search.."
            v-model="searchQuery"
          />
        </div>
      </div>
      <div class="button-box" v-if="hasPermission('add_user')">
        <button class="btn-new-user" @click="addUserBtn()">
          <span class="btn-name"> New User</span>
          <span class="material-icons">add_circle</span>
        </button>
      </div>
    </div>
    <div class="users-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="users.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>

              <th>Last Login</th>

              <template
                v-if="
                  hasPermission('show_user') ||
                  hasPermission('edit_user') ||
                  hasPermission('delete_user')
                "
              >
                <th>Actions</th>
              </template>
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
                <template
                  v-if="
                    hasPermission('show_user') ||
                    hasPermission('edit_user') ||
                    hasPermission('delete_user')
                  "
                >
                  <td>
                    <span
                      class="material-icons"
                      style="color: var(--primary); cursor: pointer"
                      v-if="hasPermission('show_user')"
                      >format_align_justify</span
                    >
                    <span
                      class="material-icons"
                      style="color: blueviolet; cursor: pointer"
                      v-if="hasPermission('show_user')"
                      @click="editUserModal(user.id)"
                      >edit</span
                    >
                    <span
                      class="material-icons"
                      style="color: orangered; cursor: pointer"
                      v-if="hasPermission('show_user')"
                      @click="deleteUserModal(user.id)"
                      >delete</span
                    >
                  </td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination-container" v-if="users.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getRoles(pagination.first_link)"
                class="page-link"
              >
                <span class="material-icons">first_page</span>
                First
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.prev_link }"
              v-if="pagination.prev_link"
            >
              <button @click="getRoles(pagination.prev_link)" class="page-link">
                <span class="material-icons">chevron_left</span>

                Prev
              </button>
            </li>
            <li
              v-for="n in pagination.last_page"
              v-bind:key="n"
              class="page-item"
              v-bind:class="{ active: pagination.current_page == n }"
            >
              <button
                @click="getRoles(pagination.path_page + n)"
                class="page-link"
              >
                {{ n }}
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.next_link }"
              v-if="pagination.next_link"
            >
              <button @click="getRoles(pagination.next_link)" class="page-link">
                <span class="material-icons">chevron_right</span>

                Next
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.last_link }"
            >
              <button @click="getRoles(pagination.last_link)" class="page-link">
                <span class="material-icons">last_page</span>

                Last
              </button>
            </li>
          </ul>
        </div>
        <div class="pagination-footer">
          Page: {{ pagination.current_page }}-{{ pagination.last_page }} Total
          Records: {{ pagination.total_pages }}
        </div>
      </div>
    </div>
  </main>
  <prompt
    :is-prompt="isActivePrompt"
    @event-confirm="callbackPrompt"
    @event-cancel="callbackPromptCancel"
  ></prompt>
</template>
	<script>
import { useCounterStore } from "@/stores/counter";

import { computed, reactive, ref, inject, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSnipperStore } from "@/stores/snipper";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const users = reactive([]);
    const roles = reactive([]);
    const errors = ref({});

    const showUserModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const user = reactive({});
    const modalHeader = ref(""); // Add or Edit User

    // access the `store` variable anywhere in the component ✨
    const store = useCounterStore();
    const storeSnipp = useSnipperStore();
    const hasAccess = storeSnipp.permissions;

    // console.log("hello from soft");

    // console.log(hasAccess);

    const hasPermission = (action) => {
      // if (hasAccess.includes(action) || hasAccess.includes("all")) {
      //   return true;
      // } else {
      //   return false;
      // }
      return hasAccess.includes(action) || hasAccess.includes("all")
        ? true
        : false;
    };
    //on mounted start
    onMounted(() => {
      getUsers();

      getRoles();

      // console.log(store.count);
      store.increment();
      // console.log(store.count);

      updateTitle();
    });

    const pageTitle = ref("Users" + " | " + import.meta.env.VITE_MY_APP_NAME);

    const updateTitle = () => {
      document.title = pageTitle.value;
    };
    //propmt start

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteUserModal = (user_id) => {
      isActivePrompt.value = true;
      delete_id.value = user_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteUser(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteUser = (user_id) => {
      axios
        .delete("user/" + user_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //end of onMounted

    const addUserBtn = () => {
      clearUser();
      errors.value = "";
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayUserModal();
      // router.push({ path: '/new-user' })
    };
    const editUserModal = (user_id) => {
      isModalUpdating.value = true;
      errors.value = "";
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

          toast(response.data.message, {
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
      clearUser();
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
            toast(response.data.message, {
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
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
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
            toast(response.data.message, {
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
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
            // errors.name = "hello error name";
            console.log(errors);
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
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getRoles = (page_url) => {
      // toast("Role Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "roles";

      roles.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            roles.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const pagination = ref({});

    const makePagination = (meta, links) => {
      let pagination_temp = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        from_page: meta.from,
        to_page: meta.to,
        total_pages: meta.total,
        path_page: meta.path + "?page=",
        first_link: links.first,
        last_link: links.last,
        prev_link: links.prev,
        next_link: links.next,
      };
      pagination.value = pagination_temp;
    };

    const searchQuery = ref("");

    //watching seach query
    watch(searchQuery, (newX) => {
      //newX is new value of searchQuery
      //we are looking for empty searchQuery value. If it is empty we will fetch users without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getUsers();
      }
    });

    //end of watch
    const searchUser = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "users/search/" + searchQuery.value;
        users.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              users.push(response.data.data[i]);
            }
            if (response.data.data.length != null) {
              makePagination(response.data.meta, response.data.links);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        //end of api call
      } else {
        //no search query
        console.log("i cannot seach with empy query");
      }
    };
    //here you can return data and methods
    return {
      user,
      toast,
      users,
      errors,
      addUserBtn,
      getUsers,
      showUserModal,
      displayUserModal,
      addUser,
      editUserModal,
      modalHeader,
      getRoles,
      roles,
      isModalUpdating,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteUserModal,
      pagination,
      makePagination,
      searchUser,
      searchQuery,
      hasPermission,
    };
  }, //end of setup
};
</script>
	
	<style scoped>
.form-input-holder-container {
  margin-bottom: 15px;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.errorText {
  transition: all 2s ease-in-out;
  margin-top: 10px;
  color: rgb(220, 19, 19);
  font-size: 13px;
  margin-left: 16px;
}
input.is-invalid,
select.is-invalid {
  border: 1px solid red;
  transition: all 2s ease-in-out;
}
</style>