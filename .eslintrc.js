module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  settings: {
    'import/parsers': {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'imported'],
  rules: {
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-unused-vars': 'off',
    'import/no-unresolved': 'error',
  },
};
