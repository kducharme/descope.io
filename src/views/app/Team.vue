<template>
  <div class="launch" v-if="store.state.teams_active_data">
    <nav class="subnav">
      <div class="top">
        <div class="top__left">
          <h2 class="title">{{ store.state.teams_active_data.name }}</h2>
        </div>
        <div class="top__right">
          <div class="members">
            <div class="members__names" v-for="member in store.state.teams_active_data.members" :key="member">
              {{ member }}
            </div>
          </div>
          <BaseButton
            type="submit"
            :priority="secondary_priority"
            :text="secondary_text"
            class="subnav__button"
          />
          <BaseButton
            type="submit"
            :priority="primary_priority"
            :text="primary_text"
            class="subnav__button"
          />
        </div>
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
import BaseButton from "../../components/global/BaseButton.vue";


export default {
  name: "Team",
  components: {
    BaseButton
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
  padding: 8px 24px 0;
  border-bottom: 1px solid #eeeff3;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 8px;
    padding: 8px 0;
    .title {
      font-size: 20px;
      font-weight: 600;
    }
    .top__right {
      display: flex;
      flex-direction: row;
      .subnav__button {
        margin-left: 16px;
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
      border-bottom: 2px solid #3d52d5;
      border-radius: 2px;
    }
  }
}
</style>
