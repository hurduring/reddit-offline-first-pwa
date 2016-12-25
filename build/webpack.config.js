const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  performance: {
    hints: false
  },
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/index.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve('./dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../index.html'),
    // })
  ],
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.resolve('./client')
      },
      {
        test: /\.scss$|.css$/,
        loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]']
      }
    ]
  }
}