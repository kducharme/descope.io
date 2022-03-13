<template>
  <div class="page" v-if="!loading">
    <div class="content">
      <BaseEmptyState
        :title="empty_title"
        :body="empty_body"
        :buttonType="empty_button_type"
        :buttonPriority="empty_button_priority"
        :buttonText="empty_button_text"
        :buttonAction="showCreateFeedbackModal"
        class="subnav__button--secondary"
        v-if="store.state.teams_active_feedback.length === 0"
      />

      <div class="content__top"></div>
      <div
        class="content__bottom"
        v-if="store.state.teams_active_feedback.length > 0"
      >
        <!-- Left column -->
        <div class="content__bottom--left">
          <!-- Categories -->
          <div class="card summary">
            <p class="title">Categories</p>

            <div class="categories">
              <div
                :class="[cat.id === 'all' ? 'cat cat__active' : 'cat']"
                v-for="cat in categories"
                :key="cat.id"
                :id="`cat__${cat.id}`"
                @click="setFilter(cat.id)"
              >
                <div class="left">
                  <span :class="['dot', cat.style]"></span>
                  <p class="cat__title">{{ cat.title }}</p>
                </div>
                <p class="cat__count" v-if="cat.id !== 'all'">
                  {{
                    store.state.teams_active_feedback.filter((f) =>
                      f.category.includes(`${cat.id}`)
                    ).length
                  }}
                </p>
                <p class="cat__count" v-if="cat.id === 'all'">
                  {{ store.state.teams_active_feedback.length }}
                </p>
              </div>
            </div>
          </div>

          <!-- Feedback Summary -->
          <div class="card weekly">
            <p class="title">Summary</p>
            <div class="chart">
              <FeedbackChart />
            </div>
          </div>
        </div>

        <div class="content__bottom--right">
          <div class="actions">
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
                v-model="filter.search"
                class="search__input"
                placeholder="Search title, decription, category"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#7B82A3"
                class="search__input--reset"
                @click="resetSearch()"
                v-if="this.filter.search"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                />
              </svg>
            </div>
            <!-- <div class="filter">
              <BaseFilter />
            </div> -->
          </div>
          <div
            class="card fb"
            v-for="feedback in store.getters.filterFeedback(this.filter)"
            :key="feedback.id"
            @click="setActiveFeedback(feedback.id)"
            v-show="
              feedback.category === this.filter.category ||
              this.filter.category === 'all'
            "
          >
            <div class="fb__top">
              <div class="fb__top--left">
                <div class="left">
                  <p :class="['initials', feedback.profiles.color]">
                    {{ feedback._initials }}
                  </p>
                </div>
                <div class="right">
                  <p class="project" v-if="feedback.projects">
                    {{ feedback.projects.name }}
                  </p>
                  <p class="project" v-show="!feedback.projects">
                    {{ store.state.teams_active.name }} Team
                    <span class="team">(no project)</span>
                  </p>
                  <p class="details">
                    Added by {{ feedback._addedBy }} {{ feedback._dateAdded }}
                  </p>
                </div>
              </div>
              <div class="fb__top--right">
                <div
                  class="tag tag__issue"
                  v-if="feedback.category.includes('issue')"
                >
                  <span class="dot dot__issue"></span>
                  <p>Issue</p>
                </div>
                <div
                  class="tag tag__idea"
                  v-if="feedback.category.includes('idea')"
                >
                  <span class="dot dot__idea"></span>
                  <p>Idea</p>
                </div>
                <div
                  class="tag tag__question"
                  v-if="feedback.category.includes('question')"
                >
                  <span class="dot dot__question"></span>
                  <p>Question</p>
                </div>
              </div>
            </div>
            <div class="fb__mid">
              <p class="title">{{ feedback.title }}</p>
              <p class="description">{{ feedback.description }}</p>
              <img
                v-if="feedback._image"
                :src="feedback._image"
                class="image"
              />
            </div>
            <div class="fb__bottom">
              <div class="left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 0 24 24"
                  width="16px"
                  fill="#7B82A3"
                  class="comment"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
                  />
                </svg>
                <div class="comment__count" v-if="feedback.comments">
                  {{ feedback.comments.length }}
                </div>
              </div>
              <div class="right" id="voting" @click.stop>
                <BaseVoting :feedback="feedback" />
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
// import { ref } from "vue";
// import { supabase } from "../../supabase/init";
import { useRouter } from "vue-router";
import BaseEmptyState from "../../components/global/Base_Empty_State.vue";
import BaseVoting from "../../components/global/Base_Voting.vue";
// import BaseFilter from "../../components/global/Base_Filter.vue";
import FeedbackChart from "../../components/single/TheFeedbackChart.vue";

