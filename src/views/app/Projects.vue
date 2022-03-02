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
          placeholder="Search name or decription"
          @keyup="searchProjects"
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
      <div class="cards">
        <div
          class="cards__item"
          v-for="project in store.getters.searchProjects(this.search)"
          :key="project.id"
          @click="setActiveProject(project.id)"
        >
          <div class="card">
            <div class="card__content">
              <div class="header">
                <p class="card__name">{{ project.name }}</p>
                <p class="card__description">
                  {{ project.description }}
                </p>
              </div>
              <div class="footer">
                <div class="data">
                  <p class="label">Issues</p>
                  <p class="metric">
                    {{
                      project.feedback.filter((f) =>
                        f.category.includes("issue")
                      ).length
                    }}
                  </p>
                </div>
                <div class="data">
                  <p class="label">Requests</p>
                  <p class="metric">
                    {{
                      project.feedback.filter((f) =>
                        f.category.includes("request")
                      ).length
                    }}
                  </p>
                </div>
                <div class="data">
                  <p class="label">Questions</p>
                  <p class="metric">
                    {{
                      project.feedback.filter((f) =>
                        f.category.includes("question")
                      ).length
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  background: #f3f4f7;
  min-height: calc(100vh - 102px);
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 80px;
  max-width: 880px;
  min-width: 720px;
}

.search {
  margin: 0 0 16px 0;
  position: relative;
  width: calc(100% - 20px);
  min-width: 700px;
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

.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  // justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  // gap: auto;
}

.cards__item {
  display: flex;
  padding: 0.7rem;
  height: 240px;
  @media (min-width: 40rem) {
    width: 50%;
  }
  @media (min-width: 56rem) {
    width: 33.3333%;
  }
}

.card {
  background-color: white;
  border: 2px solid white;
  border-radius: 12px;
  box-shadow: 0px 1px 5px rgba(45, 62, 80, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &:hover {
    .card__image {
      filter: contrast(100%);
    }
  }
  .card__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    .header {
      display: flex;
      flex-direction: column;
      .card__name {
        font-size: 15px;
        font-weight: 600;
        margin: 0 0 12px 0;
      }
      .card__description {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #636c92;
        line-height: 1.4;
        height: 60px;
      }
    }
    .footer {
      display: flex;
      margin: 16px 0 0 0;
      .data {
        margin: 0 22px 0 0;
        .label {
          font-size: 11px;
          color: #636c92;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .metric {
          font-size: 14px;
          font-weight: 500;
          // margin: 0 0 12px 0;
        }
      }
    }
  }
}
.card:hover {
  cursor: pointer;
  .card__name {
    text-decoration: underline;
  }
}
</style>
