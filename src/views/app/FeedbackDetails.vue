<template>
  <div class="feedback" v-if="store.state.feedback_active">
    <div class="feedback__bg" @click="closeModal"></div>
    <div class="feedback__content">
      <div class="content__top">
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
          <p class="back__text">Back</p>
        </div>
      </div>
      <div class="content__bottom">
        <div class="content__bottom--left">
          <div class="fb__image" v-if="store.state.feedback_active._image">
            <img :src="store.state.feedback_active._image" />
          </div>
        </div>
        <div class="content__bottom--right">
            <p class="title"> {{ store.state.feedback_active.title }} </p>
        </div>
      </div>
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
  flex-direction: row;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 99999;
  .feedback__bg {
    width: 120px;
    background: #212430;
    opacity: 0.72;
  }
  .feedback__content {
    width: calc(100vw - 120px);
    background: #eeeff3;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    padding: 24px;
    // padding: 24px;
    .content__top {
      .back {
        display: flex;
        align-items: center;
        margin: 0 0 8px -8px;
        height: 24px;
        .back__icon {
          height: 16px;
        }
        .back__text {
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
    }
    .content__bottom {
      display: flex;
      flex-direction: row;
      .content__bottom--left {
          width: 30%;
          img {
              width: 200px;
          }
      }
      .content__bottom--right {
          width: 70%;
      }
    }
  }
}
</style>
