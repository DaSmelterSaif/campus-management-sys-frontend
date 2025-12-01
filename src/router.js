import { createWebHistory, createRouter } from "vue-router";

import Redirector from "./components/Redirector.vue";
import Auth from "./components/Auth.vue";
import Login from "./components/Auth_components/Login.vue";
import Register from "./components/Auth_components/Register.vue";
import Dashboard from "./components/Dashboard.vue";
import FormPage from "./components/FormPage.vue";
import BookingsList from "./components/BookingsList.vue";
import EventsList from "./components/EventsList.vue";
import MaintenanceList from "./components/MaintenanceList.vue";
import MaintenanceStaffList from "./components/MaintenanceStaffList.vue";

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
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "bookings", component: BookingsList },
      { path: "events", component: EventsList },
      { path: "maintenance", component: MaintenanceList },
      { path: "maintenance-staff", component: MaintenanceStaffList },
    ],
  },
  { path: "/form/:serviceId", name: "form", component: FormPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
