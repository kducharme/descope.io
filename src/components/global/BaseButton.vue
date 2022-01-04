<template>
  <div>
    <button
      :class="[
        props.priority === 'Primary'
          ? 'btn btn__primary btn__full'
          : 'btn btn__secondary',
      ]"
      @click="props.action"
    >
      {{ props.text }}
    </button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LaunchDocName",
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
.btn {
  height: 32px;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 13.5px;
}

.btn__primary {
  background: #3d52d5;
  color: white;
}

.btn__full {
  width: 100%;
}
</style>
