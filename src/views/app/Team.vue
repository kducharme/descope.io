<template>
  <div class="launch" v-if="store.state.teams_active_data">
    <nav class="subnav">
      <div class="top">
        <h2 class="title">{{ store.state.teams_active_data.name }}</h2>
      </div>
      <div class="bottom">
        <router-link class="nav__link" :to="{ name: 'overview' }"
          >Overview</router-link
        >
        <router-link class="nav__link" :to="{ name: 'projects' }"
          >Projects</router-link
        >
        <router-link class="nav__link" :to="{ name: 'feedback' }"
          >Debt</router-link
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

export default {
  name: "Team",
  components: {},
  setup() {
    // Setup ref to router
    const router = useRouter();

    // Create data
    const dataLoaded = ref(null);
    const teamData = ref(null);

    store.dispatch("setTeams")

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
};
</script>

<style lang="scss" scoped>
.launch {
  margin: 0 0 0 240px;
}
// Subnav styling
.subnav {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 240px);
  padding: 0 24px;
  border-bottom: 1px solid #eeeff3;
  .top {
    display: flex;
    margin: 0 0 12px;
    .title {
      // height: 28px;
      font-size: 18px;
      font-weight: 600;
      margin: 16px 0 8px;
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
      border-bottom: 2px solid #3d52d5;
      border-radius: 2px;
    }
  }
}
</style>
