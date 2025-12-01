import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import { API_BASE_URL } from "./config";

const app = createApp(App);

// Make API_BASE_URL globally available
app.config.globalProperties.$API_BASE_URL = API_BASE_URL;

app.use(router).mount("#app");