export default {
  name: "All Team Feedback",
  components: {
    BaseEmptyState,
    BaseVoting,
    // BaseFilter,
    FeedbackChart,
  },

  data() {
    return {
      loading: false,
      filter: {
        search: "",
        category: "all",
      },
      categories: [
        {
          id: "all",
          title: "All feedback",
          style: "cat__all",
        },
        {
          id: "idea",
          title: "Ideas",
          style: "dot__idea",
        },
        {
          id: "question",
          title: "Questions",
          style: "dot__question",
        },
        {
          id: "issue",
          title: "Issues",
          style: "dot__issue",
        },
        {
          id: "resolved",
          title: "Resolved",
          style: "dot__resolved",
        },
      ],
      empty_title: "Add your feedback",
      empty_body:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      empty_button_type: "submit",
      empty_button_priority: "Primary",
      empty_button_text: "Add feedback",
      empty_button_action: "showCreateFeedbackModal",
    };
  },
  setup() {
    //
    // Set initial data
    const router = useRouter();

    const routeToFeedbackDetails = (id) => {
      router.push({ name: "feedbackDetails", params: { feedbackId: id } });
    };

    // When a project is clicked, store the active project in Vuex
    const setActiveFeedback = (id) => {
      routeToFeedbackDetails(id);
    };

    return {
      store,
      setActiveFeedback,
    };
  },
  methods: {
    showCreateFeedbackModal() {
      store.dispatch("showCreateFeedbackModal");
    },
    resetSearch() {
      this.filter.search = "";
    },
    setFilter(id) {
      //
      // Remove any active filters
      this.categories.forEach((cat) => {
        document
          .querySelector(`#cat__${cat.id}`)
          .classList.remove("cat__active");
      });

      //
      // Set active filter value & styling
      document.querySelector(`#cat__${id}`).classList.add("cat__active");
      this.filter.category = id;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.page {
  background: #f1f3f7;
  min-height: calc(100vh - 102px);
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: calc(100vh - 102px);
  width: 100%;
  padding: 32px 100px;

  .content__bottom {
    display: flex;
    flex-direction: row;

    .content__bottom--left {
      width: 220px;
      margin: 0 16px 0 0;
      height: 100%;
      .card {
        border: 1px solid #dbdde6;
        background: white;
        border-radius: 12px;
      }
      .title {
        font-size: 16px;
        font-weight: 800;
      }
      .weekly {
        display: flex;
        flex-direction: column;
        padding: 24px 20px 24px;
      }
      .summary {
        display: flex;
        flex-direction: column;
        padding: 24px 20px 12px;
        margin: 0 0 16px;
      }
      .categories {
        display: flex;
        flex-direction: column;
        margin: 16px -4px 0 -4px;

        .cat {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          margin: 0 -8px;
          .cat__all {
            display: none;
          }
          .left {
            display: flex;
            align-items: center;
            padding: 0 0 0 16px;
            .dot {
              width: 8px;
              height: 8px;
              margin-right: 10px;
              border-radius: 100%;
            }
            .dot__issue {
              background: #eb5c6a;
            }
            .dot__idea {
              background: #0fa394;
            }
            .dot__question {
              background: #7172d8;
            }
            .dot__resolved {
              background: #cbcfe0;
            }
          }
          .cat__count {
            padding: 0 20px 0 0;
          }
        }

        .cat__active {
          background: #f1f3f7;
          font-weight: 500;
          border-radius: 6px;
        }
        .cat:hover {
          cursor: pointer;
          background: #f1f3f7;
          border-radius: 6px;
        }
      }
    }
    .content__bottom--right {
      width: 640px;
      max-width: 640px;
      margin: 0 0 0 12px;
      .card {
        // box-shadow: 0px 1px 5px rgba(45, 62, 80, 0.12);
        border: 1px solid #dbdde6;
        background: white;
        border-radius: 12px;
      }
      .actions {
        display: flex;
        justify-content: space-between;
        .filters {
          width: 88px;
          margin-left: 16px;
        }
        .search {
          margin: 0 0 16px 0;
          position: relative;
          width: 100%;
          width: 640px;
          max-width: 640px;
          input {
            width: 100%;
            padding: 10px 10px 10px 36px;
            border-radius: 12px;
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
      }
      .fb:hover {
        cursor: pointer;
        .title {
          text-decoration: underline;
        }
      }
      .fb {
        display: flex;
        flex-direction: column;
        margin: 0 0 16px;
        padding: 16px;
        .fb__top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .fb__top--left {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0 0 16px;
            .left {
              margin: 0 12px 0 0;
              .initials {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 32px;
                width: 32px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 800;
                letter-spacing: 1.1px;
                padding: 0 0 0 2px;
                // background: #e5e8ee;
              }
            }
            .right {
              display: flex;
              flex-direction: column;
              .project {
                font-weight: 800;
                font-size: 12px;
                margin: 0 0 2px;
              }
              .team {
                color: #9ba1bb;
                font-weight: 400;
                margin-left: 4px;
              }
              .details {
                font-size: 12px;
                color: #636c92;
              }
            }
          }
          .fb__top--right {
            .tag {
              padding: 4px 8px;
              border-radius: 3px;
              display: flex;
              align-items: center;
              flex-direction: row;
              background: #f4f5f8;
              border: 1px solid #e5e7ee;
              p {
                font-size: 12px;
                font-weight: 500;
                color: #636c92;
              }
            }
            .dot {
              width: 12px;
              height: 12px;
              margin-right: 4px;
              border-radius: 100%;
              border: 2px solid white;
            }
            .dot__issue {
              background: #eb5c6a;
            }
            .dot__idea {
              background: #0fa394;
            }
            .dot__question {
              background: #7172d8;
            }
          }
        }
        .fb__mid {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .title {
            font-size: 15px;
            font-weight: 800;
            margin: 0 0 6px 0;
          }
          .description {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #636c92;
          }
        }
        .image {
          margin: 16px 0 0 0;
          height: 170px;
          object-fit: cover;
          object-position: 10% 20%;
          border: 1px solid #dbdde6;
          border-radius: 12px;
        }
        .fb__bottom {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 12px 0 0 0;
          .left {
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;
            .comment {
              padding: 5px;
              margin: -5px;
            }
            .comment:hover {
              background: #eeeff3;
              border-radius: 3px;
              cursor: pointer;
            }
            svg:hover {
              fill: #212430;
            }
          }
          .comment__count {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: absolute;
            top: -8px;
            left: -4px;
            background: #212430;
            margin: 0 0 0 12px;
            border-radius: 100%;
            height: 16px;
            width: 16px;
            font-size: 11.5px;
            font-weight: 800;
          }

          .right {
            display: flex;
            flex-direction: row;
            align-items: center;
            .count {
              font-size: 14px;
              font-weight: 500;
              margin: 0 4px;
              color: #7b82a3;
            }
            .count__active {
              font-weight: 800;
              color: #424761;
            }
            .vote {
              padding: 4px;
            }
            .disabled {
              fill: #424761;
              stroke: #424761;
              stroke-width: 1px;
              border-radius: 5px;
            }

            .enabled {
              fill: #9398b4;
            }
            .enabled:hover {
              background: #eeeff3;
              border-radius: 3px;
              cursor: pointer;
              fill: #212430;
            }
          }
        }
      }
    }
  }
}
</style>
