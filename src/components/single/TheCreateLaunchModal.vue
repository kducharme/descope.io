<template>
  <div class="modal">
    <!-- Status Message -->
    <div v-if="errorMsg || statusMsg" class="message">
      <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      <p v-if="statusMsg" class="message__status">{{ statusMsg }}</p>
    </div>

    <!-- Create Launch Form -->

    <form @submit.prevent="createLaunch">
      <h1>Log in</h1>
      <div>
        <label for="email">Email</label>
        <input type="text" required id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" required id="password" v-model="password" />
      </div>
      <BaseButton
        type="submit"
        :priority="priority"
        :text="text"
        :action="showCreateModal"
      />
    </form>

    <!-- Create Launch Button -->
    <button @click="createLaunch" class="btn btn__primary">New launch</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import BaseButton from "../global/BaseButton.vue";

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
    const statusMsg = ref(null);
    const id = ref(null);

    // Set active user
    const user = supabase.auth.user();

    console.log(user)

    const createLaunch = async () => {
      // Generate unique id for launch
      id.value = uuidv4();

      try {
        const { error } = await supabase.from("launches").insert([
          {
            uniqueId: id.value,
            name: launchName,
            published: false,
            created_by: user,
          },
        ]);
        if (error) throw error;
        routeToLaunch();

        statusMsg.value = "Success";
        setTimeout(() => {
          statusMsg.value = null;
        }, 5000);
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Route user to launch view
    const routeToLaunch = () => {
      router.push({ name: "Launch", params: { launchId: id.value } });
      id.value = null;
    };
    return {
      createLaunch,
      team,
      launchName,
      errorMsg,
      statusMsg,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  padding: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
}
</style>