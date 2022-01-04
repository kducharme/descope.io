<template>
  <div class="modal">
    <div class="modal__bg"></div>

    <div class="modal__content">
      <!-- Status Messages -->
      <div v-if="errorMsg" class="message">
        <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      </div>

      <!-- Onboarding Form -->
      <form @submit.prevent="createProfile" class="form">
        <h1 class="form__title">Welcome to LaunchDocs!</h1>
        <p class="form__description">
          Sed ut perspiciatis unde omnis iste natus error sit voluptat
          accusantium doloremque laudantium.
        </p>
        <div class="form__input">
          <label for="firstName">First name</label>
          <input type="text" required id="firstName" v-model="firstName" />
        </div>
        <div class="form__input">
          <label for="lastName">Last name</label>
          <input type="text" required id="lastName" v-model="lastName" />
        </div>
        <BaseButton
          type="submit"
          :priority="priority"
          :text="text"
          :action="showCreateModal"
          class="form__button"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import BaseButton from "../global/BaseButton.vue";
import store from "../../store/index";

export default {
  name: "TheOnboardingModal",
  components: {
    BaseButton
  },
  data() {
    return {
      priority: "Primary",
      text: "Save",
    };
  },
  setup() {
    // Create data / vars
    const firstName = ref(null);
    const lastName = ref(null);
    const errorMsg = ref(null);

    // Register function
    const createProfile = async () => {
      try {
        const user = supabase.auth.user();
        const updates = {
          id: user.id,
          firstname: firstName.value,
          lastname: lastName.value,
          email: user.email,
          updated_at: new Date(),
          onboarded: true
        };
        let { error } = await supabase.from("profiles").upsert(updates);
        store.state.onboarded = true;
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    return {
      firstName,
      lastName,
      errorMsg,
      createProfile,
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