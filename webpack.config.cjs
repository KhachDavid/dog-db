const path = require("path");
const sass = require("sass");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.js"),
  //devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : false,
  devtool: "eval-source-map",
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
    maxAssetSize: 512000
  },    
};
