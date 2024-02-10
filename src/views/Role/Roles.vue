<template>
  <main id="roles-page">
    <h1>Roles</h1>

    <Transition :duration="550">
      <div class="modal-container" v-if="showRoleModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayRoleModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addRole()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Role</h1>
          </div>
          <div class="modal-body">
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Role Name</label>
                <input
                  type="text"
                  placeholder="Role Name"
                  v-model="role.name"
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
                <label> Permission Name</label>

                <select
                  v-model="role.permission_id"
                  :class="[
                    'form-input-holder',
                    errors.permission_id ? 'is-invalid' : '',
                  ]"
                >
                  <template
                    v-for="permission in permissions"
                    v-bind:key="permission.id"
                  >
                    <option selected :value="permission.id">
                      {{ permission.name }}
                    </option>
                  </template>
                </select>
                <div v-if="errors.permission_id" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.permission_id"
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
    <div class="role-header">
      <div class="link-button-container">
        <router-link to="/roles"> Users </router-link>

        <router-link to="/permissions"> Permissions </router-link>
      </div>
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchRole()">
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
      <div class="button-box" v-if="hasPermission('add_role')">
        <button class="btn-new-role" @click="addRoleBtn()">
          <span class="btn-name"> New Role</span>
          <span class="material-icons">add_circle</span>
        </button>
      </div>
    </div>
    <div class="roles-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="roles.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Permission Name</th>
              <template
                v-if="
                  hasPermission('show_role') ||
                  hasPermission('edit_role') ||
                  hasPermission('delete_role')
                "
              >
                <th>Actions</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="role in roles" v-bind:key="role.id">
              <tr v-if="roles != null">
                <td>{{ role.name }}</td>
                <td v-if="role.permissions[0]">
                  {{ role.permissions[0].name }}
                </td>
                <td v-else>Please attach permissions</td>
                <template
                  v-if="
                    hasPermission('show_role') ||
                    hasPermission('edit_role') ||
                    hasPermission('delete_role')
                  "
                >
                  <td>
                    <!-- <span
                      class="material-icons"
                      style="color: var(--primary); cursor: pointer"
                      >format_align_justify</span
                    > -->
                    <span
                      class="material-icons"
                      style="color: blueviolet; cursor: pointer"
                      v-if="hasPermission('show_role')"
                      @click="editRoleModal(role.id)"
                      >edit</span
                    >
                    <span
                      class="material-icons"
                      style="color: orangered; cursor: pointer"
                      v-if="hasPermission('show_role')"
                      @click="deleteRoleModal(role.id)"
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
    <div class="pagination-container" v-if="roles.length != 0">
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
import { computed, reactive, ref, inject, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSnipperStore } from "@/stores/snipper";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const roles = reactive([]);
    const errors = ref({});
    const showRoleModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const permissions = reactive([]);
    const role = reactive({});
    const modalHeader = ref(""); // Add or Edit Role
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
      getRoles();
      getPermissions();
    });

    //end of onMounted

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteRoleModal = (role_id) => {
      isActivePrompt.value = true;
      delete_id.value = role_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteRole(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteRole = (role_id) => {
      axios
        .delete("role/" + role_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getRoles();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const addRoleBtn = () => {
      clearRole();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayRoleModal();
      // router.push({ path: '/new-role' })
    };
    const editRoleModal = (role_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayRoleModal();
      getSingleRole(role_id);
    };
    const getSingleRole = (role_id) => {
      console.log(role_id);

      axios
        .get("role/" + role_id)
        .then((response) => {
          // console.log(response.data.role.name);
          role.id = response.data.role.id;
          role.name = response.data.role.name;
          role.permission_id = response.data.role.permissions[0].id;
          role.permission_id_old = response.data.role.permissions[0].id;

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
    const displayRoleModal = () => {
      clearRole();
      if (showRoleModal.value) {
        showRoleModal.value = false;
      } else {
        showRoleModal.value = true;
      }
    };
    const clearRole = () => {
      role.name = "";
      role.permission_id = "";
      errors.value = "";
    };
    const addRole = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formdata.append("id", role.id);
        formdata.append("name", role.name);
        formdata.append("permission_id", role.permission_id);
        formdata.append("permission_id_old", role.permission_id_old);

        axios
          .post("role/edit", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear role form
            clearRole();
            //get new data from api roles
            getRoles();
            //hide the role modal
            displayRoleModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", role.name);
        formdata.append("permission_id", role.permission_id);

        axios
          .post("role/add", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear role form
            clearRole();
            //get new data from api roles
            getRoles();
            //hide the role modal
            displayRoleModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      }
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
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getPermissions = () => {
      // toast("Permission Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      permissions.length = 0;
      axios
        .get("permissions")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            permissions.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          // console.log(error.response.data.message);

          toast(error.response.data.message, {
            showIcon: true,
            type: "danger",
            position: "top-right",
            transition: "zoom",
          });
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
      //we are looking for empty searchQuery value. If it is empty we will fetch roles without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getRoles();
      }
    });

    //end of watch
    const searchRole = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "roles/search/" + searchQuery.value;
        roles.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              roles.push(response.data.data[i]);
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
      role,
      toast,
      roles,
      addRoleBtn,
      getRoles,
      showRoleModal,
      displayRoleModal,
      addRole,
      editRoleModal,
      modalHeader,
      permissions,
      getPermissions,
      errors,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteRoleModal,
      pagination,
      makePagination,
      searchQuery,
      searchRole,
      hasPermission,
    };
  }, //end of setup
};
</script>
    
    <style scoped>
.form-input-holder-container {
  margin-bottom: 15px;
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.roles-content {
  /* background: white; */
}
button.btn-new-role {
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
select.rolePermissionHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
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
</style>