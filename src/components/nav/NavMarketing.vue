<template>
  <header>

    <!-- Marketing Navigation (User is Not Registered) -->
    <nav class="nav">
      <div class="nav__left">
        <router-link class="nav__logo" :to="{ name: 'Welcome' }">
          <img
            src="../../assets/images/launch__purple.svg"
            class="logo__img"
          />
          <p class="logo__text">LaunchDocs</p>
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

  </header>
</template>

<script>
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";
import store from "../../store/index";
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

    // Create new draft launch
    const createLaunch = () => {
      console.log('hi');
    }

    return { logout, user, createLaunch };
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
  background: #121315;
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
      .logo__img {
        margin-right: 8px;
        width: 22px;
      }
      .logo__text {
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
  color: #646ECB;
  
}
</style>
