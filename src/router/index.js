import { createRouter, createWebHistory } from "vue-router";

// Marketing pages
import Welcome from "../views/marketing/Welcome.vue";
import Login from "../views/marketing/Login.vue";
import Signup from "../views/marketing/Signup.vue";
import ConfirmEmail from "../views/marketing/ConfirmEmail.vue";

// App pages
import LaunchList from "../views/app/LaunchList.vue";
import Launch from "../views/app/Launch.vue";

const routes = [
  {
    path: "/",
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
    path: "/launches/",
    name: "LaunchList",
    component: LaunchList,
  },
  {
    path: "/launch/create",
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
