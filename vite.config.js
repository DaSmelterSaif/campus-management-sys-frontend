import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
// import values from "./SECRETS";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    // allowedHosts: values.allowedHosts,
    proxy: {
      "/api": {
        target:
          "https://campus-management-sys-backend-production.up.railway.app/",
        changeOrigin: true,
      },
    },
  },
});
