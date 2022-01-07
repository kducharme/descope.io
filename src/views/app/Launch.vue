<template>
  <div v-if="dataLoaded" class="launch" :key="data.uniqueId">
    <div class="doc">
      {{ data.name }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";
import store from "../../store/index";

export default {
  name: "Launch",
  components: {
    // LaunchDocBody,
    // LaunchDocName
  },
  setup() {
    // Setup ref to router
    const router = useRouter();

    // Create data
    const launchId = router.currentRoute.value.fullPath.split("/").pop();
    const data = ref([]);
    const dataLoaded = ref(null);

    // Get data
    const getData = async () => {
      const { data: launch } = await supabase
        .from("launches")
        .select("*")
        .eq("uniqueId", launchId);

      data.value = launch[0];
      dataLoaded.value = true;
    };

    // Run get data function
    getData();

    console.log('loaded')

    return { data, dataLoaded, store };
  },
};
</script>

<style lang="scss" scoped>
.launch {
  width: calc(100vw - 260px);
  height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0 0;
  .doc {
    height: 100%;
    width: 80vw;
    padding: 32px;
  }
}
</style>
