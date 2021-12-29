<template>
  <div>
    <!-- Status Message -->
    <div v-if="errorMsg || statusMsg" class="message">
      <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      <p v-if="statusMsg" class="message__status">{{ statusMsg }}</p>
    </div>
    <button @click="createLaunch" class="btn btn__primary">
      Create new launch
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
// import { useRouter } from "vue-router";

export default {
  name: "TheCreateLaunchButton",
  setup() {
    // Set active launch
    // const launchId = this.$route.params.id;

    // Set active user
    const user = supabase.auth.user();

    // Setup ref to router
    // const router = useRouter();

    // Create data
    const launchName = ref("");
    const launchContent = ref("");
    const launchOwner = ref(user);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    // Create a "launch" in Supabase
    const createLaunch = async () => {
      try {
        const { error } = await supabase.from("launch").insert([
          {
            name: null,
            published: false,
            created_by: launchOwner.value.id
          },
        ]);
        if (error) throw error;
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

      routeToLaunch();
    };

    // Route user to launch view
    const routeToLaunch = () => {
      //   router.push({ name: "Launch" });
      console.log("routed to launch");
    };

    return {
      launchName,
      launchContent,
      launchOwner,
      createLaunch,
      errorMsg,
      statusMsg,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 8px 12px;
  border-radius: 5px;
}

.btn__primary {
  background: blue;
  color: white;
  margin-right: 12px;
}

.message {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100vw;
    top: 12px;
    left: 0;
}

.message__error, .message__status {
    padding: 8px 12px;
    background: black;
    color: white;
}

</style>