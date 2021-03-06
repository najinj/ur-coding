/* eslint-disable global-require */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackMerge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line import/no-dynamic-require
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) =>
  webpackMerge(
    {
      mode,
      output: {
        path: path.resolve(__dirname, "dist")
      },
      resolve: {
        extensions: [".js", ".jsx", ".json"]
      },
      module: {
        rules: [
          {
            enforce: "pre",
            test: /\.jsx?$/,
            loader: "eslint-loader",
            exclude: /node_modules/
          },
          {
            test: /\.jsx?$/,
            loader: "babel-loader"
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: "src/assets/template.html"
        })
      ]
    },
    modeConfig(mode)
  );
