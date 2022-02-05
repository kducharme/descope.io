<template>
  <div class="content">
    <div class="content__top"></div>
    <div class="content__bottom">
      <div class="content__bottom--left">
        <div class="card summary">
          <div class="header">
            <div class="header__bg"></div>
            <div class="header__avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 0 24 24"
                width="30px"
                fill="#B7BBCC"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M12 7V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-8zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm9 12h-7v-2h2v-2h-2v-2h2v-2h-2V9h7c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1zm-1-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
                />
              </svg>
            </div>
            <p class="header__title">Feedback</p>
          </div>
          <div class="filters">
            <div class="filter">
              <p class="filter__title">Debt</p>
              <p class="filter__count">
                {{
                  store.state.feedback.filter((f) =>
                    f.category.includes("issue")
                  ).length
                }}
              </p>
            </div>
            <div class="filter debt">
              <p class="filter__title">Design</p>
              <p class="filter__count">
                {{
                  store.state.feedback.filter(
                    (f) => f.category == "issue_design"
                  ).length
                }}
              </p>
            </div>
            <div class="filter debt">
              <p class="filter__title">Product</p>
              <p class="filter__count">
                {{
                  store.state.feedback.filter(
                    (f) => f.category == "issue_product"
                  ).length
                }}
              </p>
            </div>
            <div class="filter debt">
              <p class="filter__title">Technical</p>
              <p class="filter__count">
                {{
                  store.state.feedback.filter(
                    (f) => f.category == "issue_technical"
                  ).length
                }}
              </p>
            </div>
            <div class="filter">
              <p class="filter__title">Feature Request</p>
              <p class="filter__count">
                {{
                  store.state.feedback.filter(
                    (f) => f.category == "request_feature"
                  ).length
                }}
              </p>
            </div>
          </div>

          <div class="actions"></div>
        </div>
      </div>

      <div class="content__bottom--right">
        <div class="actions">
          <div class="actions__search">
            <input
              type="text"
              v-model="search"
              class="actions__search--input"
              placeholder="Search feedback"
              @keyup="searchFeedback"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#7B82A3"
              class="actions__search--reset"
              @click="resetSearch()"
              v-if="this.search"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
              />
            </svg>
          </div>
          <div class="sort">
            <p class="sort__text">Sort by:</p>
            <div class="sort__value">
              <p class="sort__value--text">Votes</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#7B82A3"
                class="sort__value--icon"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="card fb"
          v-for="feedback in store.getters.getFeedback(this.search)"
          :key="feedback.id"
        >
          <div class="fb__top">
            <div class="fb__top--left">
              <div class="left">
                <p class="initials">{{ feedback._initials }}</p>
              </div>
              <div class="right">
                <p class="project" v-if="feedback._project">
                  {{ feedback._project.name }}
                </p>
                <p class="project" v-if="!feedback._project">
                  {{ store.state.teams_active_data.name }} Team
                  <span class="team">(no project)</span>
                </p>
                <p class="details">
                  Added by {{ feedback._addedBy }} {{ feedback._dateAdded }}
                </p>
              </div>
            </div>
            <div class="fb__top--right">
              <p
                class="tag category__issue"
                v-if="feedback.category === 'issue_design'"
              >
                Design Debt
              </p>
              <p
                class="tag category__issue"
                v-if="feedback.category === 'issue_product'"
              >
                Product Debt
              </p>
              <p
                class="tag category__issue"
                v-if="feedback.category === 'issue_technical'"
              >
                Tech Debt
              </p>
              <p
                class="tag category__request"
                v-if="feedback.category === 'request_feature'"
              >
                Feature Request
              </p>
            </div>
          </div>
          <div class="fb__mid">
            <p class="title">{{ feedback.title }}</p>
            <p class="description">{{ feedback.description }}</p>
          </div>
          <div class="fb__image" v-if="feedback._image">
            <img :src="feedback._image" />
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
            <div class="right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#7B82A3"
                class="vote vote__up"
                @click="upVote(feedback)"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
                />
              </svg>
              <p class="count">{{ feedback.votes.length }}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#7B82A3"
                class="vote vote__down"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import store from "../../store/index";
import { supabase } from "../../supabase/init";

