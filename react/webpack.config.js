const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET

const common = {
  context: resolve('app'),
  entry: {
    app: './index.jsx'
  },
  output: {
    filename: 'bundle.[name].js',
    path: resolve('build')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        // Test expects a RegExp! Note the slashes!
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, sourceMaps: true, importLoaders: 1 } },
          // 'css-loader?importLoaders=1&modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        // load entire css for packages
        test: /\.css$/,
        exclude: '/app/',
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
        loaders: ['babel-loader'],
        // Parse only app files! Without this it will go through entire project.
        // In addition to being slow, that will most likely result in an error.
        exclude: /node_modules/
      }
    ]
  }
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
      contentBase: resolve('build'),

      // Enable history API fallback so HTML5 History API based
      // routing works.
      // Let client worry about routing
      historyApiFallback: true,
      hot: true,
      inline: true,
      // progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      port: process.env.PORT || 3000
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
      // new NpmInstallPlugin({
      //   save: true // --save
      // })
    ]
  })
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          sourceMap: true,
          warnings: true
        }
      }),
      new ExtractTextPlugin({
        filename: '[name].css'
      })
    ]
  })
}
