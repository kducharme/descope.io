<template>
  <div class="imgUploader">
    <div class="header">
      <p
        class="header__remove"
        v-if="image"
        @click="
          removeImageFromDatabase();
          updatedParentFeedbackImage(false);
        "
      >
        Remove
      </p>
    </div>
    <div class="output" id="output" v-show="image"></div>
    <div class="upload" id="upload" v-show="!image">
      <label for="upload_file" class="upload__button"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          height="22px"
          viewBox="0 0 24 24"
          width="22px"
          fill="#7B82A3"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"
          />
        </svg>
        <input
          type="file"
          id="upload_file"
          accept="image/*"
          @change="
            uploadImageToDatabase();
            updatedParentFeedbackImage(true);
          "
        />
      </label>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";

export default {
  name: "BaseImageUploader",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    // Create data
    const image = ref(null);
    const errorMsg = ref(null);
    const loading = ref(null);

    // When a user selects an image, this function is called
    const uploadImageToDatabase = async () => {
      const file = document.querySelector("#upload_file").files[0];
      image.value = file;

      displayImage(file);
      try {
        const { error } = await supabase.storage
          .from("feedback")
          .upload("post/" + props.id + ".jpeg", file);
        if (error) throw error;
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Displays a preview of the image in the component
    const displayImage = (file) => {
      const img = new Image();

      img.src = URL.createObjectURL(file);
      img.style.width = "100%";
      img.style.height = "120px";
      img.style.maxHeight = "120px";
      img.style.objectFit = "cover";
      img.style.objectPosition = "25% 25%";
      img.setAttribute("id", "imagePreview");

      document.querySelector("#output").appendChild(img);
    };

    // Removes the image preview from the UI
    const removeImageFromDatabase = async () => {
      if (!image.value) return;
      document.querySelector("#imagePreview").remove();

      deleteImageFromDatabase();
    };

    // Deletes the image from the database
    const deleteImageFromDatabase = async () => {
      if (!image.value) return;
      image.value = null;
      try {
        const { error } = await supabase.storage
          .from("feedback")
          .remove(["post/" + props.id + ".jpeg"]);
        if (error) throw error;
        this.updateParentFeedbackImage();
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return {
      image,
      errorMsg,
      displayImage,
      removeImageFromDatabase,
      deleteImageFromDatabase,
      uploadImageToDatabase,
      loading,
    };
  },
  methods: {
    updatedParentFeedbackImage(payload) {
      payload
        ? this.$emit("updateImage", true)
        : this.$emit("updateImage", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.imgUploader {
  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .header {
    display: flex;
    justify-content: space-between;
    label {
      font-size: 12px;
      padding: 0 0 6px;
    }
    .optional {
      color: #9ba1bb;
      font-weight: 400;
      margin-left: 4px;
    }
    .header__remove {
      display: flex;
      justify-content: flex-end;
      color: #3d52d5;
      font-weight: 600;
      font-size: 13px;
      margin: 0 0 2px;
    }
    .header__remove:hover {
      cursor: pointer;
      text-decoration: underline;
      color: #3549c5;
    }
  }
  .output {
    padding: 8px 8px 4px 8px;
    background: #eeeff3;
    border: 2px solid #dbdde6;
    max-height: 320px;
  }
  .upload {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 28px;
    border-radius: 3px;
    // padding: 40px;
    // background: rgba(255, 255, 255, 0.473);
    // border: 2px solid #dbdde6;
    // border-radius: 3px;
    // border-style: dashed;
    .upload__button {
      height: 24px;
      // font-weight: 500;
      // background: #eeeff3;
      // border: 2px solid #dbdde6;
      // padding: 8px 12px;
      // display: inline-block;
    }
    .upload__button:hover {
      cursor: pointer;
      background: #e9e6e6;
    }
  }
}
</style>