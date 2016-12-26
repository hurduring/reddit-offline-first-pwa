const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssBundle = new ExtractTextPlugin({ filename: 'styles.css', allChunks: true });

module.exports = {
  devtool: 'eval',
  performance: {
    hints: false
  },
  entry: [
    'babel-polyfill',
    './client/index.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    cssBundle
  ],
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, '../client')
      },
      {
        test: /\.scss$|.css$/,
        loaders: cssBundle.extract(['css-loader?modules&localIdentName=[name]__[local]'])
      }
    ]
  }
};