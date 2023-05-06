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
            <div class="form-input-role">
              <label>Role Name</label>
              <input
                type="text"
                placeholder="Role Name"
                class="roleNameHolder"
                v-model="role.name"
              />
            </div>
            <div class="form-input-role">
              <label> Permission Name</label>

              <select v-model="role.permission_id" class="rolePermissionHolder">
                <template
                  v-for="permission in permissions"
                  v-bind:key="permission.id"
                >
                  <option selected :value="permission.id">
                    {{ permission.name }}
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
    <div class="role-header">
      <div class="link-button-container">
        <router-link to="/users">
        Users
        </router-link>

        <router-link to="/permissions">
        Permissions
        </router-link>
      </div>
      <button class="btn-new-role" @click="addRoleBtn()">
        <span class="btn-name"> New Role</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="roles-content">
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
              <th>Permission Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="role in roles" v-bind:key="role.id">
              <tr v-if="roles != null">
                <td>{{ role.name }}</td>
                <td>{{ role.permissions[0].name }}</td>
                <td>
                  <!-- <span
                      class="material-icons"
                      style="color: var(--primary); cursor: pointer"
                      >format_align_justify</span
                    > -->
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editRoleModal(role.id)"
                    >edit</span
                  >
                  <span
                    class="material-icons"
                    style="color: orangered; cursor: pointer"
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
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const roles = reactive([]);
    const showRoleModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const permissions = reactive([]);
    const role = reactive({});
    const modalHeader = ref(""); // Add or Edit Role

    //on mounted start
    onMounted(() => {
      getRoles();
      getPermissions();
    });

    //end of onMounted

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
    const displayRoleModal = () => {
      if (showRoleModal.value) {
        showRoleModal.value = false;
      } else {
        showRoleModal.value = true;
      }
    };
    const clearRole = () => {
      role.name = "";
      role.permission_id = "";
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
            toast(response.data.msg, {
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
            console.log(error);
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", role.name);
        formdata.append("permission_id", role.permission_id);

        axios
          .post("role/add", formdata)
          .then((response) => {
            toast(response.data.msg, {
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
            console.log(error);
          });
      }
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

input.roleNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.rolePhoneHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.roleAddressHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.roleDetailsHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.roleOpeningBalanceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
.form-input-role {
  margin-bottom: 15px;
}

.role-header {
  display: flex;
  justify-content: space-between;
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
.link-button-container a:hover{
  background: var(--dark);
}
</style>