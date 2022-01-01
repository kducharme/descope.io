<template>
  <header>
    <nav class="nav">
      <div class="nav__top">
        <div class="logo" @click="navigateHome">
          <img src="../../assets/images/launch__purple.svg" class="logo__img" />
          <p class="logo__text">LaunchDocs</p>
        </div>
        <div class="actions">
          <BaseButton
            :priority="priority"
            :text="text"
            :action="showCreateModal"
            class="actions__create"
          />
          <TheCreateLaunchModal v-if="showCreateLaunchModal" />
        </div>

        <div class="links">
          <router-link class="nav__link" :to="{ name: 'Home' }"
            >Home</router-link
          >
          <router-link class="nav__link" :to="{ name: 'LaunchHistory' }"
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
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";
import TheLaunchList from "./TheLaunchList.vue";
import BaseButton from "../global/BaseButton.vue";
import TheCreateLaunchModal from "../single/TheCreateLaunchModal.vue";

export default {
  components: {
    TheLaunchList,
    BaseButton,
    TheCreateLaunchModal,
  },
  data() {
    return {
      priority: "Primary",
      text: "New launch"
    };
  },
  setup() {

    // Create data
    const showCreateLaunchModal = ref(null);

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

    return { logout, navigateHome, showCreateLaunchModal };
  },
  methods: {
    showCreateModal() {
      console.log("woo");
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
  width: 260px;
  background: #252628;
  padding: 16px;
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
        opacity: 0.7;
        margin: 16px 0 8px -16px;
        padding: 8px 8px 4px 24px;
      }
      .nav__link {
        // width: 100%;
        margin: 0 0 0 -16px;
        padding: 8px 8px 8px 24px;
      }
      .router-link-active {
        font-weight: 600;
        color: white;
        background: #1e1f21;
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
