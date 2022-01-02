<template>
  <div v-if="store.state.appReady">
    <div class="marketing" v-if="!store.state.activeUser">
      <NavMarketing />
      <router-view />
    </div>
    <div class="app" v-if="store.state.activeUser">
      <div class="app__left">
        <NavApp />
      </div>
      <div class="app__right">
        <Subnav />
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
import NavApp from "./components/nav/NavApp.vue";
import NavMarketing from "./components/nav/NavMarketing.vue";
import Subnav from "./components/nav/Subnav.vue";
// import { ref } from "vue";
import { supabase } from "./supabase/init";
import store from "./store/index";
// import { computed } from "vue";

export default {
  components: {
    NavApp,
    NavMarketing,
    Subnav,
  },
  setup() {
    // Runs when there is a auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        store.dispatch("setActiveUser", {
          session,
        });
      }
      if (!session) {
        store.dispatch("resetActiveUser");
      }
    });

    return { store };
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

input {
  color: #1e1f21;
}

body {
  background: #1e1f21;
}

.app {
  display: flex;
  flex-direction: row;
}
</style>
