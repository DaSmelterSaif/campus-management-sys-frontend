import { createWebHistory, createRouter } from "vue-router";

import Redirector from "./components/Redirector.vue";
import Auth from "./components/Auth.vue";
import Login from "./components/Auth_components/Login.vue";
import Register from "./components/Auth_components/Register.vue";

const routes = [
  { path: "/", component: Redirector },
  {
    path: "/auth",
    component: Auth,
    children: [
      {
        path: "login",
        component: Login,
      },
      {
        path: "register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
