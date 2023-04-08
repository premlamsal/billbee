<template>
  <main id="products-page">
    <h1>Products</h1>
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
            <div class="form-input-product">
              <label>Product Category</label>
              <select
                v-model="product.product_cat_id"
                class="productCategoryHolder"
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
            </div>
            <div class="form-input-product">
              <label>Name</label>

              <input
                type="text"
                placeholder="Product Name"
                class="productNameHolder"
                v-model="product.name"
              />
            </div>

            <div class="form-input-product">
              <label>Unit</label>

              <select v-model="product.unit_id" class="productUnitHolder">
                <template v-for="unit in units" v-bind:key="unit.id">
                  <option selected :value="unit.id">
                    {{ unit.short_name }}
                  </option>
                </template>
              </select>
            </div>
            <div class="form-input-product">
              <label> Cost Price</label>

              <input
                type="text"
                placeholder="Product Cost Price"
                class="productCostPriceHolder"
                v-model="product.cp"
              />
            </div>
            <div class="form-input-product">
              <label> Selling Price</label>

              <input
                type="text"
                placeholder="Product Selling Price"
                class="productSellingPriceHolder"
                v-model="product.sp"
              />
            </div>
            <div class="form-input-product">
              <label> Opening Stock</label>

              <input
                type="text"
                placeholder="Product Opening Stock"
                class="productOpeningStockHolder"
                v-model="product.opening_stock"
              />
            </div>
            <div class="form-input-product">
              <label> Description</label>
              <textarea
                type="text"
                class="productDescriptionHolder"
                v-model="product.description"
              ></textarea>
            </div>
            <div class="form-input-product">
              <label> Image</label>

              <input
                type="file"
                class="productImageHolder"
                v-on:change="fileSelected"
              />
              <img v-bind:src="imagePreview" class="product_logo_img" />
            </div>
          </div>
          <div class="modal-footer">
            <h4>Please fill above details and submit form</h4>
          </div>
        </div>
      </div>
    </Transition>
    <div class="product-header">
      <button class="btn-new-product" @click="addProductBtn()">
        <span class="btn-name"> New Product</span>
        <span class="material-icons">add_circle</span>
      </button>
    </div>
    <div class="products-content">
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
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="product in products" v-bind:key="product.id">
              <tr v-if="products != null">
                <td>{{ product.custom_product_id }}</td>
                <td>
                  <div class="invoiceItemProductName">
                    <div v-if="product.image">
                      <img
                        style="border-radius: 50%"
                        :src="VITE_MY_APP_BACK_URL_HOME+product.image"
                        width="40"
                        height="40"
                        :alt="product.name"
                      />
                    </div>

                    <div style="margin-left: 10%">
                      {{ product.name }}
                    </div>
                  </div>
                </td>
                <td>{{ product.category.name }}</td>
                <td>{{ product.unit.short_name }}</td>
                <td>{{ product.sp }}</td>
                <td>
                  <span
                    class="material-icons"
                    style="color: var(--primary); cursor: pointer"
                    >format_align_justify</span
                  >
                  <span
                    class="material-icons"
                    style="color: blueviolet; cursor: pointer"
                    @click="editProductModal(product.id)"
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
    const products = reactive([]);
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
         
	const VITE_MY_APP_BACK_URL_HOME = ref(import.meta.env.VITE_MY_APP_BACK_URL_HOME );

    //on mounted start
    onMounted(() => {
      getProducts();
      getCategories();
      getUnits();
      setAvtarUploadImage();
    });

    //end of onMounted

    const setAvtarUploadImage = () => {
      imagePreview.value = "/img/upload_image.png";
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
          product.sp = response.data.product.sp;
          product.cp = response.data.product.cp;
          product.opening_stock = response.data.product.opening_stock;
          product.description = response.data.product.description;

		  
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
    const displayProductModal = () => {
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
        formdata.append("opening_stock", product.opening_stock);
        formdata.append("description", product.description);
        if (image.value) {
          formdata.append("image", image.value);
        }
       

        axios
          .post("product/edit", formdata)
          .then((response) => {
            toast(response.data.msg, {
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
            console.log(error);
          });
      } else {
        console.log("oaky i will add boss");

        let formdata = new FormData();
        formdata.append("name", product.name);
        formdata.append("product_cat_id", product.product_cat_id);
        formdata.append("unit_id", product.unit_id);
        formdata.append("cp", product.cp);
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
            toast(response.data.msg, {
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
            console.log(error);
          });
      }
    };

    const getProducts = () => {
      // toast("Product Loaded", {
      //   showIcon: true,
      //   type: "info",
      //   position: "top-center",
      //   transition: "zoom",
      // });

      products.length = 0;
      axios
        .get("products")
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            products.push(response.data.data[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
	  VITE_MY_APP_BACK_URL_HOME
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

input.productNameHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
select.productCategoryHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
select.productUnitHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.productCostPriceHolder,
input.productSellingPriceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

input.productOpeningStockHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}

textarea.productDescriptionHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  resize: none;
  margin-top: 5px;
}

input.productOpeningBalanceHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
.form-input-product {
  margin-bottom: 15px;
}

.product-header {
  display: flex;
  justify-content: right;
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
  width: 100px;
  margin-top: 15px;
}
input.productImageHolder {
  border: 0px;
  padding: 10px;
  border: 1px solid #4ade809c;
  border-radius: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
}
</style>

