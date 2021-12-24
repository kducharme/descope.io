<template>
  <div>
    <!-- Error Handling -->
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- Registration Form -->
    <form>
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
        <input type="password" required id="confirmPassword" v-model="confirmPassword" />
      </div>
      <button type="submit">Sign up</button>
      <router-link :to="{ name: 'Login' }">Already have an account? Log in.</router-link>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "register",
  setup() {
    // Create data / vars
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);

    // Register function

    return { email, password, confirmPassword, errorMsg };
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
