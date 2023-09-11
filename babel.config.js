module.exports = {
  presets: [
    "@babel/react",
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
    "@babel/preset-typescript",
    [
      "@babel/preset-flow",
      {
        all: true,
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-modules-commonjs",
  ],
  env: {
    test: {
      presets: [
        "@babel/react",
        [
          "@babel/preset-env",
          {
            modules: "commonjs",
  
          },
        ],
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-modules-commonjs",
      ],
    },
  },
};
