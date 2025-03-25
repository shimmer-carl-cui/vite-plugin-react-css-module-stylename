import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "www",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "carl",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "@babel/core",
        "path",
        "crypto",
        "@babel/parser",
        "@babel/traverse",
        "@babel/generator",
        "@babel/types",
      ],
      output: {
        globals: {
          "@babel/core": "Babel",
          "@babel/parser": "Parser",
          "@babel/traverse": "Traverse",
          "@babel/generator": "Generator",
          "@babel/types": "Types",
          path: "path",
          crypto: "crypto",
        },
      },
    },
  },
  plugins: [dts({ insertTypesEntry: true })],
});
