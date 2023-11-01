const path = require("path");
const sass = require("sass");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.js"),
  devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : false,
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          {
            loader: require.resolve("style-loader"),
            options: {
              injectType: "singletonStyleTag",
              esModule: false,
            },
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              sourceMap: true,
              modules: "global",
            },
          },
          require.resolve("resolve-url-loader"),
          {
            loader: require.resolve("sass-loader"),
            options: {
              sourceMap: true,
              implementation: sass,
            },
          },
          // loader for favicon and json and png
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]", // Output path and filename format
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".tsx", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js",
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
