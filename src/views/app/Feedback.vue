<template>
  <div class="page">
    <div class="actions">
      <div class="actions__filters">Filters go here</div>
      <div class="actions__buttons">Actions go here</div>
    </div>
    <div class="feedback">
      <table class="table">
        <tr>
          <th class="col__actions">[ ]</th>
          <th class="image">Image</th>
          <th class="col__details">Details</th>
          <th class="col__priority">Priority</th>
          <th class="col__assignedto">Assigned to</th>
          <th class="col__assignedby">Assigned to</th>
        </tr>
        <tr>
          <td class="col__actions">[ ]</td>
          <td class="col__image">Img here</td>
          <td class="col__details">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti
          </td>
          <td class="col__priority">Pre-Launch</td>
          <td class="col__assignedto">Corbin Thomas</td>
          <td class="col__assignedby">Cam Robert</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Launch Feedback",
  setup() {},
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
      width: 50%;
    }
    .actions__buttons {
      display: flex;
      justify-content: flex-end;
      width: 50%;
    }
  }
  .feedback {
    display: flex;
    table {
      border-collapse: collapse;
    }
    th,
    td {
      text-align: left;
      padding: -1px;
      border: 0.5px solid #e2e2e25f;
    }
    th {
      height: 40xp;
      background: #252628;
    }
    td {
      height: 38px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .table {
      width: calc(100vw - 240px - 48px);
    }
    .col__actions {
      width: 32px;
      min-width: 32px;
    }
    .col__image {
      width: 32px;
    }
    .col__details {
      width: 32px;
    }
    .col__priority {
      width: 32px;
    }
    .col__assignedto {
      width: 32px;
    }
    .col__assignedby {
      width: 32px;
    }
  }
}
</style>
