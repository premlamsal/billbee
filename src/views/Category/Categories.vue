<template>
  <main id="categories-page">
    <h1>Categories</h1>
    <Transition :duration="550">
      <div class="modal-container" v-if="showCategoryModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayCategoryModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addCategory()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Category</h1>
          </div>
          <div class="modal-body">
            <div class="form-input-holder-container">
              <label>Category Name</label>
              <input
                type="text"
                placeholder="Category Name"
                v-model="category.name"
                :class="['categoryNameHolder', errors.name ? 'is-invalid' : '']"
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
              <label> Details</label>
              <textarea
                type="text"
                v-model="category.description"
                :class="[
                  'categoryDetailsHolder',
                  errors.description ? 'is-invalid' : '',
                ]"
              ></textarea>
              <div v-if="errors.description" :class="['errorText']">
                <div
                  class="errorText-inner"
                  v-for="error in errors.description"
                  v-bind:key="error.id"
                >
                  <ul>
                    <li>{{ error }}</li>
                  </ul>
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
    <div class="category-header">
      <button class="btn-new-category" @click="addCategoryBtn()">
        <span class="btn-name"> New Category</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="categories-content">
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
              <th>Category ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="category in categories" v-bind:key="category.id">
              <tr v-if="categories != null">
                <td>{{ category.custom_category_id }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editCategoryModal(category.id)"
                    >edit</span
                  >
                  <span
                    class="material-icons"
                    style="color: orangered; cursor: pointer"
                    @click="deleteCategoryModal(category.id)"
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
  <prompt
    :is-prompt="isActivePrompt"
    @event-confirm="callbackPrompt"
    @event-cancel="callbackPromptCancel"
  ></prompt>
</template>
    <script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const categories = reactive([]);
    const errors = ref({});

    const showCategoryModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const category = reactive({});
    const modalHeader = ref(""); // Add or Edit Category

    //on mounted start
    onMounted(() => {
      getCategories();
    });

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteCategoryModal = (category_id) => {
      isActivePrompt.value = true;
      delete_id.value = categories_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteCategory(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteCategory = (categories_id) => {
      axios
        .delete("categories/" + categories_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getCategorys();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    //end of onMounted

    const addCategoryBtn = () => {
      clearCategory();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayCategoryModal();
      // router.push({ path: '/new-category' })
    };
    const editCategoryModal = (category_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      displayCategoryModal();
      getSingleCategory(category_id);
    };
    const getSingleCategory = (category_id) => {
      console.log(category_id);

      axios
        .get("category/" + category_id)
        .then((response) => {
          // console.log(response.data.category.name);
          category.id = response.data.category.id;
          category.name = response.data.category.name;
          category.description = response.data.category.description;

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
    const displayCategoryModal = () => {
      clearCategory();
      if (showCategoryModal.value) {
        showCategoryModal.value = false;
      } else {
        showCategoryModal.value = true;
      }
    };
    const clearCategory = () => {
      category.name = "";
      category.description = "";
      errors.value = "";
    };
    const addCategory = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formdata.append("id", category.id);
        formdata.append("name", category.name);
        formdata.append("description", category.description);
        axios
          .post("category/edit", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear category form
            clearCategory();
            //get new data from api categories
            getCategories();
            //hide the category modal
            displayCategoryModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", category.name);
        formdata.append("description", category.description);
        axios
          .post("category/add", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear category form
            clearCategory();
            //get new data from api categories
            getCategories();
            //hide the category modal
            displayCategoryModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      }
    };

    const getCategories = () => {
      // toast("Category Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      categories.length = 0;
      axios
        .get("categories")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            categories.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //here you can return data and methods
    return {
      category,
      toast,
      categories,
      addCategoryBtn,
      getCategories,
      showCategoryModal,
      displayCategoryModal,
      addCategory,
      editCategoryModal,
      modalHeader,
      errors,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteCategoryModal,
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

input.categoryNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.categoryPhoneHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.categoryAddressHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.categoryDetailsHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.categoryOpeningBalanceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
.form-input-holder-container {
  margin-bottom: 15px;
}

.category-header {
  display: flex;
  justify-content: right;
}
.categories-content {
  /* background: white; */
}
button.btn-new-category {
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
.form-input-holder-container {
  margin: 0px;
}
</style>