<template>
  <div class="modal">
    <div class="modal__bg" @click="closeModal"></div>

    <div class="modal__content">
      <!-- Status Messages -->
      <div v-if="errorMsg || statusMsg" class="message">
        <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      </div>

      <!-- Create Launch Form -->
      <div class="header">
        <h1 class="header__title">Create new team</h1>
        <div class="header__close" @click="closeModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#212430"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
            />
          </svg>
        </div>
      </div>
      <form @submit.prevent="createTeam" class="form">
        <div class="form__input">
          <label for="teamName">Team name *</label>
          <input type="text" required id="teamName" v-model="teamName" />
        </div>
        <div class="form__input">
          <label for="teamDescription"
            >Team mission<span class="optional">(optional)</span></label
          >
          <textarea
            type="textarea"
            id="teamDescription"
            v-model="teamDescription"
            rows="3"
            cols="50"
          />
        </div>
        <BaseButton
          type="submit"
          :priority="priority"
          :text="text"
          class="form__button"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";
import BaseButton from "../global/BaseButton.vue";
import store from "../../store/index";

export default {
  name: "TheCreateTeamModal",
  components: {
    BaseButton,
  },
  data() {
    return {
      priority: "Primary",
      text: "Create team",
    };
  },
  setup() {
    // Create data
    const router = useRouter();
    const teamName = ref(null);
    const teamDescription = ref(null);
    const errorMsg = ref(null);

    // Closes modal when the background or "x" button  is clicked
    const closeModal = () => {
      store.dispatch("hideCreateTeamModal");
    };

    // Creates a new launch in the db when the form is submitted
    const createTeam = async () => {
      // TODO - check if a team already exists with that name
      try {
        const { data, error } = await supabase.from("teams").insert([
          {
            name: teamName.value,
            description: teamDescription.value,
            members: [`${store.state.activeUser.id}`],
            created_by: store.state.activeUser.id,
            organization_id: store.state.organization,
          },
        ]);
        if (error) throw error;
        await store.dispatch("setTeams");
        routeToTeam(data);
        store.dispatch("hideCreateTeamModal");
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Route user to team view
    const routeToTeam = (data) => {
      router.push({ name: "team", params: { id: data[0].id } });
    };
    return {
      createTeam,
      teamName,
      teamDescription,
      errorMsg,
      closeModal,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .modal__bg {
    width: calc(100vw - 480px);
    background: #212430;
    opacity: 0.72;
  }
  .modal__content {
    width: 480px;
    background: #eeeff3;
    // padding: 24px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      padding: 24px;
      border-bottom: 1px solid #dbdde6;
      .header__title {
        font-size: 20px;
        font-weight: 600;
        // margin: 0 0 8px;
      }
      .header__close {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
          border-radius: 100%;
      }
      .header__close:hover {
          background: #eeeff3;
          cursor: pointer;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      padding: 24px;
      .form__input {
        display: flex;
        flex-direction: column;
        margin: 12px 0;
        label {
          font-size: 12px;
          font-weight: 600;
          color: #7c83a2;
          padding: 0 0 6px;
        }
        .optional {
          color: #9ba1bb;
          font-weight: 400;
          margin-left: 4px;
        }
        input,
        textarea {
          background: white;
          border: 2px solid #dbdde6;
          padding: 8px;
          resize: none;
        }
        .form__select {
          border: 2px solid #dbdde6;
          background: white;
          padding: 8px;
        }
      }
      .form__button {
        margin: 20px 0 0;
        max-width: 132px;
        height: 44px;
      }
    }
  }
}
</style>