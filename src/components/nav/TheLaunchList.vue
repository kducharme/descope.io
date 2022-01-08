<template>
  <div v-if="store.state.launches.length > 0" class="launches">
    <router-link
      class="launches__link"
      :to="{ name: 'Launch', params: { launchId: launch.uniqueId } }"
      v-for="launch in store.state.launches"
      :key="launch.uniqueId"
    >
      <img src="../../assets/images/launch.svg" class="launches__img" />
      <p>{{ launch.name }}</p>
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
// import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";
import store from "../../store/index";

export default {
  name: "TheLaunchList",
  setup() {
    
    // Setup variables and data
    const router = useRouter();
    const launches = ref(null);

    // Get data from store
    const getData = async () => {
      store.dispatch("getLaunches");
      launches.value = store.state.launches;

      await launches.value.sort();
    };

    // Run get data function
    getData();

    // Route user to launch view
    const displayLaunch = (launch) => {
      router.push({ name: "Launch", params: { launchId: launch.uniqueId } });
    };

    return { displayLaunch, store };
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
    padding: 8px 8px 8px 24px;
    .launches__img {
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
  font-weight: 600;
  color: white;
  background: #1e1f21;
}
</style>
