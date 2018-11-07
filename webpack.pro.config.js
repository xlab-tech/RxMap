/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: {
      main: './src/index.umd.js',
    },
    output: {
      library: 'R',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: chunkData => (chunkData.chunk.name !== 'main' ? 'umd/[name].js' : 'umd/RxMap.src.js'),
      chunkFilename: 'umd/chunk/[name].src.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
  },
  {
    mode: 'production',
    entry: {
      main: './src/index.umd.js',
    },
    output: {
      library: 'R',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: chunkData => (chunkData.chunk.name === 'main' ? 'umd/[name].js' : 'umd/RxMap.min.js'),
      chunkFilename: 'umd/chunk/[name].min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    plugins: [],
  }];
