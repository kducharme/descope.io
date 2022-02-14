<template>
  <div class="team" v-if="store.state.teams_active_data">
    <TheCreateFeedbackModal v-if="store.state.createFeedbackModal" />
    <TheCreateProjectModal v-if="store.state.createProjectModal" />
    <nav class="subnav">
      <div class="top">
        <div class="top__left">
          <h2 class="title">{{ store.state.teams_active_data.name }}</h2>
        </div>
        <div class="top__right">
          <div class="members">
            <div
              class="members__avatar"
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
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
          </div>
          <BaseButton
            type="submit"
            :priority="secondary_priority"
            :text="secondary_text"
            :action="showCreateProjectModal"
            class="subnav__button--secondary"
          />
          <BaseButton
            type="submit"
            :priority="primary_priority"
            :text="primary_text"
            :action="showCreateFeedbackModal"
            class="subnav__button--primary"
          />
        </div>
      </div>
      <div class="bottom">
        <router-link class="nav__link" :to="{ name: 'projects' }"
          >Projects</router-link
        >
        <router-link class="nav__link" :to="{ name: 'feedback' }"
          >Feedback</router-link
        >
        <router-link class="nav__link" :to="{ name: 'insights' }"
          >Insights</router-link
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
import { useRouter } from "vue-router";
import store from "../../store/index";
import BaseButton from "../../components/global/BaseButton.vue";
import TheCreateProjectModal from "../../components/single/TheCreateProjectModal.vue";
import TheCreateFeedbackModal from "../../components/single/TheCreateFeedbackModal.vue";

export default {
  name: "Team",
  components: {
    BaseButton,
    TheCreateProjectModal,
    TheCreateFeedbackModal,
  },
  data() {
    return {
      primary_priority: "Primary",
      primary_text: "Add feedback",
      secondary_priority: "Secondary",
      secondary_text: "Create project",
    };
  },
  setup() {
    // Setup ref to router
    const router = useRouter();



    store.dispatch("setTeams");

    // Get data
    // const getActiveTeamData = async () => {
    //   // TODO - need to refactor this


    const setActiveTeamId = async () => {
      const team_id = router.currentRoute.value.fullPath.split("/")[2];
      store.dispatch("setActiveTeamId", {
        team_id,
      });
      // await getActiveTeamData();
    };

    // TODO - ADD THIS FUNCTIONALITY
    const addMember = () => {
      console.log('add member')
    }

    setActiveTeamId();

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
  margin: 0 0 0 220px;
  width: 100%; 
  overflow-x: hidden;
  
}
// Subnav styling
.subnav {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 220px);
  padding: 8px 32px 0 24px;
  border-bottom: 1px solid #dbdde6;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 12px;
    padding: 8px 0;
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
      .members__avatar,
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
      border-bottom: 2px solid #3253E4;
      border-radius: 2px;
    }
  }
}

</style>
