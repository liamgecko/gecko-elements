import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import componentImports from "./component-imports.json" with { type: "json" };

export default defineConfig({
  plugins: [react()],
  optimizeDeps: { include: componentImports },
});
