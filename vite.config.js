import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config(); // Load .env variables
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  define: {
    "import.meta.env.BACKEND_BASE_URL": JSON.stringify(
      process.env.BACKEND_BASE_URL
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
  },
  plugins: [react()],
});
