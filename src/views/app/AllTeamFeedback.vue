<template>
  <div class="content">
    <TheCreateFeedbackModal v-if="store.state.createFeedbackModal" />

    <!-- TODO — Add search and filters -->
    <div class="content__left">
      <div class="card summary">
        <div class="header">
          <p class="header__title">Feedback</p>
          <BaseButton
            :priority="priority"
            :text="text"
            :action="showCreateFeedbackModal"
            class="actions__create"
          />
        </div>
        <div class="actions"></div>
      </div>
    </div>

    <div class="content__right">
      <div
        class="card fb"
        v-for="feedback in store.state.feedback"
        :key="feedback.id"
      >
        <div class="fb__top">
          <div class="fb__top--left">
            <div class="left">
              <p class="initials">{{ feedback._initials }}</p>
            </div>
            <div class="right">
              <p class="project">{{ feedback._project.name }}</p>
              <p class="details">
                Added by {{ feedback._addedBy }} {{ feedback._dateAdded }}
              </p>
            </div>
          </div>
          <div class="fb__top--right">
            <p class="tag priority__high" v-if="feedback.priority === 'High'">
              {{ feedback.priority }}
            </p>
            <p class="tag priority__med" v-if="feedback.priority === 'Medium'">
              {{ feedback.priority }}
            </p>
            <p class="tag priority__low" v-if="feedback.priority === 'Low'">
              {{ feedback.priority }}
            </p>
          </div>
        </div>
        <div class="fb__mid">
          <p class="title">{{ feedback.title }}</p>
          <p class="description">{{ feedback.description }}</p>
        </div>
        <div class="fb__bottom">
          <div class="left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 0 24 24"
              width="16px"
              fill="#7B82A3"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
              />
            </svg>
            <div class="comments__count" v-if="feedback.comments">{{ feedback.comments.length }}</div>
          </div>
          <div class="right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#7B82A3"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
              />
            </svg>
            <p class="count">{{ feedback.votes }}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#7B82A3"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
              />
            </svg>
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
import TheCreateFeedbackModal from "../../components/single/TheCreateFeedbackModal.vue";

export default {
  name: "Launch Feedback",
  components: {
    BaseButton,
    TheCreateFeedbackModal,
  },
  data() {
    return {
      priority: "Secondary",
      text: "+ Add",
    };
  },
  setup() {
    // Define variables

    // const showCreateFeedbackModal = () => {
    //   store.dispatch("showCreateFeedbackModal");
    // };

    return { store };
  },
  methods: {
    showCreateFeedbackModal() {
      store.dispatch("showCreateFeedbackModal");

      if (store.state.projects.length > 4) {
        document.querySelector('.content').style.padding = "24px 92px 24px 76px";
      }
    },
  }
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
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header__title {
        font-weight: 600;
        font-size: 16px;
      }
      .header__action {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        border-radius: 5px;
      }
      .header__action:hover {
        cursor: pointer;
        background: #313649;
      }
    }
  }
  .content__left {
    width: 220px;
    margin: 0 12px;
    .summary {
      // min-width: 280px;
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 24px;
      .title {
        margin: 0 0 16px;
      }
    }
  }
  .content__right {
    width: 540px;
    max-width: 540px;
    margin: 0 0 0 12px;
    .fb {
      display: flex;
      flex-direction: column;
      margin: 0 0 12px;
      .fb__top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .fb__top--left {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 0 0 16px;
          .left {
            margin: 0 12px 0 0;
            .initials {
              display: flex;
              align-items: center;
              justify-content: center;
              background: #212430;
              color: white;
              height: 36px;
              width: 36px;
              border-radius: 100%;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 1.1px;
            }
          }
          .right {
            display: flex;
            flex-direction: column;
            .project {
              font-weight: 600;
              font-size: 12px;
              margin: 0 0 2px;
            }
            .details {
              font-size: 12px;
              color: #636c92;
            }
          }
        }
        .fb__top--right {
          .tag {
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 500;
          }
          .priority__low {
            background: #f5e5a3;
          }
          .priority__med {
            background: #ffc799;
          }
          .priority__high {
            background: #f0b5bc;
          }
        }
      }
      .fb__mid {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .title {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 6px 0;
        }
        .description {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #636c92;
        }
      }
      .fb__bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // border-top: 1px solid #dbdde6;
        margin: 24px 0 0 0;
        .left {
          display: flex;
          position: relative;
          .comments__count {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: absolute;
            top: -8px;
            left: -4px;
            background: #dfe1e9;
            margin: 0 0 0 12px;
            border-radius: 100%;
            height: 16px;
            width: 16px;
            font-size: 11.5px;
            font-weight: 600;
          }
        }
        .right {
          display: flex;
          flex-direction: row;
          align-items: center;
          .count {
            font-size: 12px;
            font-weight: 600;
            margin: 0 4px;
          }
        }
      }
    }
  }
}
</style>
