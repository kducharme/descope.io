<template>
  <div v-if="dataLoaded" class="launches">
    <router-link
      class="launches__link"
      :to="{ name: 'Launch', params: { launchId: launch.uniqueId } }"
      v-for="(launch) in data"
      :key="launch.uniqueId"
    >
      {{ launch.name }}</router-link
    >
  </div>
</template>
<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";

export default {
  name: "TheLaunchList",
  setup() {
    // Create data
    const data = ref([]);
    const dataLoaded = ref(null);

    // Setup ref to router
    const router = useRouter();

    // Get data
    const getData = async () => {
      const { data: launch } = await supabase
        .from("launches")
        .select("*")
        .eq("active", true);

      data.value = launch;
      dataLoaded.value = true;
    };

    // Run get data function
    getData();

    // Route user to launch view
    const displayLaunch = (launch) => {
      router.push({ name: "Launch", params: { launchId: launch.uniqueId } });
    };

    return { data, dataLoaded, displayLaunch };
  },
};
</script>

<style lang="scss" scoped>
.launches {
  display: flex;
  flex-direction: column;
  .launches__link {
    margin: 0 0 0 -16px;
    padding: 8px 8px 8px 24px;
  }
  .launchList__link:hover {
    background: #1e1f2191;
    cursor: pointer;
  }
}
.router-link-active {
  font-weight: 600;
  color: white;
  background: #1e1f21;
}
</style>
