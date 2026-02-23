import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createAlias = (dirname) => path.resolve(__dirname, `src/${dirname}`);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": createAlias(""), // src, root of the project
      "@components": createAlias("components"), // src/components, components folder
      "~img": createAlias("assets/images"), // src/assets/images, images folder,
      "#types": createAlias("types"), // src/types, types folder
    },
  },
});
