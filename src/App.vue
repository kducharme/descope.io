<template>
  <div v-if="store.state.appReady" id="appContent">
    <component :is="modal"></component>
    <component :is="nav"></component>
    <router-view :key="$route" />
  </div>
</template>

<script>
import TheOnboardingModal from "./components/single/TheOnboardingModal.vue";
import NavApp from "./components/nav/NavApp.vue";
import NavMarketing from "./components/nav/NavMarketing.vue";
import Subnav from "./components/nav/Subnav.vue";
import { supabase } from "./supabase/init";
import store from "./store/index";
import { shallowRef } from "vue";

export default {
  components: {
    NavApp,
    NavMarketing,
    Subnav,
    TheOnboardingModal,
  },
  setup() {
    // Create data
    const modal = shallowRef(null);
    const nav = shallowRef(null);

    // Set active user
    const user = supabase.auth.user();

    // Configures the nav component
    if (user) {
      nav.value = NavApp;
    }
    if (!user) {
      nav.value = NavMarketing;
    }

    // Runs when there is a auth state change
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        nav.value = NavApp;
        document.querySelector("#appContent").classList.add("app");
        document.querySelector("#appContent").classList.remove("marketing");

        // Get active user
        store.dispatch("setActiveUser", {
          session,
        });

        // Set active user profile
        store.dispatch("setActiveUserProfile", {
          session,
        });

        // Check if the user has been onboarded
        checkOnboardedStatus(session);
      }
      if (!session) {
        nav.value = NavMarketing;
        document.querySelector("#appContent").classList.remove("app");
        document.querySelector("#appContent").classList.add("marketing");
        store.dispatch("resetState");
      }
    });

    const checkOnboardedStatus = async (session) => {
      // TODO - check if profile exists - then, if it does, check if onboarded
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!profile) {
        modal.value = TheOnboardingModal;
      }
      if (profile) {
        modal.value = null;
      }
    };

    return { store, modal, nav };
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
div,
input,
textarea,
select,
select option {
  color: #212430;
  font-family: "Avenir Next";
  font-size: 14px;
  margin: 0;
}

a {
  text-decoration: none;
}

input {
  border: 2px solid #DBDDE6;
  background: white;
  padding: 8px;
}

div,
span,
section,
article,
nav {
  box-sizing: border-box;
}

body {
  background: white;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-direction: row;
}

.marketing {
  display: flex;
  flex-direction: column;
}
</style>