export default {
  name: "All Team Feedback",
  components: {},
  data() {
    return {
      search: "",
      feedback: [],
    };
  },
  setup() {
    // Define variables
    // const search = ref(null);
    // const results = ref(null);

    const upVote = async (fb) => {
      fb.votes++;
      try {
        const { error } = await supabase.from("feedback_votes").insert([
          {
            feedback_id: fb.id,
          },
        ]);
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    };

    return { store, upVote };
  },
  methods: {
    showCreateFeedbackModal() {
      store.dispatch("showCreateFeedbackModal");
    },
    resetSearch() {
      this.search = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: calc(100vh - 102px);
  width: 100%;
  padding: 32px 80px;
  background: #eeeff3;

  .card {
    border: 1px solid #dbdde6;
    background: white;
    border-radius: 8px;
  }
  .content__bottom {
    display: flex;
    flex-direction: row;
    .content__bottom--left {
      width: 230px;
      margin: 0 12px 0 0;
      height: 100%;
      position: -webkit-sticky; /* Safari */
      position: sticky;
      top: 24px;
      .summary {
        .header {
          display: flex;
          flex-direction: column;
          margin: 0 0 12px 0;
          .header__bg {
            height: 48px;
            width: 100%;
            background-image: linear-gradient(to right, #3253e4, #627df3);
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            position: relative;
          }
          .header__avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: absolute;
            height: 72px;
            width: 72px;
            top: 16px;
            left: 16px;
            border-radius: 100%;
            background: #dbdde6;
            border: 4px solid white;
            font-weight: 600;
            font-size: 13px;
          }
          .header__title {
            font-size: 16px;
            font-weight: 600;
            padding: 56px 16px 0;
          }
        }
        .filters {
          padding: 0 16px 16px;
          .filter {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 16px 0;
          }
          .debt {
            .filter__title,
            .filter__count {
              font-size: 13px;
              color: #7981a4;
              font-weight: 400;
            }
            .filter__title {
              padding: 0 0 0 8px;
            }
          }
          .filter__title,
          .filter__count {
            font-weight: 500;
          }
          .filter:last-child {
            margin: 16px 0 0 0;
          }
        }
      }
    }
    .content__bottom--right {
      width: 540px;
      max-width: 540px;
      margin: 0 0 0 12px;
      .actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 16px 0;
        .actions__search {
          position: relative;
          width: calc(100% - 150px);
          .actions__search--input {
            border: 1px solid #dbdde6;
            border-radius: 5px;
            width: 100%;
          }
          .actions__search--reset {
            position: absolute;
            right: -12px;
            top: 8px;
            padding: 2px;
          }
          .actions__search--reset:hover {
            background: #eeeff3;
            border-radius: 3px;
            cursor: pointer;
          }
          svg:hover {
            fill: #212430;
          }
        }
        .sort {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 150px;
          .sort__text {
            font-size: 13px;
            color: #777f9c;
            font-weight: 400;
            margin: 0 6px 0 0;
          }
          .sort__value {
            display: flex;
            align-items: center;
            .sort__value--text {
              font-weight: 600;
              margin: 0 -2px 0 0;
            }
          }
        }
      }
      .fb {
        display: flex;
        flex-direction: column;
        margin: 0 0 12px;
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
              margin: 0 8px 0 0;
              .initials {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #b6bbcd;
                color: white;
                height: 32px;
                width: 32px;
                border-radius: 100%;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 1.1px;
              }
            }
            .right {
              display: flex;
              flex-direction: column;
              .project {
                font-weight: 600;
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
              padding: 4px 6px;
              border-radius: 3px;
              font-size: 11.5px;
              font-weight: 500;
            }
            .category__issue {
              background: #f1c7cc;
            }
            .category__request {
              background: #eeeff3;
            }
          }
        }
        .fb__mid {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .title {
            font-size: 15px;
            font-weight: 600;
            margin: 0 0 6px 0;
          }
          .description {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #636c92;
          }
        }
        .fb__image {
          margin: 16px 0 0 0;
          img {
            width: 100%;
            height: 170px;
            object-fit: cover;
            object-position: 10% 20%;
            border: 1px solid #dbdde6;
            border-radius: 5px;
          }
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
            font-weight: 600;
          }

          .right {
            display: flex;
            flex-direction: row;
            align-items: center;
            .count {
              font-size: 12px;
              font-weight: 600;
              margin: 0 4px;
            }
            .vote {
              padding: 2px;
            }
            .vote__up:hover,
            .vote__down:hover {
              background: #eeeff3;
              border-radius: 3px;
              cursor: pointer;
            }
            svg:hover {
              fill: #212430;
            }
          }
        }
      }
    }
  }
}
</style>
