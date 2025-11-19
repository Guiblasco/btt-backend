import { defineConfig } from "eslint/config";
import globals from "globals";
import xo from "eslint-config-xo";
import xoTypeScript from "eslint-config-xo-typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [xo],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [xoTypeScript],
  },

  eslintConfigPrettier,
]);
