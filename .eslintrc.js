module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import", "prettier", "unused-imports"],
  rules: {
    "import/prefer-default-export": "off",
    "linebreak-style": "off",
    "react/jsx-filename-extension": "off",
    "import/extensions": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-unused-vars": "off",
    "import/no-unresolved": "error",
    "import/no-cycle": "off",
    "unused-imports/no-unused-imports": "error",
    "react/prop-types": "off",
  },
};
