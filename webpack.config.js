const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: `${srcPath}/main`,
  output: {
    filename: '[name].bundle.js',
    path: distPath,
    publicPath: distPath
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      components: `${srcPath}/components`,
      modules: `${srcPath}/modules`
    },
    extensions: ['*', '.js', '.vue']
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname),
    index: 'index.html',
    writeToDisk: true,
    hot: true,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
            { loader: MiniCssExtractPlugin.loader },
            'css-loader'
        ]
      }
    ]
  }
};