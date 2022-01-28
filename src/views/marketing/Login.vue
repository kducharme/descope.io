<template>
  <div>
    <!-- Error Handling -->
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="login">
      <h1>Log in</h1>
      <div>
        <label for="email">Email</label>
        <input type="text" required id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" required id="password" v-model="password" />
      </div>
      <button type="submit">Log in</button>
      <router-link :to="{ name: 'Signup' }"
        >Don't have an account? Sign up.</router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";

export default {
  name: "login",
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);

    // Login function
    const login = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ path: '/' })

      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
            errorMsg.value = null;
          }, 5000);
      }
    };
    return { email, password, errorMsg, login };
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
}

button {
  background: black;
  color: white;
}
</style>
