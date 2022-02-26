<template>
  <div class="project" v-if="store.state.projects_active">
    <nav class="subnav">
      <div class="top">
        <div class="top__left">
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
          <h2 class="title">{{ store.state.projects_active.name }}</h2>
        </div>
        <div class="top__right"></div>
      </div>
      <div class="bottom">
        <router-link class="nav__link" :to="{ name: 'projectFeedback' }"
          >Feedback</router-link
        >
        <router-link class="nav__link" :to="{ name: 'projectSettings' }"
          >Settings</router-link
        >
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import store from "../../store/index";

export default {
  name: "IndividualProject",
  components: {},
  setup() {
    // Create data / vars
    const router = useRouter();

    // What "Back" is clicked, user is navigated back to team page
    const navigateBack = () => {
      router.push({
        name: "projects",
        params: { id: store.state.teams_active.id },
      });
    };

    return { store, navigateBack };
  },
};
</script>

<style lang="scss" scoped>
.project {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: 99999;
  background: #eeeff3;
  .subnav {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 220px);
    padding: 8px 24px 0;
    border-bottom: 1px solid #dbdde6;
    background: white;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 24px;
      padding: 8px 0;
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
      .title {
        font-size: 20px;
        font-weight: 600;
      }
      .top__right {
        display: flex;
        flex-direction: row;
        .subnav__button--primary {
          margin-left: 16px;
        }
        .subnav__button--secondary {
          margin-left: 20px;
        }
      }
      .members {
        display: flex;
        align-items: center;
        .members__avatar {
          margin: -4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #7680a7;
          color: white;
          height: 36px;
          width: 36px;
          border-radius: 100%;
          font-size: 11px;
          font-weight: 600;
          border: 2px solid white;
        }
      }
    }
    .bottom {
      display: flex;
      flex-direction: row;
      .nav__link {
        margin: 0 12px;
        padding: 0 0 8px;
      }
      .nav__link:first-child {
        margin: 0 12px 0 0;
      }
      .router-link-active {
        font-weight: 600;
        border-bottom: 2px solid #3253e4;
        border-radius: 2px;
      }
    }
  }
}
</style>
