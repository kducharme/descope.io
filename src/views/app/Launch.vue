<template>
  <div class="launch" v-if="store.state.activeLaunch">
    <nav class="subnav">
      <div class="top">
        <h2 class="title">{{ store.state.activeLaunch.launch.name }}</h2>
      </div>
      <div class="bottom">
        <router-link class="nav__link" :to="{ name: 'overview' }"
          >Overview</router-link
        >
        <router-link class="nav__link" :to="{ name: 'requirements' }"
          >Requirements</router-link
        >
        <router-link class="nav__link" :to="{ name: 'feedback' }"
          >Feedback</router-link
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

    return { launch, dataLoaded, store, launchId };
  },
};
</script>

<style lang="scss" scoped>
// Subnav styling
.subnav {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 260px);
  padding: 0 24px;
  border-bottom: 0.5px solid #e2e2e25f;
  .top {
    display: flex;
    margin: 0 0 12px;
    .title {
      height: 24px;
      font-size: 16px;
      font-weight: 600;
      margin: 20px 0 8px;
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
      color: white;
      font-weight: 600;
      border-bottom: 1px solid white;
    }
  }
}
</style>
