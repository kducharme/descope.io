<template>
  <div class="page">
    <TheAddFeedbackModal v-if="store.state.createFeedbackModal" />
    <div class="content">
      <div class="content__left">
        <div class="summary">
          <div class="header"><p>Feedback</p></div>
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
          class="feedback"
          v-for="feedback in store.state.feedback"
          :key="feedback.id"
        >
          <div class="feedback__left">
            <div class="feedback__left--top">
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
            <div class="feedback__left--mid">
              <p class="title">{{ feedback.title }}</p>
              <p class="description">{{ feedback.description }}</p>
            </div>
            <div class="feedback__left--bottom">Actions go here</div>
          </div>
          <div class="feedback__mid">Img</div>
          <div class="feedback__right">vote</div>
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
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eeeff3;
  // min-height: calc(100vh - 102px);
  // height: 100%;
  padding: 24px;
  .content {
    display: flex;
    flex-direction: row;

    .content__left {
      display: flex;
      flex-direction: column;
      margin: 0 8px 0 0;
      width: 25%;
      .summary {
        background: white;
        border-radius: 3px;
        padding: 16px;
        .header > p {
          font-weight: 600;
        }
        .actions__create {
          margin: 16px 0;
        }
        .form__select {
          background: white;
          border: 2px solid #dbdde6;
          padding: 8px;
          // width: 220px;
          border-radius: 3px;
        }
      }
    }

    .content__right {
      margin: 0 0 0 8px;
      width: 75%;
      min-width: 75%;
      .feedback {
        display: flex;
        flex-direction: row;
        background: white;
        padding: 16px;
        // box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
        border-radius: 3px;
        margin: 0 0 16px;
        .feedback__left {
          display: flex;
          flex-direction: column;
          .feedback__left--top {
            display: flex;
            flex-direction: row;
            margin: 0 0 8px 0;
            .left {
              display: flex;
              margin: 0 6px 0 0;
              .initials {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #ffd3e8;
                // color: white;
                height: 28px;
                width: 28px;
                border-radius: 100%;
                font-size: 11.5px;
                font-weight: 600;
                margin-right: 4px;
              }
            }
            .right {
              display: flex;
              flex-direction: column;
              .project {
                color: #3d52d5;
                font-size: 12px;
                font-weight: 500;
                margin: 0 0 2px;
              }
              .details {
                font-size: 12px;
                color: #535a79;
              }
            }
          }
          .feedback__left--mid {
            display: flex;
            flex-direction: column;
            .title {
              font-size: 14px;
              font-weight: 600;
            }
            .description {
              color: #535a79;
            }
          }
          .feedback__left--bottom {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }

  .tag {
    color: #212430;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 11.5px;
    font-weight: 500;
  }
  .tag__low {
    background: #f5e5a3;
  }
  .tag__med {
    background: #ffc799;
  }
  .tag__high {
    background: #e09099;
  }
}
</style>
