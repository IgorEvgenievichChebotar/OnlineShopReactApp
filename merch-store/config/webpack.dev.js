const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');
const commonConfig = require('./webpack.common');

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: 'minimal',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: paths.public,
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.(css|scss)$/i,
                localIdentName: '[path][name]__[local]',
              },
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
  },
};

module.exports = merge(commonConfig, devConfig);
