<template>
  <div class="page">
    <div class="actions">
      <div class="actions__filters">Filters go here</div>
      <div class="actions__buttons">Actions go here</div>
    </div>
    <div class="feedback">
      <table class="table">
        <tr>
          <th class="col col__actions">
            <input type="checkbox" id="select" name="vehicle1" value="Bike" />
          </th>
          <th class="col col__image">Image</th>
          <th class="col col__details">Details</th>
          <th class="col col__priority">Priority</th>
          <th class="col col__assignedto">Assignee</th>
          <th class="col col__assignedby">Added by</th>
        </tr>
        <tr>
          <td class="col col__actions">
            <input type="checkbox" id="select" name="vehicle1" value="Bike" />
          </td>
          <td class="col col__image">Img here</td>
          <td class="col col__details">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti
          </td>
          <td class="col col__priority">Pre-Launch</td>
          <td class="col col__assignedto">Corbin Thomas</td>
          <td class="col col__assignedby">Cam Robert</td>
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
      border: 0.5px solid #e2e2e25f;
    }
    th,
    td {
      text-align: left;
      padding: -1px;
      border-top: 0.5px solid #e2e2e25f;
      border-bottom: 0.5px solid #e2e2e25f;
    }
    th {
      height: 40px;
      background: #292a2c;
      font-size: 13px;
      font-weight: 400;
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
      width: 32px;
    }
    .col__details {
      width: 32px;
    }
    .col__priority {
      width: 32px;
    }
    .col__assignedto {
      width: 100px;
    }
    .col__assignedby {
        width: 100px;
    }
  }
}
</style>
