<template>
  <div v-if="appReady">
    <div class="marketing" v-if="!user">
      <NavMarketing />
      <router-view />
    </div>
    <div class="app" v-if="user">
      <div class="app__left">
        <NavApp v-if="user" />
      </div>
      <div class="app__right">
        <Subnav />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavApp from "./components/nav/NavApp.vue";
import NavMarketing from "./components/nav/NavMarketing.vue";
import Subnav from "./components/nav/Subnav.vue";
import { ref } from "vue";
import { supabase } from "./supabase/init";
import store from "./store/index";
import { computed } from "vue";

export default {
  components: {
    NavApp,
    NavMarketing,
    Subnav,
  },
  setup() {
    // Create data / vars
    const appReady = ref(null);

    // Get user from store
    const user = computed(() => store.state.user);

    // Check to see if user is already logged in
    const loggedUser = supabase.auth.user();

    // If user does not exist, need to make app ready
    if (!loggedUser) {
      appReady.value = true;
    }

    // Runs when there is a auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    });

    return { appReady, user, loggedUser };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");

body,
h1,
h2,
h3,
p,
a,
button {
  color: white;
  font-family: "Avenir";
  font-size: 14px;
}

body {
  background: #1E1F21;
}

.app {
  display: flex;
  flex-direction: row;
}
</style>
