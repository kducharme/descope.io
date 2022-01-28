<template>
  <div class="modal">
    <div class="modal__bg" @click="closeModal(); $refs.imageUploader.deleteImageFromDatabase()" ></div>

    <div class="modal__content">
      <!-- Status Messages -->
      <div v-if="errorMsg" class="message">
        <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      </div>

      <!-- Create Launch Form -->
      <div class="header">
        <h1 class="title">Add feedback</h1>
      </div>
      <form @submit.prevent="saveFeedback" class="form">
        <div class="form__input">
          <BaseImageUploader :id="id" ref="imageUploader" />
        </div>

        <div class="form__input">
          <label for="feedbackDetails">Details</label>
          <textarea
            type="textarea"
            required
            id="feedbackDetails"
            v-model="feedbackDetails"
            rows="3"
            cols="50"
          />
        </div>
        <div class="form__input">
          <label for="priority">Priority</label>
          <div class="radio">
            <input
              name="priority"
              class="radio__select"
              type="radio"
              id="high"
              value="High"
              v-model="feedbackPriority"
              required
            />
            <label class="radio__text" for="high">High</label>
          </div>
          <div class="radio">
            <input
              name="priority"
              class="radio__select"
              type="radio"
              id="medium"
              value="Medium"
              v-model="feedbackPriority"
            />
            <label class="radio__text" for="medium">Medium</label>
          </div>
          <div class="radio">
            <input
              name="priority"
              class="radio__select"
              type="radio"
              id="low"
              value="Low"
              v-model="feedbackPriority"
            />
            <label class="radio__text" for="low">Low</label>
          </div>
        </div>
        <BaseButton
          :type="save_type"
          :priority="save_priority"
          :text="save_text"
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
import BaseButton from "../global/BaseButton.vue";
import BaseImageUploader from "../global/BaseImageUploader.vue";
import store from "../../store/index";
// import { decode } from "base64-arraybuffer";

export default {
  name: "TheAddFeedbackModal",
  components: {
    BaseButton,
    BaseImageUploader,
  },
  data() {
    return {
      save_priority: "Primary",
      save_text: "Save feedback",
      save_type: "Submit",

      replace_priority: "Secondary",
      replace_text: "Replace",
      replace_type: "Button",

      remove_priority: "Secondary",
      remove_text: "Remove",
      remove_type: "Button",
    };
  },
  setup() {
    // Create data
    const feedbackDetails = ref(null);
    const id = ref(null);
    const imageName = ref(null);
    const feedbackPriority = ref(null);
    const errorMsg = ref(null);
    const removeImageFunction = ref(null);

    // Generates a unique ID for the feedback

    const generateFeedbackId = () => {
      id.value = uuidv4();
    };

    // Call the generate ID function
    generateFeedbackId();

    // When a user submits the form, this function is called

    const saveFeedback = async () => {
      // Generate unique id for feedback

      // Generate unqiue name for image
      generateImageName(id);

      // Adds feedback object to supabase
      addFeedbackToDatabase();
    };

    const generateImageName = (id) => {
      return (imageName.value = id.value + ".jpeg");
    };

    const addFeedbackToDatabase = async () => {
      try {
        const { error } = await supabase.from("feedback").insert([
          {
            id: id.value,
            launch_id: store.state.activeLaunch.launch.id,
            organization_id: store.state.organization,
            completed: false,
            image: imageName.value,
            source: "LaunchDocs",
            description: feedbackDetails.value,
            priority: feedbackPriority.value,
            created_by: store.state.activeUser.id,
          },
        ]);

        store.dispatch("getFeedback");
        closeModal();

        if (error) throw error;
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Closes modal when the background or "x" button  is clicked
    const closeModal = () => {
      store.dispatch("hideAddFeedbackModal");
    };
    return {
      id,
      saveFeedback,
      feedbackDetails,
      feedbackPriority,
      errorMsg,
      closeModal,
      removeImageFunction,
    };
  },
  methods: {},
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
        input[type="file"] {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }
        .imgHeader {
          display: flex;
          justify-content: space-between;
          .imgHeader__remove {
            display: flex;
            justify-content: flex-end;
            color: #3d52d5;
            font-weight: 600;
            font-size: 13px;
            margin: 0 0 2px;
          }
          .imgHeader__remove:hover {
            cursor: pointer;
            text-decoration: underline;
            color: #3549c5;
          }
        }
        .upload {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px;
          background: #eeeff35f;
          border: 2px solid #dadce2;
          border-radius: 3px;
          border-style: dotted;
          .upload__button {
            font-weight: 500;
            background: #eeeff3;
            border: 2px solid #cfd2de;
            padding: 8px 12px;
            display: inline-block;
          }
          .upload__button:hover {
            cursor: pointer;
            background: #e8e9ee;
          }
        }
        .upload__output {
          padding: 8px 8px 4px 8px;
          background: #eeeff3;
          border: 2px solid #dadce2;
          max-height: 320px;
        }
        .actions {
          margin: 10px 10px 6px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          width: 372px;
          // z-index: 99999!important;
          height: 152px;
          background: rgba(255, 255, 255, 0.707);
        }
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
        margin: 8px 0 0;
        max-width: 132px;
      }
    }
  }
}

.upload__output--image {
  // width: 100%;
  height: 200px !important;
  border: 5px solid red;
}
</style>