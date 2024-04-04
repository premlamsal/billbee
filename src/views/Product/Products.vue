<template>
  <main id="products-page">
    <h1 class="icon-head-page">
      <i class="fi fi-tr-box-open-full custom-flat-icons"></i> Products
    </h1>

    <Transition :duration="550">
      <div class="modal-container" v-if="showProductModal">
        <div class="modal">
          <div class="modal-close-btn-container">
            <span class="material-icons" @click="displayProductModal()"
              >cancel</span
            >
          </div>
          <div class="modal-tick-btn-container">
            <span
              class="material-icons"
              style="font-size: 50px; color: var(--primary)"
              @click="addProduct()"
              >check_box</span
            >
          </div>
          <div class="modal-header">
            <h1>{{ modalHeader }} Product</h1>
          </div>
          <div class="modal-body">
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Product Category</label>
                <select
                  v-model="product.product_cat_id"
                  :class="[
                    'form-input-holder',
                    errors.product_cat_id ? 'is-invalid' : '',
                  ]"
                >
                  <template
                    v-for="category in categories"
                    v-bind:key="category.id"
                  >
                    <option selected :value="category.id">
                      {{ category.name }}
                    </option>
                  </template>
                </select>
                <div v-if="errors.product_cat_id" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.product_cat_id"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-input-holder-container">
                <label>Name</label>

                <input
                  type="text"
                  placeholder="Product Name"
                  :class="[
                    'form-input-holder',
                    errors.name ? 'is-invalid' : '',
                  ]"
                  v-model="product.name"
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
            </div>
            <div class="inside-two-input-container">
              <div class="form-input-holder-container">
                <label>Unit</label>

                <select
                  v-model="product.unit_id"
                  :class="[
                    'form-input-holder',
                    errors.unit_id ? 'is-invalid' : '',
                  ]"
                >
                  <template v-for="unit in units" v-bind:key="unit.id">
                    <option selected :value="unit.id">
                      {{ unit.short_name }}
                    </option>
                  </template>
                </select>
                <div v-if="errors.unit_id" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.unit_id"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-input-holder-container">
                <label> Opening Stock</label>

                <input
                  type="text"
                  placeholder="Product Opening Stock"
                  :class="[
                    'form-input-holder',
                    errors.opening_stock ? 'is-invalid' : '',
                  ]"
                  v-model="product.opening_stock"
                />
                <div v-if="errors.opening_stock" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.opening_stock"
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
                <label> Cost Price</label>

                <input
                  type="text"
                  placeholder="Product Cost Price"
                  v-model="product.cp"
                  :class="['form-input-holder', errors.cp ? 'is-invalid' : '']"
                />
                <div v-if="errors.cp" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.cp"
                    v-bind:key="error.id"
                  >
                    <ul>
                      <li>{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="form-input-holder-container">
                <label> Selling Price</label>

                <input
                  type="text"
                  placeholder="Product Selling Price"
                  v-model="product.sp"
                  :class="['form-input-holder', errors.sp ? 'is-invalid' : '']"
                />
                <div v-if="errors.sp" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.sp"
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
                <label> Description</label>
                <textarea
                  type="text"
                  :class="[
                    'form-input-holder',
                    errors.description ? 'is-invalid' : '',
                  ]"
                  v-model="product.description"
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
            <div class="inside-two-input-container">
              <div class="form-input-holder-container image-upload-holder">
                <label for="file-input">
                  <div class="image-upload-icon-holder">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 2v3m0 3V5m0 0h3m-3 0h-3"
                      />
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M13 2H5a3 3 0 0 0-3 3v10.5c0 .086.011.17.032.25A1 1 0 0 0 2 16v3a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-7a1 1 0 0 0-.032-.25A1 1 0 0 0 22 11.5V11h-2v.016c-4.297.139-7.4 1.174-9.58 2.623.826.293 1.75.71 2.656 1.256 1.399.84 2.821 2.02 3.778 3.583a1 1 0 1 1-1.706 1.044c-.736-1.203-1.878-2.178-3.102-2.913-1.222-.734-2.465-1.192-3.327-1.392a15.466 15.466 0 0 0-3.703-.386h-.022c-.348.005-.68.02-.994.045V5a1 1 0 0 1 1-1h8V2zM8.5 6a2.68 2.68 0 0 0-1.522.488C6.408 6.898 6 7.574 6 8.5c0 .926.408 1.601.978 2.011A2.674 2.674 0 0 0 8.5 11c.41 0 1.003-.115 1.522-.489.57-.41.978-1.085.978-2.011 0-.926-.408-1.601-.978-2.012A2.674 2.674 0 0 0 8.5 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </label>
                <img v-bind:src="imagePreview" class="product_logo_img" />
                <input
                  id="file-input"
                  type="file"
                  v-on:change="fileSelected"
                  :class="[
                    'form-input-holder',
                    errors.image ? 'is-invalid' : '',
                  ]"
                />
                <div v-if="errors.image" :class="['errorText']">
                  <div
                    class="errorText-inner"
                    v-for="error in errors.image"
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
    <div class="product-header mt20">
      <div class="link-button-container">
        <router-link to="/categories"> Categories </router-link>
        <router-link to="/units"> Units </router-link>
      </div>
      <div class="search-container">
        <div class="search-box">
          <div class="search-box-icon" @click="searchProduct()">
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
      <div class="button-box" v-if="hasPermission('add_product')">
        <button class="btn-new-product" @click="addProductBtn()">
          <span class="btn-name"> New Product</span>
          <span class="material-icons">add_circle</span>
        </button>
      </div>
    </div>
    <div class="products-content">
      <div
        style="
          overflow-x: auto;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: black 0px 1px 8px -5px;
        "
        v-if="products.length != 0"
      >
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Price</th>
              <template
                v-if="
                  hasPermission('show_product') ||
                  hasPermission('edit_product') ||
                  hasPermission('delete_product')
                "
              >
                <th>Actions</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="product in products" v-bind:key="product.id">
              <tr v-if="products != null">
                <td>{{ product.custom_product_id }}</td>
                <td>
                  <div class="invoiceItemProductName">
                    <div v-if="product.image">
                      <div v-if="isValidHttpUrl(product.image)">
                        <img
                          style="border-radius: 50%"
                          :src="product.image"
                          width="40"
                          height="40"
                          :alt="product.name"
                        />
                      </div>
                      <div v-else>
                        <img
                          style="border-radius: 50%"
                          :src="VITE_MY_APP_BACK_URL_HOME + product.image"
                          width="40"
                          height="40"
                          :alt="product.name"
                        />
                      </div>
                    </div>

                    <div style="margin-left: 10%">
                      {{ product.name }}
                    </div>
                  </div>
                </td>
                <td>{{ product.category.name }}</td>
                <td>{{ product.unit.short_name }}</td>
                <td>{{ product.sp }}</td>
                <template
                  v-if="
                    hasPermission('show_product') ||
                    hasPermission('edit_product') ||
                    hasPermission('delete_product')
                  "
                >
                  <td>
                    <span
                      class="material-icons"
                      style="color: var(--primary); cursor: pointer"
                      @click="showProduct(product.custom_product_id)"
                      v-if="hasPermission('show_product')"
                      >format_align_justify</span
                    >
                    <span
                      class="material-icons"
                      style="color: blueviolet; cursor: pointer"
                      @click="editProductModal(product.custom_product_id)"
                      v-if="hasPermission('show_product')"
                      >edit</span
                    >
                    <span
                      class="material-icons"
                      style="color: orangered; cursor: pointer"
                      v-if="hasPermission('show_product')"
                      @click="deleteProductModal(product.id)"
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
    <div class="pagination-container" v-if="products.length != 0">
      <div class="pagination-box">
        <div class="pagination-holder">
          <ul class="pagination">
            <li
              class="page-item"
              v-bind:class="{ disabled: !pagination.first_link }"
            >
              <button
                @click="getProducts(pagination.first_link)"
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
                @click="getProducts(pagination.prev_link)"
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
                @click="getProducts(pagination.path_page + n)"
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
                @click="getProducts(pagination.next_link)"
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
                @click="getProducts(pagination.last_link)"
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
    const products = reactive([]);
    const errors = ref({});

    const showProductModal = ref(false);
    const axios = inject("$axios");
    const toast = inject("$toast");
    const isModalUpdating = ref(false);
    const product = reactive({});
    const categories = reactive([]);
    const units = reactive([]);
    const modalHeader = ref(""); // Add or Edit Product
    const image = ref("");
    const imagePreview = ref(""); //for displaying image while uploading

    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );
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
      getProducts();
      getCategories();
      getUnits();
      setAvtarUploadImage();
    });

    //end of onMounted

    //start---for prompt
    const isActivePrompt = ref(false);
    const delete_id = ref("");

    const deleteProductModal = (product_id) => {
      isActivePrompt.value = true;
      delete_id.value = product_id;
    };
    const callbackPrompt = () => {
      isActivePrompt.value = false;
      console.log(delete_id.value);
      deleteProduct(delete_id.value);
    };
    const callbackPromptCancel = () => {
      isActivePrompt.value = false;
      delete_id.value = "";
    };
    const deleteProduct = (product_id) => {
      axios
        .delete("product/" + product_id)
        .then((response) => {
          toast(response.data.message, {
            showIcon: true,
            type: response.data.status,
            position: "top-right",
            transition: "zoom",
          });
          getProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const setAvtarUploadImage = () => {
      // imagePreview.value = "/img/upload_image.png";
    };

    const isValidHttpUrl = (check_url) => {
      const pattern = new RegExp(
        "^([a-zA-Z]+:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
      );
      return pattern.test(check_url);
    };

    const fileSelected = (e) => {
      image.value = e.target.files[0];

      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          imagePreview.value = reader.result;
        }.bind(),
        false
      );

      if (image.value) {
        if (/\.(jpe?g|png|gif)$/i.test(image.value.name)) {
          reader.readAsDataURL(image.value);
        }
      }
    };
    const showProduct = (custom_product_id) => {
      router.push({ path: `${custom_product_id}/show-product/` });
    };

    const getCategories = () => {
      axios
        .get("categories")
        .then((response) => {
          console.log(response.data.data);
          for (let i = 0; i < response.data.data.length; i++) {
            categories.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getUnits = () => {
      axios
        .get("units")
        .then((response) => {
          console.log(response.data.data);
          for (let i = 0; i < response.data.data.length; i++) {
            units.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const addProductBtn = () => {
      clearProduct();
      isModalUpdating.value = false;
      modalHeader.value = "Add";
      displayProductModal();
      // router.push({ path: '/new-product' })
    };
    const editProductModal = (product_id) => {
      isModalUpdating.value = true;
      modalHeader.value = "Edit";
      clearProduct();
      displayProductModal();
      getSingleProduct(product_id);
    };
    const getSingleProduct = (product_id) => {
      console.log(product_id);

      axios
        .get("product/" + product_id)
        .then((response) => {
          // console.log(response.data.product.name);
          product.id = response.data.product.id;
          product.name = response.data.product.name;
          product.product_cat_id = response.data.product.product_cat_id;
          product.unit_id = response.data.product.unit_id;

          if (isValidHttpUrl(response.data.product.image)) {
            product.image = response.data.product.image;
            imagePreview.value = product.image;
            // console.log('valid')
          } else {
            // console.log('no-valid')
            // console.log(VITE_MY_APP_BACK_URL_HOME.value)
            product.image =
              VITE_MY_APP_BACK_URL_HOME.value + response.data.product.image;
            imagePreview.value = product.image;
          }

          product.sp = response.data.product.sp;
          product.cp = response.data.product.cp;
          product.opening_stock = response.data.product.opening_stock;
          product.description = response.data.product.description;

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
    const displayProductModal = () => {
      clearProduct();
      if (showProductModal.value) {
        showProductModal.value = false;
      } else {
        showProductModal.value = true;
      }
    };
    const clearProduct = () => {
      product.id = "";
      product.name = "";
      product.product_cat_id = "";
      product.unit_id = "";
      product.cp = "";
      product.sp = "";
      product.opening_stock = "";
      product.description = "";
      product.image = "";
      imagePreview.value = "";
      errors.value = "";
    };
    const addProduct = () => {
      if (isModalUpdating.value) {
        console.log("okay i will update boos");

        let formdata = new FormData();
        formdata.append("id", product.id);
        formdata.append("name", product.name);
        formdata.append("product_cat_id", product.product_cat_id);
        formdata.append("unit_id", product.unit_id);
        formdata.append("cp", product.cp);
        formdata.append("sp", product.sp);

        formdata.append("image", product.image);

        formdata.append("opening_stock", product.opening_stock);
        formdata.append("description", product.description);
        if (image.value) {
          formdata.append("image", image.value);
        }

        axios
          .post("product/edit", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear product form
            clearProduct();
            //get new data from api products
            getProducts();
            //hide the product modal
            displayProductModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", product.name);
        formdata.append("product_cat_id", product.product_cat_id);
        formdata.append("unit_id", product.unit_id);
        formdata.append("cp", product.cp);
        formdata.append("image", product.image);
        formdata.append("sp", product.sp);
        formdata.append("opening_stock", product.opening_stock);
        formdata.append("description", product.description);
        if (image.value) {
          formdata.append("image", image.value);
        }
        formdata.append("image", "");

        axios
          .post("product/add", formdata)
          .then((response) => {
            toast(response.data.message, {
              showIcon: true,
              type: response.data.status,
              position: "top-center",
              transition: "zoom",
            });
            //clear product form
            clearProduct();
            //get new data from api products
            getProducts();
            //hide the product modal
            displayProductModal();
          })
          .catch((error) => {
            if (error.response.status == 422) {
              errors.value = error.response.data.errors;
            }
          });
      }
    };

    const getProducts = (page_url) => {
      // toast("Product Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });
      page_url = page_url || "products";

      products.length = 0;
      axios
        .get(page_url)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            products.push(response.data.data[i]);
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
      //we are looking for empty searchQuery value. If it is empty we will fetch products without
      //  any query with default pagination
      // console.log(`x is ${newX}`);
      if (newX === "") {
        getProducts();
      }
    });

    //end of watch
    const searchProduct = (page_url) => {
      if (searchQuery.value != "") {
        console.log(
          "hello boss searching now....please wait" + searchQuery.value
        );

        //hit api to search
        page_url = page_url || "products/search/" + searchQuery.value;
        products.length = 0;
        axios
          .get(page_url)
          .then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
              products.push(response.data.data[i]);
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
      product,
      toast,
      products,
      addProductBtn,
      getProducts,
      showProductModal,
      displayProductModal,
      addProduct,
      editProductModal,
      modalHeader,
      categories,
      units,
      getCategories,
      getUnits,
      setAvtarUploadImage,
      fileSelected,
      image,
      imagePreview,
      VITE_MY_APP_BACK_URL_HOME,
      showProduct,
      isValidHttpUrl,
      errors,
      isActivePrompt,
      callbackPrompt,
      callbackPromptCancel,
      deleteProductModal,
      pagination,
      makePagination,
      searchQuery,
      searchProduct,
      hasPermission,
    };
  }, //end of setup
};
</script>
	
	<style scoped>
.form-input-holder-container {
  margin-bottom: 15px;
}
.image-upload-holder {
  display: flex;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.products-content {
  /* background: white; */
}
button.btn-new-product {
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

.invoiceItemProductName {
  display: flex;
  padding: 0px;
  align-items: center;
}
img.product_logo_img {
  width: 60px;
  /* margin-top: 15px; */
}
input.productImageHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  display: none;
  margin-top: 10px;
}
.form-product-left {
  margin: 15px;
}
.form-product-right {
  margin: 15px;
}
.image-upload-icon-holder {
  width: 60px;
  color: var(--primary);
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

