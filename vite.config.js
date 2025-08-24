import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Invictus/",
  plugins: [react()],
  server: {
    proxy: {
      
      "/api": {
        target: "",
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ""), 
      },
    },
  },
 
});
