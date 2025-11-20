import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Config base: entorno Node
  {
    languageOptions: {
      globals: globals.node,
    },
  },

  // Reglas recomendadas para JS
  js.configs.recommended,

  // Reglas recomendadas para TS
  ...tseslint.configs.recommended,
]);
