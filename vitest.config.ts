import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
      devTarget: "es2022",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/",
      ],
    },
  },
  define: {
    // Force tests to use local environment (mock data only)
    "import.meta.env.VITE_APP_ENV": JSON.stringify("local"),
    "import.meta.env.NODE_ENV": JSON.stringify("test"),
    "import.meta.env.MODE": JSON.stringify("test"),
  },
});