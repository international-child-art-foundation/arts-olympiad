import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "jsx-a11y": jsxA11y,
    },
    ignores: ["amplify/**", "node_modules/**", ".next/**", "out/**"],

    languageOptions: { parser: tsParser },
    rules: {
      indent: ["error", 2],
      "linebreak-style": "off",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "jsx-quotes": ["error", "prefer-double"],
      "react/no-unescaped-entities": "off",
      "jsx-a11y/alt-text": "error",
      ...typescriptEslint.configs.recommended.rules,
    },
  },
]);
