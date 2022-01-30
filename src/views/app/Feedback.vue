<template>
  <div class="feedback">
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
        <!-- Table header -->
        <table class="table">
          <tr>
            <th class="col col__actions">
              <input type="checkbox" id="select" />
            </th>
            <th class="col col__source">Source</th>
            <th class="col col__image">Image</th>
            <th class="col col__details">Notes</th>
            <th class="col col__priority">Priority</th>
            <th class="col col__time">Added</th>
            <th class="col col__assignedby">Added by</th>
          </tr>

          <!-- Table rows -->
          <tr v-for="feedback in store.state.feedback" :key="feedback.id">
            <td class="col col__actions">
              <input type="checkbox" id="select" />
            </td>
            <td class="col col__source">{{ feedback.source }}</td>
            <td class="col col__image">
              <img :id="`img_${feedback.id}`" :src="`${feedback._image}`" class="col__image--asset" />
            </td>
            <td class="col col__details">
              {{ feedback.description }}
            </td>
            <td class="col col__priority">
              <span class="tag tag__high" v-if="feedback.priority === 'High'">{{ feedback.priority }}</span>
              <span class="tag tag__med" v-if="feedback.priority === 'Medium'">{{ feedback.priority }}</span>
              <span class="tag tag__low" v-if="feedback.priority === 'Low'">{{ feedback.priority }}</span>
            </td>
            <td class="col col__time">{{ feedback._dateAdded }}</td>
            <td class="col col__assignedby">
              <span class="initials">{{ feedback._initials }}</span>
              {{ feedback._addedBy }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import store from "../../store/index";
import BaseButton from "../../components/global/BaseButton.vue";
import TheAddFeedbackModal from "../../components/single/TheAddFeedbackModal.vue";

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
    // Define variables

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
.feedback {
  display: flex;
  flex-direction: column;
  background: #eeeff3;
  height: calc(100vh - 100px);
  padding: 24px;
  .actions {
    display: flex;
    justify-content: space-between;
    .actions__filters {
      display: flex;
      width: 50%;
      .form__select {
        background: white;
        border: 2px solid #DBDDE6;
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
      // width: calc(100vw - 220px - 48px);
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
    .col__source {
      width: 120px;
      max-width: 100px;
    }
    .col__image {
      width: 48px;
      .col__image--asset{
        height: 32px !important;
        width: 32px;
        object-fit: cover;
        object-position: 50% 25%;
      }
    }
    .col__details {
      max-width: 220px;
    }
    .col__priority {
      width: 72px;
      max-width: 72px;
      .tag {
        color: #212430;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 11.5px;
        font-weight: 500;
      }
      .tag__low {
        background: #F5E5A3;
      }
      .tag__med {
        background: #FFC799;
      }
      .tag__high {
        background: #E09099;
      }
    }
    .col__time {
      width: 88px;
      max-width: 88px;
    }
    .col__assignedby {
      width: 120px;
      max-width: 130px;
      .initials {
        background: #ced1de;
        color: white;
        height: 32px;
        border-radius: 100%;
        padding: 6px;
        font-size: 11.5px;
        font-weight: 600;
        margin-right: 4px;
      }
    }
  }
}
</style>
