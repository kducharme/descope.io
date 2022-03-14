<template>
  <div class="modal" id="createLaunch">
    <div class="modal__content">
      <!-- Create Launch Form -->
      <div class="header" id="createLaunchHeader">
        <p class="header__title">Add launch</p>
        <div class="header__close" @click="closeModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            width="18px"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
            />
          </svg>
        </div>
      </div>
      <div class="form">
        <TheCreateLaunchForm />
        
      </div>
    </div>
  </div>
</template>

<script>
import TheCreateLaunchForm from "./The_Create_Launch_Form.vue";
import store from "../../store/index";

export default {
  name: "TheAddLaunchModal",
  components: {
    TheCreateLaunchForm,
  },
  data() {
    return {};
  },
  setup() {
    const closeModal = () => {
      store.dispatch("hideCreateLaunchModal");
    };
    return { closeModal };
  },
  mounted() {
    const draggable = () => {
      // Make the DIV element draggable:
      const element = document.querySelector("#createLaunch");

      var PADDING = 8;

      var rect;
      var viewport = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      };

      function dragElement(elmnt) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        if (document.getElementById(elmnt.id + "Header")) {
          /* if present, the header is where you move the DIV from:*/
          document.getElementById(elmnt.id + "Header").onmousedown =
            dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
          e = e || window.event;
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;

          // store the current viewport and element dimensions when a drag starts
          rect = elmnt.getBoundingClientRect();
          viewport.bottom = window.innerHeight - PADDING;
          viewport.left = PADDING;
          viewport.right = window.innerWidth - PADDING;
          viewport.top = PADDING;

          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          document.querySelector("body").classList.add("noScroll");
          e = e || window.event;
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;

          // check to make sure the element will be within our viewport boundary
          var newLeft = elmnt.offsetLeft - pos1;
          var newTop = elmnt.offsetTop - pos2;

          if (
            newLeft < viewport.left ||
            newTop < viewport.top ||
            newLeft + rect.width > viewport.right ||
            newTop + rect.height > viewport.bottom
          ) {
            // the element will hit the boundary, do nothing...
          } else {
            // set the element's new position:
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
          }
        }

        function closeDragElement() {
          document.querySelector("body").classList.remove("noScroll");
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
      dragElement(element);
    };
    draggable();
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 99999;
  background: white;
  box-shadow: 0px 1px 8px rgba(45, 62, 80, 0.22);
  border-radius: 12px;
  max-width: 460px;
  min-width: 460px;
  min-height: calc(361px + 40px);
  max-height: calc(361px + 40px);
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #212430;
    padding: 8px 16px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .header__title {
      font-size: 14px;
      font-weight: 800;
      color: white;
    }
    .header__close {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      width: 24px;
      border-radius: 100%;
    }
    .header__close:hover {
      background: #393e53;
      cursor: pointer;
    }
  }
  .header:hover {
    cursor: move;
  }
  .form {
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    width: 460px;
    option:selected {
      color: red;
    }
    input,
    textarea,
    select {
      border: none;
      resize: none;
    }
    .form__description {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      // height: 160px;
      width: 100%;
    }
    .form__image {
      border-bottom: 1px solid #dbdde6;
    }
    .form__input {
      display: flex;
      flex-direction: column;
      .title {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
        padding: 0;
        background: white;
        margin: 0 0 12px 0;
      }
      .title::placeholder {
        color: #868fac;
      }
      .title:active,
      .title:focus {
        border: none;
        outline: none;
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .form__button {
        margin: 8px 0 0;
        max-width: 88px;
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