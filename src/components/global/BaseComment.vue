<template>
  <div class="comment">
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default {
  name: "BaseCommentInput",
  components: {
    EditorContent,
  },
  props: {
    comment: {
      type: String,
    },
    created_by: {
      type: String,
    },
    created_date: {
      type: Function,
    },
    votes: {
      type: Array,
    },
  },
  setup(props) {
    const editor = useEditor({
      editable: false,
      content: props.comment,
      extensions: [StarterKit],
    });
    return { props, editor };
  },
};
</script>

<style lang="scss">
.comment {
    margin:0 0 16px;
}
</style>
