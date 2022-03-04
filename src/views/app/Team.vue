<template>
  <div class="team" v-if="store.state.teams_active">
    <TheCreateFeedbackModal v-if="store.state.createIssueModal" />
    <TheCreateProjectModal v-if="store.state.createProjectModal" />
    <TheCreateRequestModal v-if="store.state.createRequestModal" />
    <TheCreateQuestionModal v-if="store.state.createQuestionModal" />
    <TheCreateLaunchModal v-if="store.state.createLaunchModal" />
    <nav class="subnav">
      <div class="top">
        <div class="top__left">
          <h2 class="title">{{ store.state.teams_active.name }}</h2>
        </div>
        <div class="top__right">
          <div class="members">
            <div
              :class="['members__avatar', member.color]"
              v-for="member in store.state.teams_active_members"
              :key="member.id"
            >
              {{ member._initials }}
            </div>
            <div class="members__add" @click="addMember">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22px"
                viewBox="0 0 24 24"
                width="22px"
                fill="#fff"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
          </div>
          <!-- <div class="subnav__button--secondary">
            <BaseButtonText
              type="submit"
              :priority="secondary_priority"
              :text="secondary_text"
              :action="addMember"
            />
          </div> -->
          <div class="subnav__button--primary">
            <BaseButtonIcon
              type="submit"
              :priority="primary_priority"
              :text="primary_text"
              :action="showCreateFeedbackModal"
              :tooltip="primary_tooltip"
              :tooltip_status="true"
              :tooltip_position="primary_tooltip_position"
            />
          </div>
        </div>
      </div>
      <div class="bottom">
        <router-link class="nav__link" :to="{ name: 'feedback' }"
          >Feedback</router-link
        >
        <router-link class="nav__link" :to="{ name: 'projects' }"
          >Projects</router-link
        >
        <router-link class="nav__link" :to="{ name: 'launches' }"
          >Launches</router-link
        >
        <router-link class="nav__link" :to="{ name: 'teamSettings' }"
          >Settings</router-link
        >
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
// import { ref } from "vue";
// import { useRouter } from "vue-router";
import store from "../../store/index";
// import BaseButtonText from "../../components/global/Base_Button_Text.vue";
import BaseButtonIcon from "../../components/global/Base_Button_Add.vue";
import TheCreateProjectModal from "../../components/single/The_Create_Project.vue";
import TheCreateFeedbackModal from "../../components/single/The_Create_Issue.vue";
import TheCreateRequestModal from "../../components/single/The_Create_Request.vue";
import TheCreateQuestionModal from "../../components/single/The_Create_Question.vue";
import TheCreateLaunchModal from "../../components/single/The_Create_Launch.vue";

export default {
  name: "Team",
  components: {
    // BaseButtonText,
    BaseButtonIcon,
    TheCreateProjectModal,
    TheCreateFeedbackModal,
    TheCreateRequestModal,
    TheCreateQuestionModal,
    TheCreateLaunchModal,
  },
  data() {
    return {
      primary_priority: "Primary",
      primary_text: "Add feedback",
      // primary_tooltip: "Add new project, feedback, etc.",
      // primary_tooltip_position: "is-left",
    };
  },
  setup() {
    store.dispatch("setActiveTeamData");

    // TODO - ADD THIS FUNCTIONALITY
    const addMember = () => {
      console.log("add member");
    };

    return { store, addMember };
  },
  methods: {
    showCreateProjectModal() {
      store.dispatch("showCreateProjectModal");
    },
    showCreateFeedbackModal() {
      store.dispatch("showCreateFeedbackModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.team {
  margin: 0 0 0 200px;
  width: 100%;
  overflow-x: hidden;
}
// Subnav styling
.subnav {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 200px);
  padding: 8px 32px 0 24px;
  border-bottom: 1px solid #dbdde6;
  // margin: 0 24px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 12px;
    padding: 8px 0;
    .top__left {
      display: flex;
      .title {
        font-size: 20px;
        font-weight: 600;
        margin-right: 16px;
      }
    }
    .top__right {
      display: flex;
      flex-direction: row;
      .members {
        display: flex;
        align-items: center;
        .members__avatar {
          margin: -4px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
          border-radius: 100%;
          font-size: 11px;
          font-weight: 600;
          border: 2px solid white;
        }
        .members__add {
          margin: -4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          height: 32px;
          width: 32px;
          border-radius: 100%;
          font-size: 11px;
          font-weight: 600;
          border: 2px solid white;
          background: #9da5c4;
        }
        .members__add:hover {
          cursor: pointer;
          background: #9097b6;
        }
      }
      .subnav__button--primary {
        margin-left: 20px;
      }
      .subnav__button--secondary {
        margin-left: 20px;
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    .nav__link {
      margin: 0 14px;
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
</style>
