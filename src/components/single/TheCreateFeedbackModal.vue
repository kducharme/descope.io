<template>
  <div class="modal">
    <div class="modal__bg"></div>

    <div class="modal__content">
      <!-- Status Messages -->
      <div v-if="errorMsg" class="message">
        <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
      </div>

      <!-- Create Launch Form -->
      <div class="header">
        <h1 class="header__title">Add feedback</h1>
        <div
          class="header__close"
          @click="
            closeModal();
            $refs.imageUploader.deleteImageFromDatabase();
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#212430"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
            />
          </svg>
        </div>
      </div>
      <form @submit.prevent="saveFeedback" class="form">
        <div class="form__input">
          <label for="feedbackProject"
            >Project <span class="optional">(optional)</span></label
          >
          <select name="projects" id="project" v-model="project">
            <option value="" selected id="placeholder">Select a team</option>
            <option
              v-for="project in store.state.projects"
              :key="project.id"
              :value="project"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
        <div class="form__input">
          <label for="feedbackDetails">Feedback *</label>
          <textarea
            type="textarea"
            required
            id="feedbackDetails"
            v-model="feedbackDetails"
            rows="2"
            cols="50"
          />
        </div>
        <div class="form__input">
          <label for="priority">Priority *</label>
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
        <div class="form__input">
          <BaseImageUploader :id="id" ref="imageUploader" />
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
    const project = ref(null);
    const errorMsg = ref(null);
    const removeImageFunction = ref(null);

    // Generates a unique ID for the feedback

    const generateFeedbackId = () => {
      id.value = uuidv4();
    };

    // When a user submits the form, this function is called

    const saveFeedback = async () => {
      // Generate unique id for feedback
      generateFeedbackId();

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
            // Core feedback data
            id: id.value,
            description: feedbackDetails.value,
            priority: feedbackPriority.value,
            image: imageName.value,

            // Supporting data
            organization_id: store.state.organization,
            team_id: store.state.teams_active_data.id,
            project_id: project.value.id,
            created_by: store.state.activeUser.id,
            completed: false,
            completed_at: null,
            source: "LaunchDocs",
          },
        ]);

        store.dispatch("setAllTeamFeedback");
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
      store.dispatch("hideCreateFeedbackModal");
    };
    return {
      store,
      id,
      saveFeedback,
      feedbackDetails,
      feedbackPriority,
      project,
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
    width: calc(100vw - 400px);
    background: #3d3e41;
    opacity: 0.6;
  }
  .modal__content {
    width: 400px;
    background: #eeeff3;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      padding: 24px;
      border-bottom: 1px solid #dbdde6;
      .header__title {
        font-size: 20px;
        font-weight: 600;
        // margin: 0 0 8px;
      }
      .header__close {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        width: 32px;
        border-radius: 100%;
      }
      .header__close:hover {
        background: #eeeff3;
        cursor: pointer;
      }
    }
    .form {
      padding: 24px;
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
          border: 2px solid #dbdde6;
          border-radius: 3px;
          border-style: dotted;
          .upload__button {
            font-weight: 500;
            background: #eeeff3;
            border: 2px solid #dbdde6;
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
          border: 2px solid #dbdde6;
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
        .optional {
          color: #9ba1bb;
          font-weight: 400;
          margin-left: 4px;
        }
        input,
        textarea,
        select {
          background: white;
          border: 2px solid #dbdde6;
          padding: 8px;
          resize: none;
        }
        select {
          appearance: caret;
        }
        .form__select {
          background: white;
          border: 2px solid #dbdde6;
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