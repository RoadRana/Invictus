import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/Invictus/",
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target:
            env.VITE_API_BASE_URL || "https://3b980835104d.ngrok-free.app/",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    // Optional: Define global constants
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_API_BASE_URL),
    },
  };
});
