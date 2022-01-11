<template>
  <header>
    <nav class="nav">
      <TheCreateLaunchModal v-if="store.state.createModal" />
      <div class="nav__top">
        <div class="logo" @click="navigateHome">
          <svg
            class="logo__img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 14.9999C5.17 14.9999 4.42 15.3399 3.88 15.8799C2.7 17.0599 2 21.9999 2 21.9999C2 21.9999 6.94 21.2999 8.12 20.1199C8.66 19.5799 9 18.8299 9 17.9999C9 16.3399 7.66 14.9999 6 14.9999ZM6.71 18.7099C6.43 18.9899 4.54 19.4699 4.54 19.4699C4.54 19.4699 5.01 17.5899 5.3 17.2999C5.47 17.1099 5.72 16.9999 6 16.9999C6.55 16.9999 7 17.4499 7 17.9999C7 18.2799 6.89 18.5299 6.71 18.7099ZM17.42 13.6499C23.78 7.28993 21.66 2.33993 21.66 2.33993C21.66 2.33993 16.71 0.219933 10.35 6.57993L7.86 6.07993C7.21 5.94993 6.53 6.15993 6.05 6.62993L2 10.6899L7 12.8299L11.17 16.9999L13.31 21.9999L17.36 17.9499C17.83 17.4799 18.04 16.7999 17.91 16.1399L17.42 13.6499ZM7.41 10.8299L5.5 10.0099L7.47 8.03993L8.91 8.32993C8.34 9.15993 7.83 10.0299 7.41 10.8299ZM13.99 18.4999L13.17 16.5899C13.97 16.1699 14.84 15.6599 15.66 15.0899L15.95 16.5299L13.99 18.4999ZM16 12.2399C14.68 13.5599 12.62 14.6399 11.96 14.9699L9.03 12.0399C9.35 11.3899 10.43 9.32993 11.76 7.99993C16.44 3.31993 19.99 4.00993 19.99 4.00993C19.99 4.00993 20.68 7.55993 16 12.2399ZM15 10.9999C16.1 10.9999 17 10.0999 17 8.99993C17 7.89993 16.1 6.99993 15 6.99993C13.9 6.99993 13 7.89993 13 8.99993C13 10.0999 13.9 10.9999 15 10.9999Z"
              fill="#3D52D5"
            />
          </svg>

          <p class="logo__text">LaunchDocs</p>
        </div>
        <div class="actions">
          <BaseButton
            :priority="priority"
            :text="text"
            :action="showCreateModal"
            class="actions__create"
          />
        </div>

        <div class="links">
          <router-link class="nav__link" :to="{ name: 'home' }"
            >Home</router-link
          >
          <router-link class="nav__link" :to="{ name: 'archive' }"
            >Archive</router-link
          >
          <p class="links__title">Launches</p>
          <TheLaunchList />
        </div>
      </div>

      <!-- User settings  -->
      <div class="nav__bottom">
        <section @click="logout" class="nav__link--logout">Logout</section>
      </div>
    </nav>
  </header>
</template>

<script>
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";
import TheLaunchList from "./TheLaunchList.vue";
import BaseButton from "../global/BaseButton.vue";
import TheCreateLaunchModal from "../single/TheCreateLaunchModal.vue";
import store from "../../store/index";

export default {
  components: {
    TheLaunchList,
    BaseButton,
    TheCreateLaunchModal,
  },
  data() {
    return {
      priority: "Primary",
      text: "New launch",
      showCreateLaunchModal: false,
    };
  },
  setup() {
    // Setup ref to router
    const router = useRouter();

    // Logout function
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Welcome" });
    };

    // Navigate home function (when user clicks on logo)
    const navigateHome = () => {
      router.push({ name: "Home" });
    };

    return { store, logout, navigateHome };
  },
  methods: {
    showCreateModal() {
      store.dispatch("showCreateLaunchModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
  padding: 16px;
  width: 240px;
  background: #252628;
  .nav__top {
    width: 100%;
    .logo {
      display: flex;
      align-items: center;
      padding: 0 8px;
      .logo__img {
        margin-right: 8px;
        width: 22px;
      }
      .logo__text {
        font-weight: 800;
        font-size: 16px;
      }
    }
    .actions {
      display: flex;
      flex-direction: column;
      width: 100%;
      .actions__create {
        margin-top: 20px;
      }
    }
    .links {
      display: flex;
      flex-direction: column;
      margin: 20px 0 0;
      width: 100%;
      .links__title {
        font-size: 12px;
        margin: 16px 0 8px -16px;
        padding: 8px 8px 4px 24px;
      }
      .nav__link {
        margin: 0 0 0 -16px;
        padding: 10px 8px 10px 24px;
      }
      .router-link-active, .router-link-exact-active {
        color: white;
        background: #414346;
      }
    }
  }
  .nav__bottom {
    border-top: 0.5px solid #e2e2e25f;
    width: 100%;
    padding: 16px 0 8px;
    .nav__link--logout:hover {
      cursor: pointer;
    }
  }
}
</style>
