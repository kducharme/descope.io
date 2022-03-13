<template>
  <div class="content">
    <div v-if="errorMsg" class="message">
      <p v-if="errorMsg" class="message__error">{{ errorMsg }}</p>
    </div>
    <form @submit.prevent="saveFeedback" class="form">
      <!-- Title input -->
      <div class="inputs">
        <input
          type="textarea"
          required
          id="feedbackTitle"
          v-model="feedbackTitle"
          placeholder="Title"
          class="inputs__title"
          autocomplete="off"
          @keyup="checkContent()"
        />
        <editor-content :editor="editor" class="inputs__description" />
      </div>
    </form>
    <div class="footer">
      <div class="save__button">
        <BaseButton
          :type="save_type"
          :priority="save_priority"
          :text="save_text"
          :id="save_id"
          :class="save_class"
          :tooltip="save_tooltip"
          :tooltip_status="tooltipStatus"
          :tooltip_position="save_tooltip_position"
        />
      </div>
      <div class="cancel__button">
        <BaseButton
          :type="cancel_type"
          :priority="cancel_priority"
          :text="cancel_text"
          :action="hideModal"
        />
      </div>
      <div class="editorActions" :editor="editor" v-if="editor">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          class="actions__icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 0 24 24"
            width="22px"
            fill="#7B82A3"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H8c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h5.78c2.07 0 3.96-1.69 3.97-3.77.01-1.53-.85-2.84-2.15-3.44zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
            />
          </svg>
        </button>

        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          class="actions__icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 0 24 24"
            width="22px"
            fill="#7B82A3"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M10 5.5c0 .83.67 1.5 1.5 1.5h.71l-3.42 8H7.5c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.71l3.42-8h1.29c.83 0 1.5-.67 1.5-1.5S17.33 4 16.5 4h-5c-.83 0-1.5.67-1.5 1.5z"
            />
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          class="actions__icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 0 24 24"
            width="22px"
            fill="#7B82A3"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M5 5.5C5 6.33 5.67 7 6.5 7h4v10.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h4c.83 0 1.5-.67 1.5-1.5S18.33 4 17.5 4h-11C5.67 4 5 4.67 5 5.5z"
            />
          </svg>
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="actions__icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 0 24 24"
            width="22px"
            fill="#7B82A3"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM8 19h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0-6h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"
            />
          </svg>
        </button>
        <div class="upload" id="upload">
          <label for="upload_file" class="actions__icon"
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
              "
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Add disabled button when there isn't content

import store from "../../store/index";
import { supabase } from "../../supabase/init";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import BaseButton from "../global/Base_Button_Text.vue";

