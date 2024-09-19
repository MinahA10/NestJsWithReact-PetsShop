import pluginJs from "@eslint/js";
import tslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      parser: parser,
      globals: {
        it: "readonly",
        describe: "readonly",
      },
    },
    ignores: ["**/*.config.js", "!**/eslint.config.mjs", "dist/"],
    ...pluginJs.configs.recommended,
    plugins: {
      "@typescript-eslint": tslint,
      prettier: prettierPlugin,
    },
    rules: {
      "prefer-const": "error",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "error",
    },
  },
];
