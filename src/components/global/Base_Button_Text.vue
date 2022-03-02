<template>
  <div>
    <VueCustomTooltip
      :label="props.tooltip"
      :active="props.tooltip_status"
      :position="props.tooltip_position"
    >
      <button
        :id="props.id"
        :type="props.type"
        :class="[
          props.priority === 'Primary'
            ? `btn btn__primary btn__full ${props.class}`
            : `btn btn__secondary ${props.class}`,
        ]"
        @click="props.action"
      >
        {{ props.text }}
      </button>
    </VueCustomTooltip>
  </div>
</template>

<script>
import VueCustomTooltip from "@adamdehaven/vue-custom-tooltip";

import { ref } from "vue";

export default {
  name: "BaseButton",
  components: {
    VueCustomTooltip,
  },
  props: {
    text: {
      type: String,
    },
    id: {
      type: String,
    },
    class: {
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
    tooltip: {
      type: String,
    },
    tooltip_status: {
      type: Boolean,
    },
    tooltip_position: {
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

    const showTooltip = () => {
      console.log(props.class);
      if (props.tooltip) {
        document.querySelector("#tooltip").classList.remove("hide");
      }
    };

    const hideTooltip = () => {
      document.querySelector("#tooltip").classList.add("hide");
    };

    return { props, showTooltip, hideTooltip };
  },
};
</script>

<style lang="scss" scoped>
.btn {
  height: 36px;
  border: none;
  border-radius: 0px;
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
  position: relative;
}

.disabled {
  background: #e9e6e6;
  color: #979ebe;
  border: none;
  border: 2px solid #e9e6e6;
}
.disabled:hover {
  cursor: not-allowed;
  background: #e9e6e6;
}

.tooltip {
  display: none !important;
}

::v-deep .vue-custom-tooltip:after {
  background: #212430;
  border-radius: 3px;
  font-family: "Avenir Next";
  font-weight: 500;
  font-size: 12px;
}

.hideTooltip {
  display: none !important;
}
</style>
