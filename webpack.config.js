const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    test: ['./src/index.js', './examples/map.load.js'],
    leafletExample: ['./src/index.js', './examples/leaflet.js'],
    googleExample: ['./src/index.js', './examples/google.js'],
    mapboxExample: ['./src/index.js', './examples/mapbox.js'],
    olExample: ['./src/index.js', './examples/ol.js'],
    esriExample: ['./src/index.js', './examples/esri.js'],
    cartoExample: ['./src/index.js', './examples/carto.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Index',
      template: './examples/index.html',
      inject: false,
      chunksSortMode: 'none',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      template: './examples/map.test.html',
      chunks: ['test'],
      chunksSortMode: 'none',
      filename: 'test.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Carto',
      template: './examples/map.examples.html',
      chunks: ['cartoExample'],
      chunksSortMode: 'none',
      filename: 'carto.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Esri',
      template: './examples/map.examples.html',
      chunks: ['esriExample'],
      chunksSortMode: 'none',
      filename: 'esri.html',
    }),
    new HtmlWebpackPlugin({
      title: 'OpenLayers',
      template: './examples/map.examples.html',
      chunks: ['olExample'],
      chunksSortMode: 'none',
      filename: 'ol.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Leaflet',
      template: './examples/map.examples.html',
      chunks: ['leafletExample'],
      chunksSortMode: 'none',
      filename: 'leaflet.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Google',
      template: './examples/map.examples.html',
      chunks: ['googleExample'],
      chunksSortMode: 'none',
      filename: 'google.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Mapbox',
      template: './examples/map.examples.html',
      chunks: ['mapboxExample'],
      chunksSortMode: 'none',
      filename: 'mapbox.html',
    }),
  ],
};
