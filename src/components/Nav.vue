<template>
  <header>
    <NavUnregistered v-if="!user" />
    <NavRegistered v-if="user" />
  </header>
</template>

<script>
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
import store from "../store/index";
import { computed } from "vue";
import NavUnregistered from "./NavUnregistered";
import NavRegistered from "./NavRegistered";

export default {
  components: { NavRegistered, NavUnregistered },
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
