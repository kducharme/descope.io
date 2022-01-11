<template>
  <div class="modal">
    <div class="modal__bg" @click="closeModal"></div>

    <div class="modal__content">
      <!-- Status Messages -->
      <div v-if="errorMsg || statusMsg" class="message">
        <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      </div>

      <!-- Create Launch Form -->
      <form @submit.prevent="createLaunch" class="form">
        <h1 class="form__title">Create a new launch</h1>
        <p class="form__description">
          Sed ut perspiciatis unde omnis iste natus error sit voluptat
          accusantium doloremque laudantium.
        </p>
        <div class="form__input">
          <label for="launchName">Launch name</label>
          <input type="text" required id="launchName" v-model="launchName" />
        </div>
        <div class="form__input">
          <label for="team">Team</label>
          <div class="form__select" id="team">Select team</div>
        </div>
        <div class="form__input">
          <label for="owner">Owner</label>
          <div class="form__select" id="owner">
            {{ store.state.activeUser.email }}
          </div>
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
import { v4 as uuidv4 } from "uuid";
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
      text: "Create launch",
    };
  },
  setup() {
    // Create data
    const router = useRouter();
    const team = ref(null);
    const launchName = ref(null);
    const errorMsg = ref(null);
    const id = ref(null);

    // Closes modal when the background or "x" button  is clicked
    const closeModal = () => {
      store.dispatch("hideCreateLaunchModal");
    };

    // Creates a new launch in the db when the form is submitted
    const createLaunch = async () => {
      // Generate unique id for launch
      id.value = uuidv4();

      // TODO - check if a launch already exists with that name

      try {
        const { error } = await supabase.from("launches").insert([
          {
            uniqueId: id.value,
            name: launchName.value,
            status: "Draft",
            active: true,
            created_by: store.state.activeUser.id,
            organization: store.state.organization,
          },
        ]);
        if (error) throw error;
        await store.dispatch("getLaunches");
        await routeToLaunch();
        await store.dispatch("hideCreateLaunchModal");

      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Route user to launch view
    const routeToLaunch = () => {
      router.push({ name: "launch", params: { id: id.value } });
      id.value = null;
    };
    return {
      createLaunch,
      team,
      launchName,
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
    width: calc(100vw - 440px);
    background: #3d3e41;
    opacity: 0.6;
  }

  .modal__content {
    width: 440px;
    background: #1e1f21;
    padding: 24px;
    // border-left: 0.5px solid #e2e2e25f;
    .form {
      display: flex;
      flex-direction: column;
      .form__title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px;
      }
      .form__description {
        margin: 0 0 16px;
      }
      .form__input {
        display: flex;
        flex-direction: column;
        margin: 12px 0;
        label {
          font-size: 12px;
          padding: 0 0 6px;
        }
        input {
          background: #252628;
          border: 1px solid #e2e2e25f;
          padding: 8px;
        }
        .form__select {
          background: #252628;
          border: 1px solid #e2e2e25f;
          padding: 8px;
        }
      }
      .form__button {
        margin: 20px 0 0;
        // max-width: 132px;
      }
    }
  }
}
</style>