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
  font-size: 13px;
  font-family: "Avenir next";
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
}

.btn__primary {
  background: #3253e4;
  color: white;
  border: 2px solid #3253e4;
}

.btn__primary:hover {
  cursor: pointer;
  background: #2a4ad4;
}

.btn__secondary {
  background: white;
  border: 2px solid #3253e4;
  color: #3253e4;
  
}
.btn__secondary:hover {
  cursor: pointer;
  background: #f1f3fc;
}

.btn__full {
  background: #3253e4;
  width: 100%;
}
</style>
