<template>
  <div class="modal">
    <div class="modal__bg" @click="closeModal"></div>

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
          <label for="">Image</label>
          <div id="output" class="upload__output" v-if="image"></div>
          <div class="upload" id="imageUploader" v-if="!image">
            <label for="imageUpload" class="upload__button"
              >Upload image
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                @change="displayImage"
              />
            </label>
          </div>
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
import BaseButton from "../global/BaseButton.vue";
import store from "../../store/index";
// import { decode } from "base64-arraybuffer";

export default {
  name: "TheAddFeedbackModal",
  components: {
    BaseButton,
  },
  data() {
    return {
      priority: "Primary",
      text: "Save feedback",
      // imageLoaded: false,
    };
  },
  setup() {
    // Create data
    const feedbackDetails = ref(null);
    const image = ref(null);
    const imageName = ref(null);
    const feedbackPriority = ref(null);
    const errorMsg = ref(null);
    const id = ref(null);
    const fileInput = ref(null);
    const imageLoaded = ref(false);

    // When a user selects an image, this function is called
    const displayImage = () => {
      const file = document.querySelector("#imageUpload").files[0];
      image.value = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (event) {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;

        imgElement.onload = function (e) {
          const canvas = document.createElement("canvas");
          const width = 376;
          const scaleSize = width / e.target.width;

          canvas.width = width;
          canvas.height = e.target.height * scaleSize;

          const ctx = canvas.getContext("2d");

          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

          const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");

          imageLoaded.value = true;
          const img = new Image();
          img.src = srcEncoded;
          console.log(document.querySelector("#output"));
          document.querySelector("#output").appendChild(img);
        };
      };
    };

    // When a user submits the form, this function is called

    const saveFeedback = async () => {
      // Generate unique id for feedback
      id.value = uuidv4();

      // Generate unqiue name for image
      generateImageName(id);

      // Upload the image to supabase
      uploadImageToDatabase();

      // Adds feedback object to supabase
      // addFeedbackToDatabase();
    };

    const generateImageName = (id) => {
      if (!image.value) return;
      return (imageName.value = id.value + ".jpeg");
    };

    const uploadImageToDatabase = async () => {
      if (!image.value) {
        addFeedbackToDatabase();
      }

      try {
        const { error } = await supabase.storage
          .from("launches")
          .upload("feedback/" + id.value + ".jpeg", image.value, {
            cacheControl: "3600",
            upsert: false,
          });
        addFeedbackToDatabase();
        if (error) throw error;
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    const addFeedbackToDatabase = async () => {
      try {
        const { data, error } = await supabase.from("feedback").insert([
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

        console.log(data);
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
      saveFeedback,
      feedbackDetails,
      image,
      feedbackPriority,
      errorMsg,
      closeModal,
      displayImage,
      fileInput,
      imageLoaded,
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
        input[type="file"] {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
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
          // border: 2px solid #dadce2;
          // border-radius: 3px;
          // border-style: dotted;
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
</style>