import { createWebHistory, createRouter } from "vue-router";

import Redirector from "./components/Redirector.vue";
import Login from "./components/Login.vue";

const routes = [
  { path: "/", component: Redirector },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
