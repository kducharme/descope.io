<template>
  <div class="feedback" v-if="store.state.feedback_active">
    <div class="feedback__bg" @click="closeModal"></div>

    <div class="feedback__content">
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
      <h2 class="title">{{ store.state.feedback_active.title }}</h2>

      hello world
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
    const setActiveFeedbackId = async () => {
      const team_id = router.currentRoute.value.fullPath.split("/")[2];
      const feedback_id = router.currentRoute.value.fullPath.split("/")[4];
      store.dispatch("setActiveFeedbackData", {
        feedback_id,
      });
      store.dispatch("setActiveTeamId", {
        team_id,
      });
    };

    setActiveFeedbackId();

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
  padding: 24px;
  position: fixed;
  top: 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  //   height: calc(100vh - 24px);
  height: 100vh;
  width: 100vw;
  z-index: 99999;
  background: white;
  .back {
    display: flex;
    // align-items: center;
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
  .feedback__bg {
    width: 80px;
    background: #212430;
    opacity: 0.72;
  }
  .feedback__content {
    width: calc(100vw - 80px);
    background: #eeeff3;
    // padding: 24px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      padding: 24px;
      border-bottom: 1px solid #dbdde6;
      .header__title {
        font-size: 20px;
        font-weight: 600;
        // margin: 0 0 8px;
      }
      .header__close {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        width: 32px;
        border-radius: 100%;
      }
      .header__close:hover {
        background: #eeeff3;
        cursor: pointer;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      padding: 24px;
      .form__input {
        display: flex;
        flex-direction: column;
        margin: 12px 0;
        label {
          font-size: 12px;
          font-weight: 600;
          color: #7c83a2;
          padding: 0 0 6px;
        }
        .optional {
          color: #9ba1bb;
          font-weight: 400;
          margin-left: 4px;
        }
        input,
        textarea {
          background: white;
          border: 2px solid #dbdde6;
          padding: 8px;
          resize: none;
        }
        .form__select {
          border: 2px solid #dbdde6;
          background: white;
          padding: 8px;
        }
      }
      .form__button {
        margin: 20px 0 0;
        max-width: 132px;
        height: 44px;
      }
    }
  }
}
</style>
