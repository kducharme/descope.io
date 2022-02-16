import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueChartJs from 'vue-chartjs';

createApp(App, VueChartJs)
  .use(router)
  .use(VueChartJs)
  .mount("#app");
 