module.exports = function(api) {
  api.cache(true);

  const moduleResolverOptions = {
    alias: {
      common: "./src/common",
      store: "./src/store",
    },
  };

  return {
    presets: ['babel-preset-expo'],
    plugins: ['babel-plugin-styled-components', ['module-resolver', moduleResolverOptions]],
  };
};
