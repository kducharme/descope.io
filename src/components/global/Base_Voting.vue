<template>
  <div class="voting">
    <div class="right" id="voting">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="2 2 20 20"
        width="16px"
        :class="[feedback._vote_up ? 'disabled' : 'enabled', 'vote vote__up']"
        @click.stop="upVote(feedback)"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
      </svg>
      <p
        :class="[
          feedback._vote_up || feedback._vote_down
            ? 'count__active'
            : 'count__inactive',
          'count',
        ]"
      >
        {{ feedback._votes_total }}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="2 2 20 20"
        width="16px"
        :class="[
          feedback._vote_down ? 'disabled' : 'enabled',
          'vote vote__down',
        ]"
        @click.stop="downVote(feedback)"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import { supabase } from "../../supabase/init";

export default {
  name: "Base Voting",
  props: {
    feedback: {
      type: Object,
    },
  },
  components: {},

  data() {
    return {};
  },
  setup() {
    const saveVotesToDatabase = async (feedback) => {
      //
      // Update the up-vote array in the database
      try {
        const { error } = await supabase
          .from("feedback")
          .update({ votes_up: feedback.votes_up })
          .eq("id", feedback.id);
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
      //
      // Update the down-vote array in the database
      try {
        const { error } = await supabase
          .from("feedback")
          .update({ votes_down: feedback.votes_down })
          .eq("id", feedback.id);
        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    };
    const upVote = async (feedback) => {
      //
      // Check if the user HAS already up-voted the feedback...
      if (feedback.votes_up.includes(store.state.activeUser.id)) {
        //
        // If yes, remove them from the up-vote array
        const index = feedback.votes_up.indexOf(store.state.activeUser.id);
        feedback.votes_up.splice(index, 1);
        //
        // Update the vote property for the UI
        feedback._vote_up = null;
        feedback._vote_down = null;
        //
        //If the user HAS NOT up-voted the feedback...
      } else {
        //
        // Check if the user has down-voted the feedback
        if (feedback.votes_down.includes(store.state.activeUser.id)) {
          //
          // If yes, remove them from the down-vote array
          const index = feedback.votes_down.indexOf(store.state.activeUser.id);
          feedback.votes_down.splice(index, 1);

          feedback.votes_up.push(store.state.activeUser.id);
          feedback._vote_up = true;
          //
          // Update the vote property for the UI
          feedback._vote_down = null;
        } else {
          //
          // If the user HAS NOT voted at all, add them to the up-vote array
          feedback.votes_up.push(store.state.activeUser.id);
          feedback._vote_up = true;
        }
      }
      //
      // Calculate the total votes for this feedback
      feedback._votes_total =
        feedback.votes_up.length - feedback.votes_down.length;
      //
      // Save the votes to the database
      saveVotesToDatabase(feedback);
    };

    const downVote = async (feedback) => {
      //
      // Check if the user HAS already down-voted the feedback...
      if (feedback.votes_down.includes(store.state.activeUser.id)) {
        //
        // If yes, remove them from the down-vote array
        const index = feedback.votes_down.indexOf(store.state.activeUser.id);
        feedback.votes_down.splice(index, 1);
        //
        // Update the vote property for the UI
        feedback._vote_up = null;
        feedback._vote_down = null;
        //
        //If the user HAS NOT up-voted the feedback...
      } else {
        //
        // Check if the user has up-voted the feedback
        if (feedback.votes_up.includes(store.state.activeUser.id)) {
          //
          // If yes, remove them from the up-vote array
          const index = feedback.votes_up.indexOf(store.state.activeUser.id);
          feedback.votes_up.splice(index, 1);

          feedback.votes_down.push(store.state.activeUser.id);
          feedback._vote_down = true;
          //
          // Update the vote property for the UI
          feedback._vote_up = null;
        } else {
          //
          // If the user HAS NOT voted at all, addd them to the down-vote array
          feedback.votes_down.push(store.state.activeUser.id);
          feedback._vote_down = true;
        }
      }
      //
      // Calculate the total votes for this feedback
      feedback._votes_total =
        feedback.votes_up.length - feedback.votes_down.length;
      //
      // Save the votes in the database
      saveVotesToDatabase(feedback);
    };

    return {
      store,
      upVote,
      downVote,
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: #f3f4f7;
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
      width: 240px;
      margin: 0 16px 0 0;
      height: 100%;
      .card {
        box-shadow: 0px 1px 5px rgba(45, 62, 80, 0.12);
        background: white;
        border-radius: 12px;
      }
      .summary {
        display: flex;
        flex-direction: column;
        padding: 24px 20px;
        .title {
          font-size: 16px;
          font-weight: 600;
        }
        .analytics {
          .data {
            display: flex;
            flex-direction: column;
            border-top: 1px solid #dbdde6;
            padding: 20px 0 20px 0;
            .label {
              font-size: 12px;
              color: #636c92;
              font-weight: 600;
              margin: 0 0 8px;
            }
            .metric {
              font-size: 30px;
              font-weight: 500;
              // margin: 0 0 12px 0;
            }
            .chart {
              height: 132px;
              min-height: 132px;
            }
          }
          .data:first-child {
            border: none;
          }
          .data:last-child {
            padding: 24px 0 0 0;
          }
        }
      }
    }
    .content__bottom--right {
      width: 580px;
      max-width: 580px;
      margin: 0 0 0 16px;
      .card {
        box-shadow: 0px 1px 5px rgba(45, 62, 80, 0.12);
        background: white;
        border-radius: 12px;
      }
      .search {
        margin: 0 0 16px 0;
        position: relative;
        width: 100%;
        width: 580px;
        max-width: 580px;
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
      .fb:hover {
        cursor: pointer;
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
                font-weight: 600;
                letter-spacing: 1.1px;
                padding: 0 0 0 2px;
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
              background: #f4e4e1;
            }
            .category__request {
              background: #e7e8ee;
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
              font-size: 14px;
              font-weight: 500;
              margin: 0 4px;
              color: #7b82a3;
              font-family: "avenir next";
            }
            .count__active {
              font-weight: 600;
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
e