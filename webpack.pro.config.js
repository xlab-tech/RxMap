/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');
// const config = require('./package.json');
// const { version } = config;
const filesEntry = glob.sync('./lib/**/*.js');

const entry = filesEntry.reduce((old, item) => {
  const items = { ...old };
  if (!item.includes('lib/index.js') && !item.includes('lib/utils') && !item.includes('/common/')) {
    items[item] = item;
  }
  return items;
}, {});

module.exports = [
  {
    mode: 'development',
    entry,
    output: {
      libraryTarget: 'commonjs-module',
      filename: '[name]',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    devtool: 'none',
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
  },
  {
    mode: 'production',
    entry,
    output: {
      libraryTarget: 'commonjs-module',
      filename: 'umd/[name]',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    devtool: 'none',
    plugins: [],
  },
  {
    mode: 'development',
    entry: './src/index.umd.js',
    output: {
      library: 'R',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: 'umd/RxMap.src.js',
      chunkFilename: 'umd/chunk/[name].src.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    plugins: [],
  },
  {
    mode: 'production',
    entry: './src/index.umd.js',
    output: {
      library: 'R',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: 'umd/RxMap.min.js',
      chunkFilename: 'umd/chunk/[name].min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    plugins: [],
  }];
