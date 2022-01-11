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
        <h1 class="title">Add feedback</h1>
      </div>
      <form @submit.prevent="createLaunch" class="form">
        <div class="form__input">
          <label for="launchName">Details</label>
          <textarea type="textarea" required id="launchName" v-model="launchName" rows="4" cols="50" />
        </div>
        <div class="form__input">
          <label for="team">Priority</label>
          <div class="form__select" id="team">Select priority</div>
        </div>
        <div class="form__input">
          <label for="owner">Image</label>
          <input type="file" id="myFile" name="filename">
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
      text: "Save feedback",
    };
  },
  setup() {
    // Create data
    const router = useRouter();
    const details = ref(null);
    const image = ref(null);
    const feedbackPriority = ref(null);
    const errorMsg = ref(null);
    const id = ref(null);

    // Closes modal when the background or "x" button  is clicked
    const closeModal = () => {
      store.dispatch("hideAddFeedbackModal");
    };

    // Creates a new launch in the db when the form is submitted
    const createLaunch = async () => {
      // Generate unique id for launch
      id.value = uuidv4();

      // TODO - check if a launch already exists with that name

      try {
        const { error } = await supabase.from("launches").insert([
          {
            launch: store.state.activeLaunch.launch.uniqueId,
            completed: false,
            image: image.value,
            description: details.value,
            priority: feedbackPriority.value,
            organization: store.state.organization,
            created_by: store.state.activeUser.id,
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
      details,
      image,
      feedbackPriority,
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
    .header {
      background: #252628;
      padding: 24px;
      .title {
        font-size: 18px;
        font-weight: 600;
      }
      .title__project {
        background: #1e1f21;
        // font-size: 16px;
        padding: 4px 8px;
        margin: 0 0 0 8px;
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
          padding: 0 0 6px;
        }
        input, textarea {
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
        max-width: 132px;
      }
    }
  }
}
</style>