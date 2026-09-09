import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import componentImports from "./component-imports.json";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Prebundle the source package entry points, including their CJS dependencies.
  // The runner generates this list from every public component module.
  optimizeDeps: { include: componentImports, extensions: [".tsx"] },
});
