<template>
  <div>
    <button
      :type="props.type"
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
.btn {
  height: 36px;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Avenir next';
}

.btn__primary {
  padding: 6px 12px;
  background: #3d52d5;
  color: white;
}

.btn__primary:hover {
  cursor: pointer;
  background: #3549c5;
}

.btn__secondary {
  // height: 32px;
  font-weight: 500;
  background: #eeeff3;
  border: 2px solid #cfd2de;
  padding: 8px 12px;
}
.btn__secondary:hover {
  cursor: pointer;
  background: #e8e9ee;
}

.btn__full {
  background: #3d52d5;
  width: 100%;
}
</style>
