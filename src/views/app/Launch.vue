<template>
  <div>
hwwo
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";

export default {
  name: "Document",
  setup() {
    // Set active user id
    const uid = supabase.auth.user().id;

    // Set active launch

    // const launchId = this.$route.params.id;

    // Create data
    const launchName = ref('');
    const launchContent = ref('');
    const launchOwner = ref(uid);
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
