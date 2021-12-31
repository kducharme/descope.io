<template>
  <div>
    <!-- Status Message -->
    <div v-if="errorMsg || statusMsg" class="message">
      <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      <p v-if="statusMsg" class="message__status">{{ statusMsg }}</p>
    </div>
    <button @click="createLaunch" class="btn btn__primary">
      New launch
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";

export default {
  name: "TheCreateLaunchButton",
  setup() {

    // Set active user
    const user = supabase.auth.user();

    // Setup ref to router
    const router = useRouter();

    // Create data
    const id = ref(null);
    const launchName = ref("Untitled");
    const launchContent = ref("");
    const launchOwner = ref(user);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    // Create a "launch" in Supabase
    const createLaunch = async () => {

      // Generate unique id for launch
      id.value = uuidv4();

      try {
        const { error } = await supabase.from("launches").insert([
          {
            uniqueId: id.value,
            name: null,
            published: false,
            created_by: launchOwner.value.id,
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
  padding: 6px 12px;
  border-radius: 5px;
}

.btn__primary {
  background: #3D52D5;
  color: white;
  margin-right: 12px;
  font-size: 14px;
  font-weight: 600;
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

.message__error,
.message__status {
  padding: 8px 12px;
  background: black;
  color: white;
}
</style>