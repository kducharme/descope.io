<template>
  <div v-if="store.state.appReady">
    <div class="marketing" v-if="!store.state.activeUser">
      <NavMarketing />
      <router-view />
    </div>
    <div class="app" v-if="store.state.activeUser">
      <TheOnboardingModal v-if="!store.state.onboarded" />
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
import TheOnboardingModal from "./components/single/TheOnboardingModal.vue";
import NavApp from "./components/nav/NavApp.vue";
import NavMarketing from "./components/nav/NavMarketing.vue";
import Subnav from "./components/nav/Subnav.vue";
import { supabase } from "./supabase/init";
import store from "./store/index";

export default {
  components: {
    NavApp,
    NavMarketing,
    Subnav,
    TheOnboardingModal,
  },
  setup() {
    // Runs when there is a auth state change
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        // Set the active user in Vuex store
        // Set the active user in Vuex store
        store.dispatch("setActiveUser", {
          session,
        });

        // Check if the user has been onboarded
        checkOnboardedStatus(session);
      }
      if (!session) {
        store.dispatch("resetActiveUser");
      }
    });

    const checkOnboardedStatus = async (session) => {

      // TODO - check if profile exists - then, if it does, check if onboarded
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      store.dispatch("setUserOnboardedStatus", {
        profile,
      });
    };

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
