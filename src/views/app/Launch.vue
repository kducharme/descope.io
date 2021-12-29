<template>
  <div v-if="dataLoaded">hello</div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";

export default {
  name: "Launch",
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
        .eq('uniqueId', launchId);

      data.value = launch[0];
      dataLoaded.value = true;
      console.log(data.value)
    };

    // Run get data function
    getData();

    return { data, dataLoaded};
  },
};
</script>
