<template>
  <header>

    <!-- Marketing Navigation (User is Not Registered) -->
    <nav class="nav" v-if="!user">
      <div class="nav__left">
        <router-link class="nav__logo" :to="{ name: 'Welcome' }">
          <img
            src="../assets/images/launch_logo.png"
            class="nav__logo--img"
          />
          <p class="nav__logo--text">LaunchList</p>
        </router-link>
        <router-link class="nav__link" :to="{ name: 'Welcome' }"
          >Home</router-link
        >
      </div>

      <div class="nav__right">
        <router-link class="nav__link" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <router-link
          class="nav__link nav__link--primary"
          :to="{ name: 'Signup' }"
          >Create account</router-link
        >
      </div>
    </nav>

    <!-- App Navigation (User is Registered) -->
    <nav class="nav" v-if="user">
      <div class="nav__left">
        <router-link class="nav__logo" :to="{ name: 'LaunchList' }">
          <img
            src="../assets/images/launch_logo.png"
            class="nav__logo--img"
          />
          <p class="nav__logo--text">LaunchList</p>
        </router-link>
      </div>

      <div class="nav__right">
        <router-link class="nav__link" :to="{ name: 'LaunchList' }" v-if="user"
          >Launches</router-link
        >
        <router-link
          class="nav__link nav__link--primary"
          :to="{ name: 'Launch' }"
          >Create new launch</router-link
        >
        <section @click="logout" v-if="user">Logout</section>
      </div>
    </nav>
  </header>
</template>

<script>
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
import store from "../store/index";
import { computed } from "vue";

export default {
  components: { },
  setup() {
    // Get user from store
    const user = computed(() => store.state.user);

    // Setup ref to router
    const router = useRouter();

    // Logout function
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Welcome" });
    };

    return { logout, user };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  height: 72px;
  padding: 0 24px;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
  background: white;
  .nav__left,
  .nav__right {
    display: flex;
    align-items: center;
    width: 50%;
  }
  .nav__right {
    justify-content: flex-end;
  }
  .nav__link {
    padding: 0 12px;
  }
  .nav__link--primary {
    padding: 8px 12px;
    background: blue;
    color: white;
    border: none;
    border-radius: 3px;
  }
  .nav__logo {
    display: flex;
    align-items: center;
    margin-right: 32px;
    .nav__logo--img {
      margin-right: 12px;
      height: 32px;
      width: 32px;
    }
    .nav__logo--text {
      font-weight: 800;
      font-size: 16px;
    }
  }
}

.router-link {
  font-size: 14px;
}

.router-link-active {
  font-weight: 600;
  color: blue;
}
</style>
