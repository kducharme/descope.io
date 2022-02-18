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

    // Set teams
    store.dispatch("setTeams");

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

        store.dispatch("setOrganization", {
          session,
        });

        // Set active user profile
        store.dispatch("setActiveUserProfile", {
          session,
        });

        // Set teams
        store.dispatch("setTeams");

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

body {
  overflow-y: auto;
}
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
  border: 2px solid #dbdde6;
  background: white;
  padding: 8px;
}

div,
span,
section,
article,
nav,
input {
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
  // flex-direction: row;
}

.marketing {
  display: flex;
  flex-direction: column;
}

.noScroll {
  // height: 100%;
  overflow: hidden !important;
}

// Avatar colors

.C8E5F9 {
  background: #c8e5f9;
}

.FE938C {
  background: #fe938c;
}

.EDAF97 {
  background: #edaf97;
}

.F59CA9 {
  background: #f59ca9;
}

.B0CA87 {
  background: #b0ca87;
}

.D6FFB7 {
  background: #d6ffb7;
}

.F0C987 {
  background: #f0c987;
}

.F6EFA6 {
  background: #f6efa6;
}

.FFC49B {
  background: #ffc49b;
}
</style>
