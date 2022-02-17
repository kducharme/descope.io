<template>
  <div v-if="store.state.teams" class="launches">
    <router-link
      class="launches__link"
      :to="{ name: 'team', params: { id: team.id } }"
      v-for="team in store.state.teams"
      :key="team.id"
    >
      <p class="launch__text">{{ team.name }}</p>
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
import store from "../../store/index";

export default {
  name: "TheTeamList",
  setup() {
    // Setup variables and data
    const teams = ref(null);

    // Get data from store
    const getData = async () => {
      teams.value = store.state.teams;
    };

    // Run get data function
    getData();

    return { store };
  },
};
</script>

<style lang="scss" scoped>
.launches {
  display: flex;
  flex-direction: column;
  .launches__link {
    display: flex;
    margin: 0 0 0 -16px;
    padding: 10px 8px 10px 24px;
    .launch__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      color: white;
    }
    .launch__img {
      width: 18px;
      margin-right: 4px;
      // opacity: 0.35;
    }
  }
  .launchList__link:hover {
    background: #1e1f2191;
    cursor: pointer;
  }
}
.router-link-active {
  font-weight: 500;
  background: #313649;
}
</style>
