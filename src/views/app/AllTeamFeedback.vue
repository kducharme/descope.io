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
              <p class="project" v-if="feedback._project">
                {{ feedback._project.name }}
              </p>
              <p class="project" v-if="!feedback._project">
                {{ store.state.teams_active_data.name }} Team
                <span class="team">(no project)</span>
              </p>
              <p class="details">
                Added by {{ feedback._addedBy }} {{ feedback._dateAdded }}
              </p>
            </div>
          </div>
          <div class="fb__top--right">
            <p
              class="tag category__issue"
              v-if="feedback.category === 'issue_design'"
            >
              Design Issue
            </p>
            <p
              class="tag category__issue"
              v-if="feedback.category === 'issue_product'"
            >
              Product Issue
            </p>
            <p
              class="tag category__issue"
              v-if="feedback.category === 'issue_technical'"
            >
              Engineering Issue
            </p>
            <p
              class="tag category__request"
              v-if="feedback.category === 'request_feature'"
            >
              Feature Request
            </p>
          </div>
        </div>
        <div class="fb__mid">
          <p class="title">{{ feedback.title }}</p>
          <p class="description">{{ feedback.description }}</p>
        </div>
        <div class="fb__image" v-if="feedback._image">
          <img :src="feedback._image" />
        </div>
        <div class="fb__bottom">
          <div class="left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 0 24 24"
              width="16px"
              fill="#7B82A3"
              class="comment"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
              />
            </svg>
            <div class="comment__count" v-if="feedback.comments">
              {{ feedback.comments.length }}
            </div>
          </div>
          <div class="right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#7B82A3"
              class="vote vote__up"
              @click="upVote(feedback)"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
              />
            </svg>
            <p class="count">{{ feedback.votes.length }}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#7B82A3"
              class="vote vote__down"
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
import { supabase } from "../../supabase/init";

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

    const upVote = async (fb) => {
      fb.votes++;
      try {
        const { error } = await supabase.from("feedback_votes").insert([
          {
            feedback_id: fb.id,
          },
        ]);
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    };

    return { store, upVote };
  },
  methods: {
    showCreateFeedbackModal() {
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
            margin: 0 8px 0 0;
            .initials {
              display: flex;
              align-items: center;
              justify-content: center;
              background: #b6bbcd;
              color: white;
              height: 32px;
              width: 32px;
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
            .team {
              color: #9ba1bb;
              font-weight: 400;
              margin-left: 4px;
            }
            .details {
              font-size: 12px;
              color: #636c92;
            }
          }
        }
        .fb__top--right {
          .tag {
            padding: 4px 6px;
            border-radius: 3px;
            font-size: 11.5px;
            font-weight: 500;
          }
          .category__issue {
            background: #f0b5bc;
          }
          .category__request {
            background: #eeeff3;
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
      .fb__image {
        margin: 16px 0 0 0;
        img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          object-position: 10% 0%;
        }
      }
      .fb__bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 16px 0 0 0;
        .left {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          .comment {
            padding: 4px;
            margin: -4px;
          }
          .comment:hover {
            background: #eeeff3;
            border-radius: 3px;
            cursor: pointer;
          }
          svg:hover {
            fill: #212430;
          }
        }
        .comment__count {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: absolute;
          top: -8px;
          left: -4px;
          background: #212430;
          margin: 0 0 0 12px;
          border-radius: 100%;
          height: 16px;
          width: 16px;
          font-size: 11.5px;
          font-weight: 600;
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
          .vote {
            padding: 2px;
          }
          .vote__up:hover,
          .vote__down:hover {
            background: #eeeff3;
            border-radius: 3px;
            cursor: pointer;
          }
          svg:hover {
            fill: #212430;
          }
        }
      }
    }
  }
}
</style>
