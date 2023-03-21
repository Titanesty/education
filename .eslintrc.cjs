module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
    "@vue/eslint-config-typescript",
  ],
  parserOptions: {},
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
    "vue/require-default-prop": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/component-name-in-template-casing": ["warn", "PascalCase"],
    "no-console": "warn",
    "no-debugger": "warn",
  },
};
