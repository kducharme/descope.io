<template>
  <div id="launchName" :class="[emptyName === true ? 'name__placeholder' : 'name']" contenteditable="true" @click="removePlaceholder">
    {{ name }}
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LaunchDocName",
  props: {
    name: {
      type: String,
    },
  },
  setup(props) {
    // Create data
    const emptyName = ref(null);

    // Check if the launch has a name
    if (!props.name) {
      emptyName.value = true;
    }

    const removePlaceholder = () => {
      document.querySelector("#launchName").classList.remove('name__placeholder')
    }

    return { removePlaceholder, emptyName }
  }
};
</script>

<style lang="scss" scoped>
.name__placeholder::before {
  content: "Untitled";
  position: absolute;
}
</style>
