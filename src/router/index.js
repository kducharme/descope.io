import { createRouter, createWebHistory } from "vue-router";

// Marketing pages
import Welcome from "../views/marketing/Welcome.vue";
import Login from "../views/marketing/Login.vue";
import Signup from "../views/marketing/Signup.vue";
import ConfirmEmail from "../views/marketing/ConfirmEmail.vue";

// App pages
import Home from "../views/app/Home.vue";
import Launch from "../views/app/Launch.vue";
import LaunchHistory from "../views/app/LaunchHistory.vue";

const routes = [
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
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/history/",
    name: "LaunchHistory",
    component: LaunchHistory,
  },
  {
    path: "/launch/:launchId",
    name: "Launch",
    component: Launch,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles

// Route guard for auth routes

export default router;
