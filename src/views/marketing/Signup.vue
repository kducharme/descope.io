<template>
  <div>
    <!-- Error Handling -->
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- Registration Form -->
    <form @submit.prevent="register">
      <h1>Create new account</h1>
      <div>
        <label for="email">Email</label>
        <input type="text" required id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" required id="password" v-model="password" />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          required
          id="confirmPassword"
          v-model="confirmPassword"
        />
      </div>
      <button type="submit">Sign up</button>
      <router-link :to="{ name: 'ConfirmEmail' }"
        >Already have an account? Log in.</router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";

export default {
  name: "register",
  setup() {
    // Create data / vars
    const router = useRouter();
    const firstName = ref(null);
    const lastName = ref(null);
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);

    // Register function
    const register = async () => {
      if (password.value === confirmPassword.value) {
        try {
          let { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if (error) throw error;

          // Check if the user has an active profile & set initial data
          createProfile();

          // Route user to the confirmation page
          router.push({ name: "ConfirmEmail" });
        } catch (error) {
          errorMsg.value = error.message;
          setTimeout(() => {
            errorMsg.value = null;
          }, 5000);
        }
        return;
      }
      errorMsg.value = "Error: Passwords do not match. Please try again.";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    };
    const createProfile = async () => {
      console.log('hi')
      try {
        const user = supabase.auth.user();
        const updates = {
          id: user.id,
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          updated_at: new Date(),
        };
        let { error } = await supabase.from("profiles").upsert(updates);
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
      email,
      password,
      confirmPassword,
      errorMsg,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 16px;
}

form > div {
  display: flex;
  flex-direction: column;
  margin: 8px 0;
}

input {
  border: 1px solid gray;
  color: black;
}

button {
  background: black;
  color: white;
}
</style>