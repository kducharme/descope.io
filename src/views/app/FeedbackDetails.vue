<template>
  <div class="feedback" v-if="store.state.feedback_active">
    <div class="background"></div>
    <div class="content">
      <div class="content__left">
        <div class="header">
          <div class="back" @click="navigateBack">
            <div class="back__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#3d52d5"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M14.71 6.71c-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z"
                />
              </svg>
            </div>
            <p class="back__text">Back to feedback</p>
          </div>
          <p class="title">{{ store.state.feedback_active.title }}</p>
          <p class="description">
            {{ store.state.feedback_active.description }}
          </p>
        </div>
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
      <div class="content__right"></div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import { useRouter } from "vue-router";

export default {
  name: "Feedback Details",
  components: {},
  setup() {
    // Create data / vars
    const router = useRouter();

    // Get data
    const setActiveFeedbackData = async () => {
      const team_id = router.currentRoute.value.fullPath.split("/")[2];
      const feedback_id = router.currentRoute.value.fullPath.split("/")[4];
      store.dispatch("setActiveFeedback", {
        feedback_id,
      });
      store.dispatch("setActiveTeamId", {
        team_id,
      });
    };

    setActiveFeedbackData();

    // What "Back" is clicked, user is navigated back to team page
    const navigateBack = () => {
      router.push({
        name: "feedback",
        params: {
          id: store.state.teams_active_data.id,
        },
      });
    };

    return { store, navigateBack };
  },
};
</script>

<style lang="scss" scoped>
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
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
    top: 20px;
    height: calc(100vh - 20px);
    width: 97.5vw;
    background: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 32px 80px;
    .content__left {
      display: flex;
      flex-direction: column;
      width: 40%;
      .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 0 24px;
        .back {
          display: flex;
          align-items: center;
          height: 24px;
          margin: 0 0 16px;
          .back__icon {
            height: 24px;
          }
          .back__text {
            height: 24px;
            display: flex;
            align-items: center;
            font-weight: 600;
            color: #3d52d5;
          }
        }
        .back:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        .title {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .description {
          color: #636c92;
        }
      }
      .image {
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
          background: #eeeff3;
          border-radius: 5px;
          height: 350px;
          width: 100%;
        }
      }
    }
    .content__right {
      width: 60%;
    }
  }
}
</style>
