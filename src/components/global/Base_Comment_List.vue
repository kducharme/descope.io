<template>
  <div class="comment">
    <div class="comment__left">
      <p :class="[props.comment.profiles.color, initials]">
        {{ props.comment._initials }}
      </p>
    </div>
    <div class="comment__right">
      <div class="details">
        <p class="name">{{ props.comment._addedBy }}</p>
        <p class="time">{{ props.comment._dateAdded }}</p>
      </div>
      <editor-content :editor="editor" class="content" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default {
  name: "BaseCommentInput",
  components: {
    EditorContent,
  },
  props: {
    comment: {
      type: Object,
    },
  },
  setup(props) {
    // Setup data
    const initials = ref(null);

    const editor = useEditor({
      editable: false,
      content: props.comment.comment,
      extensions: [StarterKit],

    });

    const initialStyling = () => {
      initials.value = 'initials'
    }

    initialStyling();

    return { props, editor, initials };
  },
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  flex-direction: row;
  margin: 0 0 12px;
  box-shadow: 0px 1px 5px rgba(45, 62, 80, 0.12);
  padding: 16px;
  border-radius: 6px;
  .comment__left {
    margin: 0 12px 0 0;
    .initials {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1.1px;
      padding: 0 0 0 2px;
    }
  }
  .comment__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .details {
      display: flex;
      margin: 0 0 4px 0;
      .name {
        font-size: 13px;
        font-weight: 600;
        margin: 0 4px 0 0;
      }
      .time {
        font-size: 13px;
        color: #636c92;
      }
    }
    .content {
    }
  }
}
</style>
