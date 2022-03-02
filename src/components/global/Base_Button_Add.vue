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
        :class="`btn__icon ${props.class}`"
        @click="toggleDropdown"
      >
        <p>Add</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#fff"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"
          />
        </svg>
      </button>
    </VueCustomTooltip>
    <div class="dropdown" v-if="dropdown">
      <div class="option" @click="showCreateIssueModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#878DAB"
          class="option__icon"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
          />
        </svg>
        <p class="option__text">Issue</p>
      </div>
      <div class="option" @click="showCreateRequestModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#878DAB"
          class="option__icon"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z"
          />
        </svg>
        <p class="option__text">Request</p>
      </div>
      <div class="option" @click="showCreateQuestionModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#878DAB"
          class="option__icon"
        >
          <g>
            <rect fill="none" height="24" width="24" />
            <path
              d="M13.25,16.74c0,0.69-0.53,1.26-1.25,1.26c-0.7,0-1.26-0.56-1.26-1.26c0-0.71,0.56-1.25,1.26-1.25 C12.71,15.49,13.25,16.04,13.25,16.74z M11.99,6c-1.77,0-2.98,1.15-3.43,2.49l1.64,0.69c0.22-0.67,0.74-1.48,1.8-1.48 c1.62,0,1.94,1.52,1.37,2.33c-0.54,0.77-1.47,1.29-1.96,2.16c-0.39,0.69-0.31,1.49-0.31,1.98h1.82c0-0.93,0.07-1.12,0.22-1.41 c0.39-0.72,1.11-1.06,1.87-2.17c0.68-1,0.42-2.36-0.02-3.08C14.48,6.67,13.47,6,11.99,6z M19,5H5v14h14V5 M19,3c1.1,0,2,0.9,2,2v14 c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2H19L19,3z"
            />
          </g>
        </svg>
        <p class="option__text">Question</p>
      </div>
      <div class="divider"></div>
      <div class="option option__project" @click="showCreateProjectModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#878DAB"
          class="option__icon"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"
          />
        </svg>
        <p class="option__text">Project</p>
      </div>
    </div>
  </div>
</template>

<script>
import VueCustomTooltip from "@adamdehaven/vue-custom-tooltip";
import { ref } from "vue";
import store from "../../store/index";

export default {
  name: "BaseButtonAdd",
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
    // Setup data
    const dropdown = ref(null);
    dropdown.value = false;

    const toggleDropdown = () => {
      dropdown.value = !dropdown.value;
    };

    // Button actions

    const showCreateIssueModal = () => {
      store.dispatch("showCreateIssueModal");
      dropdown.value = !dropdown.value;
    };

    const showCreateRequestModal = () => {
      store.dispatch("showCreateRequestModal");
      dropdown.value = !dropdown.value;
    };

    const showCreateQuestionModal = () => {
      store.dispatch("showCreateQuestionModal");
      dropdown.value = !dropdown.value;
    };
    const showCreateProjectModal = () => {
      store.dispatch("showCreateProjectModal");
      dropdown.value = !dropdown.value;
    };

    return {
      props,
      toggleDropdown,
      dropdown,
      showCreateProjectModal,
      showCreateIssueModal,
      showCreateRequestModal,
      showCreateQuestionModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn__icon {
  position: relative;
  height: 36px;
  border: none;
  border-radius: 3px;
  font-family: "Avenir next";
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3253e4;
  padding: 6px 8px 6px 10px;
  p {
    margin: 0 0 0 8px;
    color: white;
    font-weight: 600;
  }
}

.btn__icon:hover {
  cursor: pointer;
  background: #2a4ad4;
}

.dropdown {
  display: flex;
  flex-direction: column;
  width: 180px;
  right: 16px;
  position: absolute;
  z-index: 99999;
  background: white;
  box-shadow: 0px 1px 8px rgba(45, 62, 80, 0.22);
  // border: 1px solid #dbdbdb;
  margin: 12px 0 0 0;
  padding: 8px 0;
  border-radius: 12px;
  .option {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    .option__icon {
      margin: 0 12px 0 0;
    }
    .option__bottom {
      margin: 4px 0 0 0;
    }
  }
  .option:hover {
    cursor: pointer;
    background: #e7e8ee;
  }
  .divider {
    border-top: 1px solid #dbdbdb;
    margin: 8px 0;
  }
  // .option__project {
  //   margin: 8px 0 0 0;
  //   padding: 12px 16px;
  // }
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
