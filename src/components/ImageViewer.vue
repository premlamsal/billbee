<template>
  <transition name="zoom-fade">
    <div v-if="show" class="image-viewer" @click="closeViewer">
      <div class="image-container">
        <img :src="image" alt="Zoomed Image" @click.stop />
      </div>
      <span class="close-btn" @click="closeViewer"
        ><i class="fi fi-rr-circle-xmark"></i>
      </span>
    </div>
  </transition>
</template>
    
  <script>
import { ref, watch } from "vue";

export default {
  props: {
    image: String,
  },
  setup(props) {
    const show = ref(false);

    const closeViewer = () => {
      show.value = false;
    };

    watch(
      () => props.image,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          show.value = !!newVal;
        }
      }
    );

    return {
      show,
      closeViewer,
    };
  },
};
</script>
    
  <style scoped>
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 84%);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s, transform 0.5s;
}

.image-container {
  position: relative;
  max-width: 100vw;
  max-height: 100vh;
}

img {
  /* width: 90vw; */
  height: 90vh;
  display: block;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.zoom-fade-enter {
  opacity: 0;
  transform: scale(0.8);
}

.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
  