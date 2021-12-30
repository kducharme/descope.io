<template>
  <div v-if="dataLoaded" class="launch">
    <div class="doc">
      <LaunchDocName :name="this.data.name" />
      <LaunchDocBody :body="this.data.content" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";
import LaunchDocBody from "./LaunchDocBody.vue";
import LaunchDocName from "./LaunchDocName.vue";

export default {
  name: "Launch",
  components: {
    LaunchDocBody,
    LaunchDocName
  },
  setup() {
    // Setup ref to router
    const router = useRouter();

    // Create data
    const launchId = router.currentRoute.value.fullPath.split("/").pop();
    const data = ref([]);
    const dataLoaded = ref(null);

    console.log(launchId);

    // Get data
    const getData = async () => {
      const { data: launch } = await supabase
        .from("launches")
        .select("*")
        .eq("uniqueId", launchId);

      data.value = launch[0];
      dataLoaded.value = true;
      console.log(data.value);
    };

    // Run get data function
    getData();

    return { data, dataLoaded };
  },
};
</script>

<style lang="scss" scoped>
.launch {
  background: rgb(226, 226, 226);
  width: 100vw;
  height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0 0;
  .doc {
    background: white;
    height: 100%;
    width: 80vw;
    padding: 32px;
  }
}
</style>
