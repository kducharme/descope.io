<template>
  <div class="modal" id="onboarding_modal">
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
          <label for="firstName">Full name</label>
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
import { v4 as uuidv4 } from "uuid";

export default {
  name: "TheOnboardingModal",
  components: {
    BaseButton,
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
    const organization = ref(null);

    // Register function
    const createProfile = async () => {
      // Generate unique id for organization
      organization.value = uuidv4();

      try {
        const user = supabase.auth.user();
        const updates = {
          id: user.id,
          firstname: firstName.value,
          lastname: lastName.value,
          email: user.email,
          updated_at: new Date(),
          onboarded: true,
          organization_id: organization.value
        };
        let { error } = await supabase.from("profiles").upsert(updates);
        store.state.onboarded = true;
        document.querySelector("#onboarding_modal").remove();
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
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #333536bb;

  .modal__content {
    position: fixed;
    margin: 24px 0 0;
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