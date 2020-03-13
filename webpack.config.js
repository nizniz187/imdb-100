const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
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
      modules: `${srcPath}/modules`,
      plugins: `${srcPath}/plugins`
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
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ]
};