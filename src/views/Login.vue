<template>
  <div>
    <!-- Error Handling -->
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- Login Form -->
    <form>
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
      <router-link :to="{ name: 'Register' }">Don't have an account? Sign up.</router-link>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "login",
  setup() {
    // Create data / vars
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);

    // Register function

    return { email, password, errorMsg };
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
