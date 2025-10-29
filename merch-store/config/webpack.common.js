const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./paths');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: paths.entry,
  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[contenthash:8][ext][query]',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@app': path.resolve(paths.src, 'app'),
      '@pages': path.resolve(paths.src, 'pages'),
      '@widgets': path.resolve(paths.src, 'widgets'),
      '@features': path.resolve(paths.src, 'features'),
      '@entities': path.resolve(paths.src, 'entities'),
      '@shared': path.resolve(paths.src, 'shared'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: paths.src,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.svg$/i,
        oneOf: [
          {
            resourceQuery: /component/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  prettier: false,
                  svgo: true,
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
          {
            type: 'asset',
            generator: {
              filename: 'assets/[name].[contenthash:8][ext][query]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif|ico)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.entryHtml,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: process.env.NODE_ENV === 'development',
      typescript: {
        configFile: path.resolve(paths.root, 'tsconfig.json'),
      },
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
