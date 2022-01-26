import { createRouter, createWebHistory } from "vue-router";

// Marketing pages
import Welcome from "../views/marketing/Welcome.vue";
import Login from "../views/marketing/Login.vue";
import Signup from "../views/marketing/Signup.vue";
import ConfirmEmail from "../views/marketing/ConfirmEmail.vue";

// App pages
import Home from "../views/app/Home.vue";
import Launch from "../views/app/Launch.vue";
import Debt from "../views/app/Debt.vue";
import Overview from "../views/app/Overview.vue";
import Requirements from "../views/app/Requirements.vue";
import Feedback from "../views/app/Feedback.vue";

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
    path: "/launch/:id",
    name: "launch",
    component: Launch,
    redirect: { name: 'overview' },
    children: [
      {
        path: "overview",
        name: "overview",
        component: Overview,
      },
      {
        path: "requirements",
        name: "requirements",
        component: Requirements,
      },
      {
        path: "feedback",
        name: "feedback",
        component: Feedback,
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles

// Route guard for auth routes

export default router;
