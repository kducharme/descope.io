import { createRouter, createWebHistory } from "vue-router";

// Marketing pages
import Welcome from "../views/marketing/Welcome.vue";
import Login from "../views/marketing/Login.vue";
import Signup from "../views/marketing/Signup.vue";
import ConfirmEmail from "../views/marketing/ConfirmEmail.vue";

// App pages
import Home from "../views/app/Home.vue";
import Debt from "../views/app/Debt.vue";
import Team from "../views/app/Team.vue";
import Insights from "../views/app/Insights.vue";
import Projects from "../views/app/Projects.vue";
import AllTeamFeedback from "../views/app/AllTeamFeedback.vue";
import TeamSettings from "../views/app/TeamSettings.vue";
import IndividualProject from "../views/app/IndividualProject.vue";
import IndividualProjectFeedback from "../views/app/IndividualProjectFeedback.vue";
import IndividualProjectOverview from "../views/app/IndividualProjectOverview.vue";
import IndividualProjectSettings from "../views/app/IndividualProjectSettings.vue";

const routes = [

  // Marketing pages
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/confirm",
    name: "ConfirmEmail",
    component: ConfirmEmail,
  },

  // App pages
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/debt",
    name: "debt",
    component: Debt,
  },
  {
    path: "/team/:id",
    name: "team",
    component: Team,
    redirect: { name: 'projects' },
    children: [
      {
        path: "insights",
        name: "insights",
        component: Insights,
      },
      {
        path: "projects",
        name: "projects",
        component: Projects,
        children: [
        ]
      },
      {
        path: "projects/:projectId",
        name: "project",
        component: IndividualProject,
        redirect: { name: 'projectOverview' },
        children: [
          {
            path: "overview",
            name: "projectOverview",
            component: IndividualProjectOverview,
          },
          {
            path: "feedback",
            name: "projectFeedback",
            component: IndividualProjectFeedback,
          },
          {
            path: "settings",
            name: "projectSettings",
            component: IndividualProjectSettings,
          },
        ]
      },
      {
        path: "feedback",
        name: "feedback",
        component: AllTeamFeedback,
      },
      {
        path: "settings",
        name: "teamSettings",
        component: TeamSettings,
      },
    ]
  },
  // {
  //   path: "/team/:id/projects/:projectId",
  //   name: "project",
  //   component: IndividualProject,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles

// Route guard for auth routes

export default router;
