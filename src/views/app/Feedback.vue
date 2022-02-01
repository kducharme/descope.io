<template>
  <div class="content">
    <TheAddFeedbackModal v-if="store.state.createFeedbackModal" />

    <div class="content__left">
      <div class="card summary">
        <div class="header"><p class="title">Feedback</p></div>
        <div class="actions">
          <BaseButton
            :priority="priority"
            :text="text"
            :action="showAddFeedbackModal"
            class="actions__create"
          />
          <div class="form__select" id="team">Search</div>
        </div>
      </div>
    </div>

    <div class="content__right">
      <div
        class="card fb"
        v-for="feedback in store.state.feedback"
        :key="feedback.id"
      >
        <div class="fb__left">
          <div class="fb__left--top">
            <div class="left">
              <p class="initials">{{ feedback._initials }}</p>
            </div>
            <div class="right">
              <p class="project">{{ feedback._project.name }}</p>
              <p class="details">
                {{ feedback._addedBy }} · {{ feedback._dateAdded }}
              </p>
            </div>
          </div>
          <div class="fb__left--mid">
            <p class="title">{{ feedback.title }}</p>
            <p class="description">{{ feedback.description }}</p>
          </div>
          <div class="fb__left--bottom">
            <!-- <div class="left">Actions go here</div> -->
            <!-- <div class="right">Voting here</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import store from "../../store/index";
import BaseButton from "../../components/global/BaseButton.vue";
import TheAddFeedbackModal from "../../components/single/TheCreateFeedbackModal.vue";

export default {
  name: "Launch Feedback",
  components: {
    BaseButton,
    TheAddFeedbackModal,
  },
  data() {
    return {
      priority: "Primary",
      text: "Add feedback",
    };
  },
  setup() {
    // Define variables

    return { store };
  },
  methods: {
    showAddFeedbackModal() {
      store.dispatch("showCreateFeedbackModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #eeeff3;
  min-height: calc(100vh - 102px);
  width: 100%;
  padding: 24px 80px;
  .card {
    padding: 16px;
    border: 1px solid #dbdde6;
    background: white;
    border-radius: 3px;
  }
  .title {
    font-weight: 600;
    font-size: 14px;
  }
  .content__left {
  }
  .content__right {
    .fb {
      display: flex;
      flex-direction: row;
      .fb__right {
        width: 48px;
        background: #e7e8ee;
        border-left: 1px solid #dbdde6;
      }
    }
  }
}

//   .tag {
//     color: #212430;
//     padding: 4px 8px;
//     border-radius: 3px;
//     font-size: 11.5px;
//     font-weight: 500;
//   }
//   .tag__low {
//     background: #f5e5a3;
//   }
//   .tag__med {
//     background: #ffc799;
//   }
//   .tag__high {
//     background: #e09099;
//   }
// }
</style>
