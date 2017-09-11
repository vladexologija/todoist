const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const InlineManifestPlugin = require('inline-manifest-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET

const common = {
  context: resolve('app'),
  entry: {
    app: './index.jsx',
    vendor: ['react', 'bootstrap/dist/css/bootstrap.css', 'font-awesome/css/font-awesome.css']
  },
  output: {
    filename: 'bundle.[name].[chunkhash].js',
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
    module: [
      {
        rules: [
          {
            // load css code via modules
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
            // load bootstrap
            test: /\.css$/,
            exclude: '/app/',
            include: /node_modules/,
            loaders: ['style-loader', 'css-loader']
          }
        ]
      }
    ],
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
  const extractBootstrap = new ExtractTextPlugin({
    filename: '[name][chunkhash]bootstrap.css'
  })
  const extractCSS = new ExtractTextPlugin({
    filename: '[name][chunkhash].css'
  })
  module.exports = merge(common, {
    module: {
      rules: [
        {
          // load css code via modules
          test: /\.css$/,
          exclude: /node_modules/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { modules: true, sourceMaps: true, importLoaders: 1 } },
              // 'css-loader?importLoaders=1&modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
              'postcss-loader'
            ]
          })
        },
        {
          // load bootstrap
          test: /\.css$/,
          exclude: '/app/',
          include: /node_modules/,
          use: extractBootstrap.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // sourceMap: true,
          warnings: true
        }
      }),
      // add replace .js with .gz.js to nginx
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      // longterm caching of vendor chunks
      new InlineManifestPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest']
      }),
      new ProgressBarPlugin(),
      extractBootstrap,
      extractCSS
    ]
  })
}
