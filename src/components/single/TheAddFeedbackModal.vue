<template>
  <div class="modal">
    <div class="modal__bg" @click="closeModal"></div>

    <div class="modal__content">
      <!-- Status Messages -->
      <div v-if="errorMsg || statusMsg" class="message">
        <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      </div>

      <!-- Create Launch Form -->
      <div class="header">
        <h1 class="title">Add feedback</h1>
      </div>
      <form @submit.prevent="saveFeedback" class="form">
        <div class="form__input">
          <label for="imageUpload">Image</label>
          <input ref="image" type="file" id="imageUpload" />
        </div>
        <div class="form__input">
          <label for="launchName">Notes</label>
          <textarea
            type="textarea"
            required
            id="launchName"
            v-model="launchName"
            rows="4"
            cols="50"
          />
        </div>
        <div class="form__input">
          <label for="launchName">Priority</label>
          <div class="radio">
            <input
              class="radio__select"
              type="radio"
              id="high"
              name="priority"
              value="High"
            />
            <label class="radio__text" for="high">High</label>
          </div>
          <div class="radio">
            <input
              class="radio__select"
              type="radio"
              id="medium"
              name="priority"
              value="Medium"
            />
            <label class="radio__text" for="medium">Medium</label>
          </div>
          <div class="radio">
            <input
              class="radio__select"
              type="radio"
              id="low"
              name="priority"
              value="Low"
            />
            <label class="radio__text" for="low">Low</label>
          </div> -->
        </div>
        <BaseButton
          type="submit"
          :priority="priority"
          :text="text"
          class="form__button"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { v4 as uuidv4 } from "uuid";
// import { useRouter } from "vue-router";
import BaseButton from "../global/BaseButton.vue";
import store from "../../store/index";

export default {
  name: "TheAddFeedbackModal",
  components: {
    BaseButton,
  },
  data() {
    return {
      priority: "Primary",
      text: "Save feedback",
    };
  },
  setup() {
    // Create data
    // const router = useRouter();
    const details = ref(null);
    const image = ref(null);
    const feedbackPriority = ref(null);
    const errorMsg = ref(null);
    const id = ref(null);

    // Closes modal when the background or "x" button  is clicked
    const closeModal = () => {
      store.dispatch("hideAddFeedbackModal");
    };

    // Creates a new launch in the db when the form is submitted
    const saveFeedback = async () => {
      // Generate unique id for launch
      id.value = uuidv4();

      saveImageToDatabase();

      // TODO - check if a launch already exists with that name

      // try {
      //   const { error } = await supabase.from("launches").insert([
      //     {
      //       feedback_id: id.value,
      //       launch_id: store.state.activeLaunch.launch.launch_id,
      //       organization_id: store.state.organization,
      //       completed: false,
      //       image: image.value,
      //       source: "LaunchDocs",
      //       description: details.value,
      //       priority: feedbackPriority.value,
      //       created_by: store.state.activeUser.id,
      //     },
      //   ]);
      //   if (error) throw error;
      //   await store.dispatch("getLaunches");
      //   await routeToLaunch();
      //   await store.dispatch("hideCreateLaunchModal");
      // } catch (error) {
      //   errorMsg.value = `Error: ${error.message}`;
      //   setTimeout(() => {
      //     errorMsg.value = null;
      //   }, 5000);
      // }
    };

    const saveImageToDatabase = async () => {
      // const { data } = await supabase.storage.getBucket("feedback");
      // console.log(data)
      try {
        const { error } = await supabase.storage
          .from("launches")
          .upload("feedback/" + id.value + ".png", image.value.files[0], {
            cacheControl: "3600",
            upsert: false,
          });
        if (error) throw error;
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }

      // debugger;
      //Upload to server
    };

    // Route user to launch view
    // const routeToLaunch = () => {
    //   router.push({ name: "launch", params: { id: id.value } });
    //   id.value = null;
    // };
    return {
      saveFeedback,
      details,
      image,
      feedbackPriority,
      errorMsg,
      closeModal,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .modal__bg {
    width: calc(100vw - 440px);
    background: #3d3e41;
    opacity: 0.6;
  }
  .modal__content {
    width: 440px;
    background: white;
    padding: 24px;
    .header {
      display: flex;
      .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
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
          border: 2px solid #eeeff3;
          padding: 8px;
          resize: none;
        }
        .form__select {
          background: white;
          border: 2px solid #eeeff3;
          padding: 8px;
        }
        .radio {
          margin: 6px 0;
          .radio__select {
            margin: 0 8px 0 0;
          }
          .radio__text {
            font-size: 14px;
          }
        }
      }
      .form__button {
        margin: 20px 0 0;
        max-width: 132px;
      }
    }
  }
}
</style>