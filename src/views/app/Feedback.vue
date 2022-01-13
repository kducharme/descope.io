<template>
  <div class="page">
    <TheAddFeedbackModal v-if="store.state.addFeedbackModal" />
    <div class="actions">
      <div class="actions__filters">
        <div class="form__input">
          <div class="form__select" id="team">Search</div>
        </div>
      </div>
      <div class="actions__buttons">
        <BaseButton
          :priority="priority"
          :text="text"
          :action="showAddFeedbackModal"
          class="actions__create"
        />
      </div>
    </div>
    <div class="feedback">
      <!-- Outstanding feedback -->
      <div class="feedback__outstanding">
        <!-- <h2 class="title">Outstanding</h2> -->
        <table class="table">
          <tr>
            <th class="col col__actions">
              <input type="checkbox" id="select" />
            </th>
            <th class="col col__image">Source</th>
            <th class="col col__image">Image</th>
            <th class="col col__details">Notes</th>
            <th class="col col__priority">Priority</th>
            <th class="col col__time">Added</th>
            <th class="col col__assignedby">Added by</th>
          </tr>
          <tr>
            <td class="col col__actions">
              <input type="checkbox" id="select" />
            </td>
            <td class="col col__source">LaunchDocs</td>
            <td class="col col__image">
              <img
                src="../../assets/images/feedback.png"
                class="col__image--asset"
              />
            </td>
            <td class="col col__details">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </td>
            <td class="col col__priority"><span class="tag">High</span></td>
            <td class="col col__time">24 min ago</td>
            <td class="col col__assignedby">
              <span class="initials">CR</span>Camden Ducharme
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../components/global/BaseButton.vue";
import TheAddFeedbackModal from "../../components/single/TheAddFeedbackModal.vue";
import store from "../../store/index";

export default {
  name: "Launch Feedback",
  components: {
    BaseButton,
    TheAddFeedbackModal,
  },
  data() {
    return {
      priority: "Secondary",
      text: "Add feedback",
    };
  },
  setup() {
    return { store };
  },
  methods: {
    showAddFeedbackModal() {
      store.dispatch("showAddFeedbackModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  margin: 24px;
  .actions {
    display: flex;
    justify-content: space-between;
    margin: 0 0 24px;
    .actions__filters {
      display: flex;
      width: 50%;
      .form__select {
        background: white;
        border: 2px solid #cfd2de;
        padding: 8px;
        width: 220px;
        border-radius: 3px;
      }
    }
    .actions__buttons {
      display: flex;
      justify-content: flex-end;
      width: 50%;
    }
  }
  .feedback {
    display: flex;
    flex-direction: column;
    .feedback__completed {
      margin: 32px 0 0;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 16px;
    }
    table {
      border-collapse: collapse;
      //   border: 0.5px solid #e2e2e25f;
    }
    th,
    td {
      text-align: left;
      padding: -1px;
    }
    th {
      height: 36px;
      font-size: 13px;
      font-weight: 600;
    }
    td {
      border-top: 1px solid #eeeff3;
      border-bottom: 1px solid #eeeff3;
      height: 44px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 8px;
    }
    .table {
      width: calc(100vw - 240px - 48px);
    }
    .col {
      // display: flex;
      // align-items: center;
      padding-left: 8px;
    }
    .col__actions {
      width: 24px;
      min-width: 24px;
    }
    .col__image {
      width: 48px;
    }
    .col__image--asset {
      height: 32px;
      object-fit: cover;
      object-position: 50% 25%;
    }
    .col__details {
      max-width: 240px;
    }
    .col__priority {
      width: 64px;
      max-width: 64px;
      .tag {
        background: #cf4d6f;
        color: white;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 13px;
      }
    }
    .col__time {
      width: 80px;
    }
    .col__assignedby {
      width: 140px;
      .initials {
        background: #3d52d5;
        color: white;
        height: 32px;
        border-radius: 100%;
        padding: 6px;
        font-size: 12px;
        font-weight: 600;
        margin-right: 8px;
      }
    }
  }
}
</style>
