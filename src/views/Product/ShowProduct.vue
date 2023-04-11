<template>
  <div class="show-product-container">
    <div class="product-header">Show Product</div>
    <h1>Showing Product {{ custom_product_id }}</h1>
    <div class="product-content-container">
      <div class="product-details">
        <h1 class="product-name">Product Name : {{ product.name }}</h1>
        <p class="product-category">
          Product Category : {{ product.category }}
        </p>
        <img :src="product.image" alt="Product Image" class="product-image" />
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">
          <p class="cost-price">Cost Price: Rs. {{ product.cp }}</p>
          <p class="selling-price">Selling Price: Rs. {{ product.sp }}</p>
          <p class="unit">Unit: {{ product.unit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const custom_product_id = ref("");
    const axios = inject("$axios");
    const product = reactive({});
    const VITE_MY_APP_BACK_URL_HOME = ref(
      import.meta.env.VITE_MY_APP_BACK_URL_HOME
    );
    const toast = inject("$toast");

    onMounted(() => {
      getIdFromUrl();
      getSingleProduct(custom_product_id.value);
    });

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

    const getSingleProduct = (product_id) => {
      console.log(product_id);

      axios
        .get("product/" + product_id)
        .then((response) => {
          // console.log(response.data.product.name);
          product.id = response.data.product.id;
          product.name = response.data.product.name;
          product.product_cat_id = response.data.product.product_cat_id;
          product.category = response.data.product.category.name;
          product.unit_id = response.data.product.unit_id;
          product.unit = response.data.product.unit.short_name;

          if (isValidHttpUrl(response.data.product.image)) {
            product.image = response.data.product.image;
          } else {
            product.image =
              VITE_MY_APP_BACK_URL_HOME.value + response.data.product.image;
          }

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

    const getIdFromUrl = () => {
      custom_product_id.value = route.params.id;
    }; //

    return {
      getIdFromUrl,
      custom_product_id,
      product,
    };
  },
};
</script>

<style>
.show-product-container {
  padding: 2em;
}
.product-content-container {
      /* background: #f2f2f2; */
    /* padding: 1em; */
}
.product-details {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.product-name {
  font-size: 2rem;
  color: #333;
  margin: 0;
  margin-top: 10px;
}

.product-image {
  max-width: 100%;
  margin-top: 20px;
}

.product-description {
  font-size: 1.2rem;
  color: #555;
  margin: 20px 0;
}

.product-price {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.cost-price,
.selling-price,
.unit {
  font-size: 1.2rem;
  color: #333;
  margin: 0;
}

.cost-price {
  color: #f00;
}

.selling-price {
  color: #00f;
}

.unit {
  color: #0f0;
}
img.product-image {
  width: 200px;
  border-radius: 10%;
  box-shadow: #e91e63 1px 3px 10px -2px;
}

.product-category {
  font-size: 1.2rem;
  color: #777;
  margin: 0;
}
</style>