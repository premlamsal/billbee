<template>
  <main id="permissions-page">
    <h1>Permissions</h1>
    <Prompt
      :isPrompt="pressedDelete"
      v-if="pressedDelete"
      @event-confirm="eventPrompt"
      @event-cancel="eventPrompt"
    />

    <Transition :duration="550">
      <div class="modal-container" v-if="showPermissionModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayPermissionModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addPermission()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Permission</h1>
          </div>
          <div class="modal-body">
            <div class="form-input-permission">
              <label>Permission Name</label>
              <input
                type="text"
                placeholder="Permission Name"
                class="permissionNameHolder"
                v-model="permission.name"
              />
            </div>
            <div class="permission-checkbox-container">
              <div>
                <span>View</span>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="view_customers"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="view_customers">
                    Customer
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="view_suppliers"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="view_suppliers">
                    Supplier
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="view_invoices"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="view_invoices">
                    Invoice
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="view_purchases"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="view_purchases">
                    Purchase
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="view_products"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="view_products">
                    Product
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="view_categories"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="view_categories">
                    Category
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="view_units"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="view_units">
                    Unit
                  </label>
                </div>
              </div>
              <div>
                <span>Add</span>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="add_customer"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="add_customer">
                    Customer
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="add_supplier"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="add_supplier">
                    Supplier
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="add_invoice"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="add_invoice">
                    Invoice
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="add_purchase"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="add_purchase">
                    Purchase
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="add_product"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="add_product">
                    Product
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="add_category"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="add_category">
                    Category
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="add_unit"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="add_unit"> Unit </label>
                </div>
              </div>
              <div class="col-md-2">
                <span>Edit</span>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="edit_customer"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="edit_customer">
                    Customer
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="edit_supplier"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="edit_supplier">
                    Supplier
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="edit_invoice"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="edit_invoice">
                    Invoice
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="edit_purchase"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="edit_purchase">
                    Purchase
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="edit_product"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="edit_product">
                    Product
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="edit_category"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="edit_category">
                    Category
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="edit_unit"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="edit_unit"> Unit </label>
                </div>
              </div>
              <div class="col-md-2">
                <span>Delete</span>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="delete_customer"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="delete_customer">
                    Customer
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="delete_supplier"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="delete_supplier">
                    Supplier
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="delete_invoice"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="delete_invoice">
                    Invoice
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="delete_purchase"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="delete_purchase">
                    Purchase
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="delete_product"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="delete_product">
                    Product
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="delete_category"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="delete_category">
                    Category
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="delete_unit"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="delete_unit">
                    Unit
                  </label>
                </div>
              </div>
              <div class="col-md-2">
                <span>Show</span>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="show_customer"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="show_customer">
                    Customer
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="show_supplier"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="show_supplier">
                    Supplier
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="show_invoice"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="show_invoice">
                    Invoice
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="show_purchase"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="show_purchase">
                    Purchase
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="show_product"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="show_product">
                    Product
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="show_category"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="show_category">
                    Category
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="show_unit"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="show_unit"> Unit </label>
                </div>
              </div>
              <div class="col-md-2">
                <span>Search</span>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="search_customer"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="search_customer">
                    Customer
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="search_supplier"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="search_supplier">
                    Supplier
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="search_invoice"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="search_invoice">
                    Invoice
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="search_purchase"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="search_purchase">
                    Purchase
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="search_product"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="search_product">
                    Product
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="search_category"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="search_category">
                    Category
                  </label>
                </div>
                <div class="form-group">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="search_unit"
                    v-model="checkedPermissions"
                  />
                  <label class="form-check-label" for="search_unit">
                    Unit
                  </label>
                </div>
              </div>
            </div>
            <!-- end of one row -->
            <div class="row">
              <div class="col-md-12">
                <div class="d-block">
                  <div class="form-group">
                    <label for="Name">Permission Actions</label>
                    {{ checkedPermissions }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="alert alert-success" role="alert">
                  You can allow permissions like: Show, Search and View for the
                  better experience. So, read full documentation before adding
                  permission to user.
                </div>
              </div>
              <div class="col-md-4">
                <div class="alert alert-success" role="alert">
                  Some "Add" and "Edit" permissions need "View" permision to be
                  given.
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
    <div class="permission-header">
      <div class="link-button-container">
        <router-link to="/users"> Users </router-link>

        <router-link to="/roles"> Roles </router-link>
      </div>
      <button
        class="btn-new-permission"
        @click="addPermissionBtn()"
        v-if="hasPermission('add_category')"
      >
        <span class="btn-name"> New Permission</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="permissions-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="permissions.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Permission Name</th>
              <th>Permission Actions</th>
              <template
                v-if="
                  hasPermission('show_permission') ||
                  hasPermission('edit_permission') ||
                  hasPermission('delete_permission')
                "
              >
                <th>Actions</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="permission in permissions"
              v-bind:key="permission.id"
            >
              <tr v-if="permissions != null">
                <td>{{ permission.name }}</td>
                <td>{{ permission.actions }}</td>
                <template
                  v-if="
                    hasPermission('show_permission') ||
                    hasPermission('edit_permission') ||
                    hasPermission('delete_permission')
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
                      @click="editPermissionModal(permission.id)"
                      v-if="hasPermission('show_category')"
                      >edit</span
                    >
                    <span
                      class="material-icons"
                      style="color: orangered; cursor: pointer"
                      @click="delBtn(permission.id)"
                      v-if="hasPermission('show_category')"
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
    <div class="pagination-container" v-if="permissions.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getPermissions(pagination.first_link)"
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
              <button
                @click="getPermissions(pagination.prev_link)"
                class="page-link"
              >
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
                @click="getPermissions(pagination.path_page + n)"
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
              <button
                @click="getPermissions(pagination.next_link)"
                class="page-link"
              >
                <span class="material-icons">chevron_right</span>

                Next
              </button>
            </li>
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.last_link }"
            >
              <button
                @click="getPermissions(pagination.last_link)"
                class="page-link"
              >
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
</template>
    <script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSnipperStore } from "@/stores/snipper";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const permissions = reactive([]);
    const checkedPermissions = ref([]);
    const showPermissionModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const permission = reactive({});
    const modalHeader = ref(""); // Add or Edit Permission
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
      getPermissions();
    });

    //end of onMounted

    //propmt start

    //for prompt
    const pressedDelete = ref(false);
    const deleteId = ref("");

    const eventPrompt = (returned_val) => {
      // console.log(returned_val);

      if (returned_val) {
        // console.log('HELLO CONFIRM');
        axios
          .delete("permission/" + deleteId.value)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-right",
              transition: "zoom",
            });

            getPermissions();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("HELLO CANCEL");
        //nothing to do when cancel button is pressed
      }

      delBtn();
    };

    const delBtn = (id) => {
      // console.log(id);

      //save user id to pass to prompt function
      deleteId.value = id;

      if (pressedDelete.value) {
        pressedDelete.value = false;
      } else {
        pressedDelete.value = true;
      }
    };
    //prompt ends
    const addPermissionBtn = () => {
      clearPermission();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayPermissionModal();
      // router.push({ path: '/new-permission' })
    };
    const editPermissionModal = (permission_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayPermissionModal();
      getSinglePermission(permission_id);
    };
    const getSinglePermission = (permission_id) => {
      // console.log(permission_id);

      axios
        .get("permission/" + permission_id)
        .then((response) => {
          // console.log(response.data.permission);
          permission.id = response.data.permission.id;
          permission.name = response.data.permission.name;
          checkedPermissions.value = response.data.permission.actions;

          // toast(response.data.message, {
          //       showIcon: true,
          //       type: response.data.status,
          //       position: "top-right",
          //       transition: "zoom",
          //     });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const displayPermissionModal = () => {
      if (showPermissionModal.value) {
        showPermissionModal.value = false;
      } else {
        showPermissionModal.value = true;
      }
    };
    const clearPermission = () => {
      permission.name = "";
      checkedPermissions.value = [];
    };
    const addPermission = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formdata.append("id", permission.id);
        formdata.append("name", permission.name);
        formdata.append("actions", checkedPermissions.value);

        axios
          .post("permission/edit", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear permission form
            clearPermission();
            //get new data from api permissions
            getPermissions();
            //hide the permission modal
            displayPermissionModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", permission.name);
        formdata.append("actions", checkedPermissions.value);

        axios
          .post("permission/add", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear permission form
            clearPermission();
            //get new data from api permissions
            getPermissions();
            //hide the permission modal
            displayPermissionModal();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const getPermissions = (page_url) => {
      // toast("Permission Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "permissions";

      permissions.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            permissions.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
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
    //here you can return data and methods
    return {
      permission,
      toast,
      permissions,
      addPermissionBtn,
      getPermissions,
      showPermissionModal,
      displayPermissionModal,
      addPermission,
      editPermissionModal,
      modalHeader,
      checkedPermissions,
      pressedDelete,
      delBtn,
      eventPrompt,
      pagination,
      makePagination,
      hasPermission,
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

input.permissionNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.permissionPhoneHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.permissionAddressHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.permissionDetailsHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.permissionOpeningBalanceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
.form-input-permission {
  margin-bottom: 15px;
}

.permission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.permissions-content {
  /* background: white; */
}
button.btn-new-permission {
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
.permission-checkbox-container {
  display: flex;
  justify-content: space-between;
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