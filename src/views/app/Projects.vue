<template>
  <div class="content">
    <div class="actions">
      <div class="actions__filters">
        <div class="form__input">
          <div class="form__select" id="team">Search</div>
        </div>
      </div>
      <div class="actions__buttons">
      </div>
    </div>
    <div class="projects">
      <div
        v-for="project in store.state.projects"
        :key="project.id"
        @click="setActiveProject(project.id)"
        class="proj"
      >
        <div class="col col__1">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#212430"
            >
              <g><rect fill="none" height="24" width="24" /></g>
              <g>
                <g>
                  <path
                    d="M5,5h2v3h10V5h2v5h2V5c0-1.1-0.9-2-2-2h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5C3.9,3,3,3.9,3,5v14 c0,1.1,0.9,2,2,2h6v-2H5V5z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,3,12,3z"
                  />
                  <polygon
                    points="21,11.5 15.51,17 12.5,14 11,15.5 15.51,20 22.5,13"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div class="col col__2">
          <p class="name">
            {{ project.name }}
          </p>
          <p class="description">
            {{ project.description }}
          </p>
        </div>
        <div class="col col__3">
          <span class="status status__active" v-if="project.status === 'active'"
            >Active</span
          >
          <span class="status status__draft" v-if="project.status === 'draft'"
            >Draft</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import { useRouter } from "vue-router";

export default {
  name: "Projects",
  setup() {
    // Crate data
    const router = useRouter();

    const routeToActiveProject = (id) => {
      router.push({ name: "project", params: { projectId: id } });
    };

    // When a project is clicked, store the active project in Vuex
    const setActiveProject = (id) => {
      store.dispatch("setActiveProject", {
        id,
      });
      routeToActiveProject(id);
    };
    return { store, setActiveProject };
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  background: #eeeff3;
  min-height: calc(100vh - 102px);
  padding: 24px;
  .actions {
    display: flex;
    justify-content: space-between;
    margin: 0 0 24px 0;
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
  .projects {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .proj {
      display: flex;
      width: 100%;
      align-items: center;
      background: white;
      border: 1px solid #dbdde6;
      margin: 0 0 -1px;
      padding: 16px;
      .col {
        margin-right: 16px;
      }
      .col__1 {
        display: flex;
        .icon {
          align-items: center;
          justify-content: center;
          display: flex;
          width: 36px;
          height: 36px;
          background: #e6e8ef;
          font-size: 12px;
          font-weight: 600;
          border-radius: 100%;
        }
      }
      .col__2 {
        display: flex;
        flex-direction: column;
        width: 400px;
        .name {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }
        .description {
          font-weight: 400;
          font-size: 13px;
          color: #778ea7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .col__3 {
        .status {
          padding: 4px 6px;
          border-radius: 3px;
          font-size: 11.5px;
          font-weight: 500;
        }
        .status__active {
          background: #d2f1e4;
        }
        .status__draft {
          background: #eeeff3;
        }
      }
    }
    .proj:hover {
      background: #f3f4f7;
      cursor: pointer;
    }
  }
}
</style>
