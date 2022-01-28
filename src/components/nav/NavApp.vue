<template>
  <header>
    <nav class="nav">
      <TheCreateTeamModal v-if="store.state.createTeamModal" />
      <div class="nav__top">
        <div class="logo" @click="navigateHome">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 13.33 2.26 14.61 2.74 15.77L7.35 11.15C7.72 10.78 8.3 10.76 8.7 11.09L11.3 13.28L14.58 10H14C13.45 10 13 9.55 13 9C13 8.45 13.45 8 14 8H17C17.55 8 18 8.45 18 9V12C18 12.55 17.55 13 17 13C16.45 13 16 12.55 16 12V11.42L12.06 15.35C11.69 15.72 11.1 15.74 10.71 15.4L8.12 13.21L3.72 17.61C5.52 20.26 8.56 22 12 22H20C21.1 22 22 21.1 22 20V12Z"
              fill="#3D52D5"
              border="#cd1231"
            />
          </svg>

          <p class="logo__text">descope</p>
        </div>

        <div class="links">
          <router-link class="nav__link" :to="{ name: 'home' }"
            >Overview</router-link
          >
          <router-link class="nav__link" :to="{ name: 'debt' }"
            >Debt</router-link
          >
          <div class="title">
            <p class="title__text">Teams</p>
            <div class="title__action" @click="showCreateTeamModal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22px"
                viewBox="0 0 24 24"
                width="22px"
                fill="#636C92"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
          </div>
          <TheTeamList />
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
import TheTeamList from "./TheTeamList.vue";
// import BaseButton from "../global/BaseButton.vue";
import TheCreateTeamModal from "../single/TheCreateTeamModal.vue";
import store from "../../store/index";

export default {
  components: {
    TheTeamList,
    // BaseButton,
    TheCreateTeamModal,
  },
  data() {
    return {
      priority: "Primary",
      text: "Create project",
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

    // Displays create team modal

    const showCreateTeamModal = () => {
      store.dispatch("showCreateTeamModal");
    };

    return { store, logout, navigateHome, showCreateTeamModal };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
  padding: 16px;
  width: 240px;
  background: #eeeff3;
  .nav__top {
    width: 100%;
    .logo {
      display: flex;
      align-items: center;
      .logo__text {
        margin-left: 6px;
        font-weight: 600;
        font-size: 17px;
        letter-spacing: 0.3px;
        color: #3549c5;
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
      margin: 16px 0 0;
      width: 100%;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 8px -16px;
        padding: 8px 8px 0px 24px;
        .title__text {
          font-size: 12px;
          font-weight: 500;
          color: #6c849e;
        }
        .title__action {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 26px;
          height: 26px;
          // border: 2px solid #3d52d5;
          border-radius: 5px;
        }
        .title__action:hover {
          cursor: pointer;
          // border: 2px solid #3549c5;
          background: #dbdde6;
        }
      }
      .nav__link {
        margin: 0 0 0 -16px;
        padding: 10px 8px 10px 24px;
      }
      .router-link-active,
      .router-link-exact-active {
        font-weight: 500;
        background: #dbdde6;
        border-left: 3px solid #3d52d5;
      }
    }
  }
  .nav__bottom {
    border-top: 1px solid #dbdde6;
    width: 100%;
    padding: 16px 0 8px;
    .nav__link--logout:hover {
      cursor: pointer;
    }
  }
}
</style>