export default {
  name: "BaseCommentInput",
  components: {
    EditorContent,
    BaseButton,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      commentActive: false,
      save_priority: "Primary",
      save_id: "saveButton",
      save_class: "disabled",
      save_text: "Save",
      save_type: "Submit",
      save_tooltip: "A title and description are required.",
      save_tooltip_position: "is-top",

      cancel_priority: "Secondary",
      cancel_text: "Cancel",
      cancel_type: "Submit",
    };
  },
  setup(props) {
    // Setup data
    const id = ref(null);
    const feedbackTitle = ref(null);
    const feedbackDetails = ref(null);
    const feedbackImage = ref(null);
    const imageName = ref(null);
    const feedbackProject = ref(null);

    const errorMsg = ref(null);
    const removeImageFunction = ref(null);
    const tooltipStatus = ref(null);

    tooltipStatus.value = true;

    const editor = useEditor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Italic,
        Bold,
        BulletList,
        ListItem,
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Placeholder.configure({
          placeholder: "Description",
        }),
      ],
      editable: true,
      injectCSS: false,
      onUpdate({ editor }) {
        const title = document.querySelector("#feedbackTitle").value;

        if (editor.getText() === "" || title === "") {
          document.querySelector("#saveButton").classList.add("disabled");
          tooltipStatus.value = true;
        }
        if (editor.getText() !== "" && title !== "") {
          document.querySelector("#saveButton").classList.remove("disabled");
          tooltipStatus.value = false;
        }
      },
    });

    const checkContent = () => {
      const title = document.querySelector("#feedbackTitle").value;

      if (editor.value.getText() === "" || title === "") {
        document.querySelector("#saveButton").classList.add("disabled");
        tooltipStatus.value = true;
      }
      if (editor.value.getText() !== "" && title !== "") {
        document.querySelector("#saveButton").classList.remove("disabled");
        tooltipStatus.value = false;
      }
    };

    // Create data
    const image = ref(null);
    const loading = ref(null);
    const fileName = ref(null);

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
      fileName.value = file.name;

      document.querySelector("#createIdea").style.height = "452px";
      document.querySelector("#createIdea").style.maxHeight = "452px";
    };

    // Removes the image preview from the UI
    const removeImageFromDatabase = async () => {
      if (!image.value) return;

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
        // this.updateParentFeedbackImage();
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Generates a unique ID for the feedback

    const generateFeedbackId = () => {
      id.value = uuidv4();
    };

    // Generate unique id for feedback
    generateFeedbackId();

    const saveFeedback = async () => {
      // Generate unqiue name for image
      generateImageName(id);

      // Adds feedback object to supabase
      saveToDatabase();
    };

    const generateImageName = (id) => {
      return (imageName.value = id.value + ".jpeg");
    };

    // const saveToDatabase = async () => {
    //   const comment = editor.value.getJSON();

    //   if (comment.content[0].content) {
    //     document.querySelector("#commentButton").classList.add("disabled");
    //     id.value = uuidv4();
    //     // await saveInitialVoteToDatabase();
    //     // await saveCommentToDatabase();
    //     editor.value.commands.clearContent();
    //     editor.value.commands.setContent();
    //   }
    // };

    const saveToDatabase = async () => {
      feedbackImage.value ? imageName.value : (imageName.value = null);
      feedbackProject.value
        ? (feedbackProject.value = feedbackProject.value.id)
        : (feedbackProject.value = null);
      saveFeedbackToDatabase();
    };

    const saveFeedbackToDatabase = async () => {
      try {
        const { error } = await supabase.from("feedback").insert([
          {
            // Core feedback data
            id: id.value,
            title: feedbackTitle.value,
            description: editor.value.getJSON(),
            category: 'idea',
            image: imageName.value,
            source: "app",
            votes_up: [`${store.state.activeUser.id}`],
            votes_down: [],

            // Supporting data
            organization_id: store.state.organization,
            team_id: store.state.teams_active.id,
            project_id: feedbackProject.value,
            created_by: store.state.activeUser.id,
          },
        ]);

        store.dispatch("setActiveTeamData");
        closeModal();

        if (error) throw error;
      } catch (error) {
        console.log(error);
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };
    const closeModal = () => {
      store.dispatch("hideCreateRequestModal");
    };

    return {
      props,
      editor,
      store,
      id,
      saveFeedback,
      feedbackTitle,
      feedbackDetails,
      feedbackProject,
      feedbackImage,
      errorMsg,
      closeModal,
      removeImageFunction,
      checkContent,
      tooltipStatus,
      image,
      displayImage,
      removeImageFromDatabase,
      deleteImageFromDatabase,
      uploadImageToDatabase,
      loading,
      fileName,
    };
  },
  mounted() {
    document.querySelector("#feedbackTitle").focus();
  },
  methods: {
    hideModal() {
      store.dispatch("hideCreateRequestModal");
    },
    updateFeedbackImage(payload) {
      this.feedbackImage = payload;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  .inputs {
    .inputs__title {
      outline: none;
      border: none;
      margin: 0 0 12px 0;
      padding: 0;
      font-size: 18px;
      font-weight: 500;
    }
    .inputs__title::placeholder {
      color: #aab0c5;
    }
    .inputs__description {
      position: relative;
      width: 100%;
      border-radius: 5px;
      padding: 1px;
      height: 240px;
      overflow-y: none;
      overflow-x: none;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    flex-direction: row;
    // border-top: 1px solid #dbdde6;
    padding: 16px 0 0 0;
    .actions__icon {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 28px;
      width: 28px;
      border-radius: 3px;
      border: none;
      background: none;
      margin: 0 8px 0 0;
      padding: 0;
    }
    .actions__icon:hover {
      cursor: pointer;
      background: #e9e6e6;
    }
    .save__button {
      max-width: 120px;
      margin: 0 12px 0 0;
    }
    .cancel__button {
      margin: 0 16px 0 0;
    }
    .editorActions {
      display: flex;
      .actions__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 28px;
        width: 28px;
        border-radius: 3px;
        border: none;
        background: none;
        margin: 0 8px 0 0;
        padding: 0;
      }
      .actions__icon:hover {
        cursor: pointer;
        background: #e9e6e6;
      }
    }
    .upload {
      position: relative;

      input[type="file"] {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
    }
  }
  .attachment {
    margin: 16px 0 0 0;
    background: #f1f3f7;
    border: 1px solid #dbdde6;
    border-radius: 3px;
    padding: 6px 8px;
  }
}

::v-deep .ProseMirror {
  height: 240px;
  max-height: 320px;
  overflow-y: auto;
  h1 {
    font-size: 18px;
    margin: 4px 0 4px 0;
  }
}

::v-deep .ProseMirror p.is-editor-empty:first-child::before {
  color: #aab0c5;
}

::v-deep .is-active {
  svg {
    fill: #212430;
    padding: 2px;
    background: #d5d9e7;
    border-radius: 3px;
  }
}
</style>
