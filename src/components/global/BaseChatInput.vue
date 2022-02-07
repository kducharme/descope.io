<template>
  <div class="chat">
    <div class="chat__input" contenteditable="true"></div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "BaseButton",
  props: {
    text: {
      type: String,
    },
    priority: {
      type: String,
    },
    action: {
      type: Function,
    },
    style: {
      type: String,
    },
    type: {
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

    return { props };
  },
};
</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 100%;
  .chat__input {
    width: 100%;
    height: 100%;
    background: white;
    border: 1px solid #dbdde6;
    border-radius: 5px;
    padding: 8px;
  }
}
</style>
