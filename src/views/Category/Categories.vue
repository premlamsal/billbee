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
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder="Category Name"
                  v-model="category.name"
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
                <label> Details</label>
                <textarea
                  type="text"
                  v-model="category.description"
                  :class="[
                    'form-input-holder',
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
          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="category-header mt20">
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchCategory()">
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
      <div class="button-box" v-if="hasPermission('add_category')">
        <button class="btn-new-category" @click="addCategoryBtn()">
          <span class="btn-name"> New Category</span>
          <span class="material-icons">add_circle</span>
        </button>
      </div>
    </div>
    <div class="categories-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="categories.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Name</th>
              <th>Description</th>
              <template
                v-if="
                  hasPermission('show_category') ||
                  hasPermission('edit_category') ||
                  hasPermission('delete_category')
                "
              >
                <th>Actions</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="category in categories" v-bind:key="category.id">
              <tr v-if="categories != null">
                <td>{{ category.custom_category_id }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <template
                  v-if="
                    hasPermission('show_category') ||
                    hasPermission('edit_category') ||
                    hasPermission('delete_category')
                  "
                >
                  <td>
                    <span
                      class="material-icons"
                      style="color: var(--primary); cursor: pointer"
                      v-if="hasPermission('show_category')"
                      >format_align_justify</span
                    >
                    <span
                      class="material-icons"
                      style="color: blueviolet; cursor: pointer"
                      @click="editCategoryModal(category.id)"
                      v-if="hasPermission('show_category')"
                      >edit</span
                    >
                    <span
                      class="material-icons"
                      style="color: orangered; cursor: pointer"
                      @click="deleteCategoryModal(category.id)"
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
    <div class="pagination-container" v-if="categories.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getCategories(pagination.first_link)"
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
                @click="getCategories(pagination.prev_link)"
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
                @click="getCategories(pagination.path_page + n)"
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
                @click="getCategories(pagination.next_link)"
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
                @click="getCategories(pagination.last_link)"
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
    const categories = reactive([]);
    const errors = ref({});

    const showCategoryModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const category = reactive({});
    const modalHeader = ref(""); // Add or Edit Category
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
      getCategories();
    });

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteCategoryModal = (category_id) => {
      isActivePrompt.value = true;
      delete_id.value = category_id;
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
        .delete("category/" + categories_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getCategories();
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

    const getCategories = (page_url) => {
      // toast("Category Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "categories";

      categories.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            categories.push(response.data.data[i]);
          }
          if (response.data.data.length != null) {
            makePagination(response.data.meta, response.data.links);
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
      //we are looking for empty searchQuery value. If it is empty we will fetch categories without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getCategories();
      }
    });

    //end of watch
    const searchCategory = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "categories/search/" + searchQuery.value;
        categories.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              categories.push(response.data.data[i]);
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
      pagination,
      makePagination,
      searchQuery,
      searchCategory,
      hasPermission,
    };
  }, //end of setup
};
</script>
    
    <style scoped>
.form-input-holder-container {
  margin-bottom: 15px;
}

.category-header {
  display: flex;
  justify-content: space-between;
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
</style>