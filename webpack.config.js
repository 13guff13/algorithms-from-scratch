const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dev = process.env['NODE_ENV'] === 'development';

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: {
    bundle: './src/main.js',
  },

  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  devServer: {
  },
  optimization: {
    minimize: false,
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'app-common',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /public/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: dev,
                importLoaders: 2,
                localIdentName: '[name]__[local]__[hash]',
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.gltf$|\.svg$|\.woff2?$|\.eot$|\.otf$|\.ttf$/,
        loader: 'file-loader?name=static/[hash].[ext]',
        options: {
          limit: 10000,
        },
      },
    ],
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '/public'),
    publicPath: '/',
  },
  plugins: [

    new ExtractTextPlugin({
      filename: dev ? '[name].css' : '[name]-[chunkhash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/template.html'),
      filename: 'index.html',
      inject: true,
      hash: false,
    }),
  ],
};

if (dev) {
  module.exports.module.rules.push({
    test: /\.js$/,
    exclude: [/node_modules/, /public/],
    use: {
      loader: 'eslint-loader',
    },
  });
}