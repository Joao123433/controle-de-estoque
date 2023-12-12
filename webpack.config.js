const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    index: "./src-entry/App.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist-views")
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      { test: /\.js$/, use: ["babel-loader"] }
    ]
  },
  mode: "production",
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist-views'),
    }
  }
}
