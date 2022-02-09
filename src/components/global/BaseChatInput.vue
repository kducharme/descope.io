<template>
  <div class="chatEditor">
    <bubble-menu :editor="editor" v-if="editor">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet List
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </button>
    </bubble-menu>
    <editor-content :editor="editor" v-model="comment" class="editor" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";

export default {
  name: "BaseButton",
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
  setup(props) {
    // Setup data
    const comment = ref(null);

    const editor = useEditor({
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Heading.configure({
          levels: [1, 2, 3],
        }),
      ],
      content: "<p>Example Text</p>",
      autofocus: true,
      editable: true,
      injectCSS: false,
    });

    return { props, editor, comment };
  },
};
</script>
x
<style lang="scss">
.chatEditor {
  width: 100%;
  height: 120px;
  .editor {
    height: 100%;
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
    border: 1px solid #dbdbdb;
    display: block;
    max-width: 100%;
    min-width: 100%;
    resize: vertical;
    padding: 12px;
    background-color: white;
    border-radius: 4px;
    .ProseMirror {
        height: 100%;
        h1 {
            font-size: 20px;
            margin: 4px 0 4px 0;
        }
        h2 {
            font-size: 16px;
            margin: 4px 0 4px 0;
        }
        p {
            color: #383c4e;
            margin: 2px 0 2px 0;

        }
    }
  }
}
[contenteditable]:focus {
    outline: 0px solid transparent;
}
.menu {
  background: red;
}
</style>
