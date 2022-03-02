<template>
  <div class="comment">
    <div class="comment__editor">
      <bubble-menu :editor="editor" v-if="editor">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 0 24 24"
            width="22px"
            fill="#fff"
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
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 0 24 24"
            width="22px"
            fill="#fff"
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
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 0 24 24"
            width="22px"
            fill="#fff"
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
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 0 24 24"
            width="22px"
            fill="#fff"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM8 19h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0-6h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"
            />
          </svg>
        </button>
      </bubble-menu>
      <editor-content
        :editor="editor"
        v-model="comment"
        class="editor"
        @change="checkComment"
      />
    </div>
    <div class="comment__actions">
      <button
        type="submit"
        @click="saveToDatabase"
        class="btn btn__small disabled"
        id="commentButton"
      >
        Comment
      </button>
    </div>
  </div>
</template>

<script>
// TODO: Add disabled button when there isn't content

import store from "../../store/index";
import { supabase } from "../../supabase/init";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";

export default {
  name: "BaseCommentInput",
  components: {
    EditorContent,
    BubbleMenu,
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
    };
  },
  setup(props) {
    // Setup data
    const comment = ref(null);
    const initialVote = ref(null);
    const id = ref(null);

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
          placeholder: "Write a comment…",
        }),
      ],
      autofocus: true,
      editable: true,
      injectCSS: false,
      onUpdate({ editor }) {
        if (editor.getText() === "") {
          document.querySelector('#commentButton').classList.add('disabled')
        } else {
          document.querySelector('#commentButton').classList.remove('disabled')
        }
      },
    });

    const saveToDatabase = async () => {
      const comment = editor.value.getJSON();

      if (comment.content[0].content) {
        document.querySelector('#commentButton').classList.add('disabled');
        id.value = uuidv4();
        await saveInitialVoteToDatabase();
        await saveCommentToDatabase();
        editor.value.commands.clearContent();
        editor.value.commands.setContent();
      }
    };

    const saveInitialVoteToDatabase = async () => {
      try {
        const { data, error } = await supabase
          .from("feedback_comments_votes")
          .insert([
            {
              comment_id: id.value,
              feedback_id: store.state.feedback_active.id,
              created_by: store.state.activeUser.id,
            },
          ]);
        if (error) throw error;
        initialVote.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const saveCommentToDatabase = async () => {
      const feedback_id = store.state.feedback_active.id;
      try {
        const { error } = await supabase.from("feedback_comments").insert([
          {
            id: id.value,
            comment: editor.value.getJSON(),
            votes: [`${initialVote.value[0].id}`],
            created_by: store.state.activeUser.id,
            feedback_id: store.state.feedback_active.id,
            project_id: store.state.feedback_active._project.id,
            organization_id: store.state.organization,
          },
        ]);
        if (error) throw error;
        store.dispatch("getComments", {
          feedback_id,
        });
      } catch (error) {
        console.log(error);
      }
    };

    return { props, editor, comment, store, saveToDatabase };
  },
  methods: {},
};
</script>
x
<style lang="scss">
.comment {
  display: flex;
  width: 100%;
  background-color: white;
  .comment__editor {
    position: relative;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    padding: 1px;
    .expandEditor {
      height: 140px;
    }
    .editor {
      max-height: 320px;
      display: block;
      max-width: 100%;
      min-width: 100%;
      resize: none;
      padding: 12px 100px 12px 12px;
      border-radius: 4px;
      overflow-y: auto;
      .ProseMirror {
        height: 100%;
        h1 {
          font-size: 18px;
          margin: 4px 0 4px 0;
        }
        p {
          color: #383c4e;
          margin: 2px 0 2px 0;
        }
      }
    }
    .editorActive {
      border: 1px solid #212430;
    }
  }
  .comment__actions {
    display: flex;
    align-items: flex-end;
    position: absolute;
    right: 28px;
    bottom: 25px;
    .btn {
      display: flex;
      align-items: flex-end;
      display: flex;
      align-items: flex-end;
      border: none;
      background: #3253e4;
      color: white;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 12px;
      border-radius: 3px;
    }
    .disabled {
      background: #e9e6e6;
      color: #979ebe;
    }
    .btn:hover {
      cursor: pointer;
      background: #2a4ad4;
    }
    .disabled:hover {
      cursor: not-allowed;
      background: #e9e6e6;
    }
  }
}

.comment__editor:focus-within {
  border: 2px solid #212430;
  border-radius: 5px;
  margin: -1px;
}

[contenteditable]:focus {
  outline: none;
}
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

[contenteditable="true"]:empty:not(:focus):before {
  content: attr(data-ph);
  color: grey;
  font-style: italic;
}

// Bubble Menu Styling

.tippy-content button {
  background: #212430;
  border: none;
  padding: 8px 8px 2px 8px;
  color: white;
  font-family: "Avenir Next";
  margin: 0 -1px;
}
.tippy-content button:hover {
  cursor: pointer;
  background: #383d50;
}
.tippy-content .is-active {
  svg {
    fill: #9bc9b3;
  }
}
</style>
