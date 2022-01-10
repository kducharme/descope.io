<template>
  <div v-if="store.state.launches.length > 0" class="launches">
    <router-link
      class="launches__link"
      :to="{ name: 'overview', params: { id: launch.uniqueId },}"
      v-for="launch in store.state.launches"
      :key="launch.uniqueId"
    >
      <img src="../../assets/images/launch.svg" class="launch__img" />
      <p class="launch__text">{{ launch.name }}</p>
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
import store from "../../store/index";

export default {
  name: "TheLaunchList",
  setup() {
    // Setup variables and data
    const launches = ref(null);

    // Get data from store
    const getData = async () => {
      store.dispatch("getLaunches");
      launches.value = store.state.launches;

      await launches.value.sort();
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
    }
    .launch__img {
      width: 14px;
      margin-right: 8px;
    }
  }
  .launchList__link:hover {
    background: #1e1f2191;
    cursor: pointer;
  }
}
.router-link-active {
  // font-weight: 600;
  color: white;
  background: #414346;
}
</style>
