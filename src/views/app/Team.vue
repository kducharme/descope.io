<template>
  <div class="team" v-if="store.state.teams_active_data">
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
          </div>
          <BaseButton
            type="submit"
            :priority="secondary_priority"
            :text="secondary_text"
            class="subnav__button--secondary"
          />
          <BaseButton
            type="submit"
            :priority="primary_priority"
            :text="primary_text"
            :action="showCreateProjectModal"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../../store/index";
import BaseButton from "../../components/global/BaseButton.vue";
import TheCreateProjectModal from "../../components/single/TheCreateProjectModal.vue";

export default {
  name: "Team",
  components: {
    BaseButton,
    TheCreateProjectModal,
  },
  data() {
    return {
      primary_priority: "Primary",
      primary_text: "Create project",
      secondary_priority: "Secondary",
      secondary_text: "Actions",
    };
  },
  setup() {
    // Setup ref to router
    const router = useRouter();

    // Create data
    const dataLoaded = ref(null);
    const teamData = ref(null);

    store.dispatch("setTeams");

    // Get data
    const getActiveTeamData = async () => {
      // TODO - need to refactor this

      if (store.state.teams_active_data) {
        dataLoaded.value = true;
        teamData.value = store.state.teams_active;
      }
    };

    const setActiveTeamId = async () => {
      const team_id = router.currentRoute.value.fullPath.split("/")[2];
      store.dispatch("setActiveTeamId", {
        team_id,
      });
      await getActiveTeamData();
    };

    setActiveTeamId();

    return { dataLoaded, store, teamData };
  },
  methods: {
    showCreateProjectModal() {
      store.dispatch("showCreateProjectModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.team {
  margin: 0 0 0 220px;
}
// Subnav styling
.subnav {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 220px);
  padding: 8px 24px 0;
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
      margin: 0 14px;
      padding: 0 0 8px;
    }
    .nav__link:first-child {
      margin: 0 12px 0 0;
    }
    .router-link-active {
      font-weight: 600;
      border-bottom: 2px solid #ff6047;
      border-radius: 2px;
    }
  }
}
</style>
