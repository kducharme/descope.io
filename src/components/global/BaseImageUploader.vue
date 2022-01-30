<template>
  <div class="imgUploader">
    <div class="header">
      <label class="header__label">Image</label>
      <p class="header__remove" v-if="image" @click="removeImage">Remove</p>
    </div>
    <div class="output" id="output" v-show="image"></div>
    <div class="upload" id="upload" v-if="!image">
      <label for="upload_file" class="upload__button"
        >Upload image
        <input
          type="file"
          id="upload_file"
          accept="image/*"
          @change="uploadImageToDatabase"
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
          .from("launches")
          .upload("feedback/" + props.id + ".jpeg", image.value, {
            cacheControl: "3600",
            upsert: false,
          });
        this.$emit("imageLoading", "loading.value");
        console.log("success");
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
      img.style.height = "152px";
      img.style.maxHeight = "152px";
      img.style.objectFit = "cover";
      img.style.objectPosition = "25%% 25%";
      img.setAttribute("id", "imagePreview");

      document.querySelector("#output").appendChild(img);
    };

    // Removes the image preview from the UI
    const removeImage = async () => {
      if (!image.value) return;

      image.value = null;
      document.querySelector("#imagePreview").remove();

      deleteImageFromDatabase();
    };

    // Deletes the image from the database
    const deleteImageFromDatabase = async () => {
      console.log("no image");
      if (!image.value) return;
      console.log("has image");
      try {
        const { error } = await supabase.storage
          .from("launches")
          .remove(["feedback/" + props.id + ".jpeg"]);
        if (error) throw error;
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
      removeImage,
      deleteImageFromDatabase,
      uploadImageToDatabase,
      loading,
    };
  },
  methods: {},
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
    border: 2px solid #DBDDE6;
    max-height: 320px;
  }
  .upload {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 56px;
    background: #eeeff35f;
    border: 2px solid #DBDDE6;
    border-radius: 3px;
    border-style: dotted;
    .upload__button {
      font-weight: 500;
      background: #eeeff3;
      border: 2px solid #DBDDE6;
      padding: 8px 12px;
      display: inline-block;
    }
    .upload__button:hover {
      cursor: pointer;
      background: #DBDDE6;
    }
  }
}
</style>