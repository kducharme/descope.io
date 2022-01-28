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
        <h1 class="title">Create team</h1>
      </div>
      <form @submit.prevent="createTeam" class="form">
        <div class="form__input">
          <label for="teamName">Team name</label>
          <input type="text" required id="teamName" v-model="teamName" />
        </div>
        <div class="form__input">
          <label for="teamDescription">Description</label>
          <textarea
            type="textarea"
            required
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
  name: "TheCreateLaunchModal",
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
    width: calc(100vw - 540px);
    background: #212430;
    opacity: 0.5;
  }
  .modal__content {
    width: 540px;
    background: white;
    padding: 24px;
    .header {
      display: flex;
      // background: #eeeff3;
      // border-bottom: 1px solid #CFD2DE;
      .title {
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 8px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
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
        input,
        textarea {
          background: white;
          border: 2px solid #eeeff3;
          padding: 8px;
          resize: none;
        }
        .form__select {
          border: 2px solid #eeeff3;
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