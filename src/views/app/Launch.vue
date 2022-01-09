<template>
  <div class="launch" v-if="store.state.appReady">
    <Subnav :name="launch.name" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../../store/index";
import Subnav from "../../components/nav/Subnav.vue";

export default {
  name: "Launch",
  components: {
    Subnav,
  },
  setup() {
    // Setup ref to router
    const router = useRouter();

    // Create data
    const launchId = router.currentRoute.value.fullPath.split("/").pop();
    const launch = ref([]);
    const dataLoaded = ref(null);

    // Get data
    const getData = async () => {
      // TODO - need to refactor this
      await store.dispatch("getLaunches");

      await store.state.launches.forEach((l) => {
        if (l.uniqueId === launchId) {
          dataLoaded.value = true;
          launch.value = l;
        }
      });
    };

    // Run get data function
    getData();

    return { launch, dataLoaded, store };
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
</style>
