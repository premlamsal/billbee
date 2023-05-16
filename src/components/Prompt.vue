<template>
  <Transition name="slide-fade" :duration="550">
    <div class="prompt-container" v-if="showPrompt">
      <div class="prompt">
        <div class="prompt-header">
          <h2>Please Confirm before proceed</h2>
        </div>
        <div class="prompt-body">
          <p>
            Are you sure want to perform this action? This action is not
            reversible.
          </p>
          <!-- {{ content }} -->
        </div>
        <div class="prompt-footer">
          <button class="btnConfirm" @click="$emit('eventConfirm',true)">Confirm?</button>
          <button class="btnCancel" @click="$emit('eventCancel',false)">Cancel</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";

// const props = defineProps(["content"]);
const props = defineProps(["isPrompt"]);

const showPrompt= ref(false);

showPrompt.value= props.isPrompt

const displayPrompt = () => {
  
  // if (showPrompt.value) {
  //   showPrompt.value = false;
  // } else {
  //   showPrompt.value = true;
  // }

 showPrompt.value=false;
};
</script>
<style scoped>
.prompt-container {
  display: flex;
  justify-content: center;
}
.prompt-footer {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
}
button.btnConfirm {
  background: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
button.btnCancel {
  background: orangered;
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.prompt {
  background: white;
  padding: 10px;
  border-radius: 10px;
}
.prompt-container {
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
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
