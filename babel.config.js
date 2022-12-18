module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@test": "./src/test",
            "@utils": "./src/utils",
            "@components": "./src/components",
          },
        },
      ],
    ],
  };
};
