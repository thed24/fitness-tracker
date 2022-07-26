module.exports = function (api) {
  api.cache(true);

  const moduleResolverOptions = {
    alias: {
      components: "./src/components",
      store: "./src/store",
      types: "./src/types",
      api: "./src/api",
      utils: "./src/utils",
    },
  };

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
      "module:react-native-dotenv",
      ["module-resolver", moduleResolverOptions],
      'react-native-reanimated/plugin',
    ],
  };
};
