<template>
  <div class="feedback">
    <TheAddFeedbackModal v-if="store.state.createFeedbackModal" />
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
    <div class="data">
      <!-- Table header -->
      <table class="table">
        <tr>
          <th class="col col__actions">
            <input type="checkbox" id="select" />
          </th>
          <th class="col col__priority">Priority</th>
          <th class="col col__details">Feedback</th>
          <th class="col col__time">Added</th>
          <th class="col col__assignedby">Added by</th>
        </tr>

        <!-- Table rows -->
        <tr v-for="feedback in store.state.feedback" :key="feedback.id">
          <td class="col col__actions">
            <input type="checkbox" id="select" />
          </td>

          <td class="col col__priority">
            <span class="tag tag__high" v-if="feedback.priority === 'High'">{{
              feedback.priority
            }}</span>
            <span class="tag tag__med" v-if="feedback.priority === 'Medium'">{{
              feedback.priority
            }}</span>
            <span class="tag tag__low" v-if="feedback.priority === 'Low'">{{
              feedback.priority
            }}</span>
          </td>

          <td class="col col__details">
            <div class="details">
              <span class="details__feedback">
                {{ feedback.description }}
              </span>
              <span class="details__project">Project name</span>
            </div>
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
</template>

<script>
// import { ref } from "vue";
import store from "../../store/index";
import BaseButton from "../../components/global/BaseButton.vue";
import TheAddFeedbackModal from "../../components/single/TheCreateFeedbackModal.vue";

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
      store.dispatch("showCreateFeedbackModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.feedback {
  display: flex;
  flex-direction: column;
  background: #eeeff3;
  height: calc(100vh - 102px);
  padding: 24px;
  width: 100%;
  .actions {
    display: flex;
    justify-content: space-between;
    margin: 0 0 24px;
    .actions__filters {
      display: flex;
      width: 50%;
      .form__select {
        background: white;
        border: 2px solid #dbdde6;
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
  .data {
    display: flex;
    flex-direction: column;
    width: 100%;
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
      height: 48px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 8px;
    }
    tr {
      background: white;
    }
    .col {
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
      .col__image--asset {
        height: 32px !important;
        width: 32px;
        object-fit: cover;
        object-position: 50% 25%;
      }
    }
    .col__details {
      max-width: 220px;
      .details {
        display: flex;
        flex-direction: column;
        .details__project {
          font-size: 13px;
          color: #778ea7;
        }
      }
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
        background: #f5e5a3;
      }
      .tag__med {
        background: #ffc799;
      }
      .tag__high {
        background: #e09099;
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
