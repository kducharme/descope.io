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
        @click="props.action"
        class="filter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#7B82A3"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M11 18h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm4 6h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1z"
          />
        </svg>
        <p>Filter</p>
      </button>
    </VueCustomTooltip>
  </div>
</template>

<script>
import VueCustomTooltip from "@adamdehaven/vue-custom-tooltip";

import { ref } from "vue";

export default {
  name: "BaseFilter",
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
.filter {
  height: 36px;
  border: none;
  border-radius: 0px;
  font-weight: 800;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #dbdde6;
  border-radius: 3px;
  height: 41px;
  width: 88px;
  padding: 0 8px 0 6px;
  margin-left: 16px;
  svg {
      margin-right: 8px;
  }
  p {
      font-size: 14px;
      letter-spacing: 0.15px;
  }
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
