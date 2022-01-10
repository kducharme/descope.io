<template>
  <div class="launch" v-if="store.state.activeLaunch">
    <nav class="subnav">
      <div class="top">
        <h2 class="title">{{ store.state.activeLaunch.launch.name }}</h2>
      </div>
      <div class="bottom"></div>
      <router-link class="nav__link" :to="{ name: 'overview' }"
        >Overview</router-link
      >
      <router-link class="nav__link" :to="{ name: 'requirements' }"
        >Requirements</router-link
      >
      <router-view />
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../../store/index";

export default {
  name: "Launch",
  components: {},
  setup() {
    // Setup ref to router
    const router = useRouter();

    // Create data
    const launchId = router.currentRoute.value.fullPath.split("/")[2];
    const launch = ref([]);
    const dataLoaded = ref(null);

    // Get data
    const getData = async () => {
      // TODO - need to refactor this
      await store.dispatch("getLaunches");

      await store.state.launches.forEach((launch) => {
        if (launch.uniqueId === launchId) {
          dataLoaded.value = true;
          launch.value = launch;
          store.dispatch("setActiveLaunch", {
            launch,
          });
        }
      });
    };

    getData();
    // // Run get data function
    // if (launchId.value !== store.state.activeLaunch.uniqueId) {
    // }

    return { launch, dataLoaded, store, launchId };
  },
};
</script>

<style lang="scss" scoped>
.launch {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: calc(100vw - 260px);
  // height: calc(100vh - 72px);
  // margin: 0;
}

.nav__link {
  margin: 0 12px;
}

.router-link-active {
  color: white;
  font-weight: 600;
  border-bottom: 1px solid white;
}
</style>
