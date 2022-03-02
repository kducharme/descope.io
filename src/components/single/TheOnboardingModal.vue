<template>
  <div class="modal" id="onboarding_modal">
    <div class="modal__content">
      <!-- Status Messages -->
      <div v-if="errorMsg" class="message">
        <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      </div>

      <!-- Onboarding Form -->
      <form @submit.prevent="createProfile" class="form">
        <h1 class="form__title">Complete your profile</h1>
        <p class="form__description">
          Sed ut perspiciatis unde omnis iste natus error sit voluptat
          accusantium doloremque laudantium.
        </p>
        <div class="name">
          <div class="form__input name__first">
            <label for="firstName">First name *</label>
            <input type="text" required id="firstName" v-model="firstName" />
          </div>
          <div class="form__input name__last">
            <label for="lastName">Last name *</label>
            <input type="text" required id="lastName" v-model="lastName" />
          </div>
        </div>
        <div class="form__input">
          <label for="companyName">Company name *</label>
          <input type="text" required id="companyName" v-model="companyName" />
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
import BaseButton from "../global/Base_Button_Text.vue";
import store from "../../store/index";

export default {
  name: "TheOnboardingModal",
  components: {
    BaseButton,
  },
  data() {
    return {
      priority: "Primary",
      text: "Save profile",
    };
  },
  setup() {
    // Create data / vars
    const firstName = ref(null);
    const lastName = ref(null);
    const companyName = ref(null);
    const errorMsg = ref(null);

    const colors = [
      "C8E5F9",
      "FE938C",
      "EDAF97",
      "F9FBB2",
      "F59CA9",
      "B0CA87",
      "D6FFB7",
      "F0C987",
      "F6EFA6",
      "FFC49B"
    ];

    // Register function
    const createProfile = async () => {
      const org = await createOrganization();

      try {
        const user = supabase.auth.user();
        console.log(user.id);
        const updates = {
          id: user.id,
          firstname: firstName.value,
          lastname: lastName.value,
          email: user.email,
          updated_at: new Date(),
          onboarded: true,
          color: colors[Math.floor(Math.random() * colors.length)],
          organization_id: org[0].id,
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

    const createOrganization = async () => {
      try {
        const { data, error } = await supabase.from("organizations").insert([
          {
            name: companyName.value,
          },
        ]);
        if (error) throw error;
        return data;
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return {
      firstName,
      lastName,
      companyName,
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
  z-index: 999999;
  width: 100vw;
  height: 100vh;
  background: #333536bb;

  .modal__content {
    position: fixed;
    margin: 24px 0 0;
    width: 440px;
    background: white;
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
      .name {
        display: flex;
        justify-content: space-between;
        .name__first,
        .name__last {
          width: 188px;
        }
      }
      .form__input {
        display: flex;
        flex-direction: column;
        margin: 12px 0;
        label {
          font-size: 12px;
          padding: 0 0 6px;
        }
        input,
        textarea {
          background: white;
          border: 2px solid #dbdde6;
          padding: 8px;
          resize: none;
        }
        .form__select {
          background: #252628;
          border: 1px solid #e2e2e25f;
          padding: 8px;
        }
      }
      .form__button {
        margin: 16px 0 0;
      }
    }
  }
}
</style>