<template>
  <header>
    <nav class="nav">
      <div class="nav__left">
        <p>Logo here</p>
      </div>
      <div class="nav__right">

        <!-- Inactive User Navigation -->
        <router-link class="nav__link" :to="{ name: 'Home' }" v-if="!user">Home</router-link>
        <router-link class="nav__link" :to="{ name: 'Register' }" v-if="!user"
          >Create</router-link
        >
        <router-link class="nav__link" :to="{ name: 'Login' }" v-if="!user"
          >Login</router-link
        >
        <!-- Active User Navigation -->
        <router-link class="nav__link" :to="{ name: 'Dashboard' }" v-if="user">Dashboard</router-link>
        <section @click="logout" v-if="user">Logout</section>
      </div>
    </nav>
  </header>
</template>

<script>
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
import store from "../store/index"
import { computed } from "vue"

export default {
  setup() {
    // Get user from store
    const user = computed(() => store.state.user);
    

    // Setup ref to router
    const router = useRouter();

    // Logout function
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: 'Home' })
    }

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
}
</style>
