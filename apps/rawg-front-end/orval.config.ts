import { defineConfig } from "orval";

export default defineConfig({
  rawg: {
    input: {
      target: "./openapi.json",
    },
    output: {
      mode: "tags-split",
      target: "./lib/api/rawg.ts",
      schemas: "./lib/api/model",
      client: "react-query",
      override: {
        mutator: {
          path: "./lib/api/custom-fetch.ts",
          name: "customFetch",
        },
      },
    },
  },
});
