<template>
  <div>

  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";

export default {
  name: "Document",
  setup() {
    // Set active user
    const user = supabase.auth.user();

    // Set active launch

    // const launchId = this.$route.params.id;

    // Create data
    const launchName = ref('');
    const launchContent = ref('');
    const launchOwner = ref(user.id);
    // const statusMsg = ref(null)
    // const errorMsg = ref(null)

    // Add exercise

    // Delete exercise

    // Listens for chaging of workout type input

    // Create workout

    return { launchName, launchContent, launchOwner };
  },
};
</script>
