<template>
  <Transition name="slide-fade" :duration="550">
    <div
      class="prompt-container"
      v-if="props.isPrompt"
      @click="$emit('eventCancel', false)"
    >
      <div class="prompt" @click.stop="">
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
          <button class="btnConfirm" @click="$emit('eventConfirm', true)">
            <span class="material-icons">check</span> Confirm?
          </button>
          <button class="btnCancel" @click="$emit('eventCancel', false)">
            <span class="material-icons">close</span>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref } from "vue";

// const props = defineProps(["content"]);
const props = defineProps({
  isPrompt: {
    type: Boolean,
  },
});

/* how to use this compoent

--------localy-------------
 import 'Prompt' from 'location for compoents'

------------globaly---------

//for custom prompt --own-prompt-compoent---registering globally
import Prompt from './components/Prompt.vue'

app.component('Prompt', Prompt)

------------------------------after that below code is common for both----------
1. place this code in script 

      //start---for prompt
      const isActivePrompt = ref(false);

      const btnForPrompt = () => {
        isActivePrompt.value = true;
      };
      const callback = () => {
        isActivePrompt.value = false;
      };
      const callbackCancel = () => {
        isActivePrompt.value = false;
      };

3. use this tag in your parent component 

  <button @click="btnForPrompt()">Call Prompt</button>

    <prompt
        :is-prompt="isActivePrompt"
        @event-confirm="callback"
        @event-cancel="callbackCancel"
      ></prompt>


*/
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
  box-shadow: 2px 3px 7px -3px #2f2727;
}
.prompt-container {
  /* background: #000000d6; */
  /* background: mediumspringgreen; */
  background: #00fa9a30;
  backdrop-filter: blur(5px);
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
