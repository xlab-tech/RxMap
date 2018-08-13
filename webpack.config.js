const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    RxMap: './index.js',
    example: './examples/map.load.js',
    // index: './examples/map.js',
  },
  output: {
    filename: '[hash]/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './examples/map.1.html',
      chunksSortMode: 'none',
    }),
    new webpack.DefinePlugin({
      COMMANDS_PATH: JSON.stringify('../lib'),
    }),
  ],
};
