<template>
  <div class="page">
    <div class="content">
      <div class="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#7B82A3"
          class="search__input--icon"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <input
          type="text"
          v-model="search"
          class="search__input"
          placeholder="Search title, decription, category"
          @keyup="searchFeedback"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#7B82A3"
          class="search__input--reset"
          @click="resetSearch()"
          v-if="this.search"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          />
        </svg>
      </div>
      <div class="projects">
        <div
          v-for="project in store.state.teams_active_projects"
          :key="project.id"
          @click="setActiveProject(project.id)"
          class="proj"
        >
          <div class="title">
            <p class="name">
              {{ project.name }}
            </p>
            <div class="tag">
              <span
                class="status status__active"
                v-if="project.status === 'active'"
                >Active</span
              >
              <span
                class="status status__draft"
                v-if="project.status === 'draft'"
                >Draft</span
              >
            </div>
          </div>
          <p class="description">
            {{ project.description }}
          </p>
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
  data() {
    return {
      search: "",
    };
  },
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
  methods: {
    resetSearch() {
      this.search = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  background: #f3f4f7;
  min-height: calc(100vh - 102px);
  width: 100%;
  padding: 32px 100px;
}
.content {
  display: flex;
  flex-direction: column;
  max-width: 852px;
  .search {
    margin: 0 0 16px 0;
    position: relative;
    input {
      width: 100%;
      padding: 10px 10px 10px 36px;
      border-radius: 6px;
    }
    .search__input--icon {
      position: absolute;
      left: 10px;
      top: 10px;
    }
    .search__input--reset {
      position: absolute;
      right: 10px;
      top: 10px;
      padding: 2px;
    }
    svg:hover {
      fill: #212430;
    }
    .search__input--reset:hover {
      background: #eeeff3;
      border-radius: 3px;
      cursor: pointer;
    }
  }
  .projects {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin: 0;
    padding: 0;
    gap: 24px;
    .proj {
      display: flex;
      flex-direction: column;
      flex: 1 0 33%;
      @media (min-width: 40rem) {
        width: 50%;
      }
      @media (min-width: 56rem) {
        width: 33.3333%;
      }
      padding: 20px;
      box-shadow: 0px 1px 5px rgba(45, 62, 80, 0.12);
      background: white;
      border-radius: 12px;
      border: 2px solid white;
      max-width: calc(195px);
      // margin: 8px 16px 8px 0;

      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .name {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 12px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
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
      .description {
        font-size: 14px;
        color: #778ea7;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .proj:hover {
      border: 2px solid #3253e4;
      cursor: pointer;
    }
  }
}
</style>
