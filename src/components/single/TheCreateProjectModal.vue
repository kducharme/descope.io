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
        <h1 class="title">Create new project</h1>
      </div>
      <form @submit.prevent="createProject" class="form">
        <div class="form__input">
          <label for="projectName">Name</label>
          <input type="text" required id="projectName" v-model="projectName" />
        </div>
        <div class="form__input">
          <label for="team">Team</label>
          <div class="form__select disabled" id="team">
            {{ store.state.teams_active_data.name }}
          </div>
        </div>
        <div class="form__input">
          <label for="owner">Owner</label>
          <div class="form__select" id="owner">
            {{ store.state.activeUser.email }}
          </div>
        </div>
        <div class="form__input">
          <label for="projectDescription"
            >Description<span class="optional">(optional)</span></label
          >
          <textarea
            type="textarea"
            id="projectDescription"
            v-model="projectDescription"
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
  name: "TheCreateProjectModal",
  components: {
    BaseButton,
  },
  data() {
    return {
      priority: "Primary",
      text: "Create launch",
    };
  },
  setup() {
    // Create data
    const router = useRouter();
    const projectName = ref(null);
    const projectDescription = ref(null);
    const projectOwner = ref(null);
    const projectTeam = ref(null);
    const errorMsg = ref(null);

    // Closes modal when the background or "x" button  is clicked
    const closeModal = () => {
      store.dispatch("hideCreateProjectModal");
    };

    // Creates a new launch in the db when the form is submitted
    const createProject = async () => {
      try {
        const { error } = await supabase.from("projects").insert([
          {
            name: projectName.value,
            description: projectDescription.value,
            owner: store.state.activeUser.id,
            status: "active",
            created_by: store.state.activeUser.id,
            team_id: store.state.teams_active_data.id,
            organization_id: store.state.organization,
          },
        ]);
        if (error) throw error;
        await routeToProject();
        await store.dispatch("hideCreateProjectModal");
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Route user to launch view
    const routeToProject = () => {
      // router.push({ name: "projects", params: { id: data[0].id } });
      router.push({ name: "projects" });
    };
    return {
      createProject,
      projectName,
      projectDescription,
      projectOwner,
      projectTeam,
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
        .optional {
          color: #9ba1bb;
          font-weight: 400;
          margin-left: 4px;
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
        .disabled {
          background: #eeeff3;
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