<template>
  <div class="feedback">
    <div class="background"></div>
    <div class="content">
      <div class="content__left">
        <div class="feedbackHeader">
          <div class="close" @click="navigateBack">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#7B82A3"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
              />
            </svg>
          </div>
        </div>

        <div class="feedbackDetails" v-if="store.state.feedback_active">
          <div class="about">
            <div class="about__left">
              <p class="initials">
                {{ store.state.feedback_active._initials }}
              </p>
            </div>
            <div class="about__right">
              <p class="project" v-if="store.state.feedback_active._project">
                {{ store.state.feedback_active._project.name }}
              </p>
              <p class="project" v-if="!store.state.feedback_active._project">
                {{ store.state.teams_active_data.name }} Team
                <span class="team">(no project)</span>
              </p>
              <p class="details">
                Added by {{ store.state.feedback_active._addedBy }}
                {{ store.state.feedback_active._dateAdded }}
              </p>
            </div>
          </div>
          <p class="title">{{ store.state.feedback_active.title }}</p>
          <p class="description">
            {{ store.state.feedback_active.description }}
          </p>
          <div class="image">
            <img
              :src="store.state.feedback_active._image"
              v-if="store.state.feedback_active._image"
              class="fb__image"
            />
            <div
              class="fb__image--placeholder"
              v-if="!store.state.feedback_active._image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 0 24 24"
                width="32px"
                fill="#B7BBCC"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.9 13.98l2.1 2.53 3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68c.25.33.01.8-.4.8H6.02c-.42 0-.65-.48-.39-.81L8.12 14c.19-.26.57-.27.78-.02z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="content__right">
        <div class="comments__list" id="comments">
          <BaseCommentList
            v-for="comment in store.state.comments"
            :key="comment.id"
            :comment="comment"
          />
        </div>
        <div class="comments__add">
          <BaseCommentInput />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import { useRouter } from "vue-router";
import BaseCommentInput from "../../components/global/BaseCommentInput.vue";
import BaseCommentList from "../../components/global/BaseCommentList.vue";

export default {
  name: "Feedback Details",
  components: {
    BaseCommentInput,
    BaseCommentList,
  },
  setup() {
    // Create data / vars
    const router = useRouter();

    // Get data
    const setActiveFeedbackData = async () => {
      const feedback_id = router.currentRoute.value.fullPath.split("/")[4];
      store.dispatch("setActiveFeedback", {
        feedback_id,
      });
      store.dispatch("getComments", {
        feedback_id,
      });
      store.dispatch("setActiveTeamData");
    }

    setActiveFeedbackData();

    // What "Back" is clicked, user is navigated back to team page
    const navigateBack = () => {
      router.push({
        name: "feedback",
        params: {
          id: store.state.teams_active.id,
        },
      });
    };

    return { store, navigateBack };
  },
  mounted() {
    // console.log(document.querySelector("#comments").childElementCount)
    // document.querySelector("#comments").scrollTo(0,600)
    // console.log(commentArea.scrollHeight);
    // commentArea.scrollTo(0, 699);
  },
};
</script>

<style lang="scss" scoped>
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 99999;
  background: #212430b6;
  .background {
    height: 20px;
  }
  .content {
    display: flex;
    flex-direction: row;
    position: fixed;
    height: 96vh;
    width: 98vw;
    background: white;
    border-radius: 12px;

    .content__left {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 60%;
      padding: 64px 80px;
      overflow-y: auto;
      .feedbackHeader {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 0 24px;
        .close {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 8px;
          left: 8px;
          align-items: center;
          height: 32px;
          width: 32px;
          border-radius: 100%;

          svg:hover {
            fill: #212430;
          }
        }
        .close:hover {
          cursor: pointer;
          background: #eeeff3;
        }
      }
      .feedbackDetails {
        .title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .description {
          color: #636c92;
          line-height: 1.6;
        }
        .about {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 0 0 20px;
          .about__left {
            margin: 0 12px 0 0;
            .initials {
              display: flex;
              align-items: center;
              justify-content: center;
              background: #c8e4f9;
              height: 40px;
              width: 40px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 1.1px;
            }
          }
          .about__right {
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
        .image {
          margin: 24px 0 0 0;
          width: 100%;
          img {
            width: 100%;
            border: 1px solid #dbdde6;
            border-radius: 5px;
          }
          .fb__image--placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid #dbdde6;
            border-style: dashed;
            //   background: #f2f3f5;
            border-radius: 5px;
            height: 350px;
            width: 100%;
          }
        }
      }
    }
    .content__right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 40%;
      background: #f3f4f7;
      border-left: 1px solid #dbdde6;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      .comments__list {
        display: flex;
        flex-direction: column-reverse;
        // justify-content: flex-end;
        height: 100%;
        padding: 16px 16px 0 16px;
        overflow-y: auto;
      }
      .comments__add {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        // height: 160px;
        width: 100%;
        padding: 16px;
      }
    }
  }
}
</style>
