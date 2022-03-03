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
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
          />
        </svg>
        <p class="option__text">Idea</p>
      </div>
      <div class="option" @click="showCreateQuestionModal">
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
            d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
          />
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
