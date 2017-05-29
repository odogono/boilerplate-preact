const Path = require('path');
const Webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReplacePlugin = require('replace-bundle-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';
const dirOut = Path.resolve(__dirname, './web/js');
const dirCSS = Path.resolve(__dirname, 'web/css');
const contextPath = process.cwd();

const extractSCSS = new ExtractTextPlugin({
    allChunks: true,
    filename: getPath => {
        // console.log('dammit', Path.join( __dirname, getPath('css/[name].css').replace('css/js', 'css')) );
        //   return getPath('css/[name].css').replace('css/js', '../css');
        return '../' + getPath('css/[name].css').replace('css/js', 'css');
    }
});

module.exports = {
    // devtool: "eval-source-map",
    devtool: 'source-map',
    // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',

    entry: {
        client: './src/client/index.js'
    },

    output: {
        path: dirOut,
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.jsx', '.scss', '.js', '.json'],
        modules: [
            // path.resolve(__dirname, "src/lib"),
            Path.resolve(__dirname, 'node_modules'),
            'node_modules'
        ],
        alias: {
            TheClock: Path.resolve(__dirname, 'src/client/clock.js'),
            react: 'preact-compat',
            'react-dom': 'preact-compat',
            'react-addons-css-transition-group': 'rc-css-transition-group'
        }
    },

    plugins: [
        new Webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(isProduction),
            __PROCESS__: {
                ENV: JSON.stringify(ENV),
                PLATFORM_ENV: JSON.stringify('browser')
            },
            PLATFORM_ENV: JSON.stringify('browser')
        }),
        new Webpack.DllReferencePlugin({
            context: contextPath,
            manifest: require(Path.join(dirOut, 'vendor.json'))
        }),
        extractSCSS
    ].concat(
        isProduction
            ? [
                  new webpack.optimize.UglifyJsPlugin({
                      output: {
                          comments: false
                      },
                      compress: {
                          unsafe_comps: true,
                          properties: true,
                          keep_fargs: false,
                          pure_getters: true,
                          collapse_vars: true,
                          unsafe: true,
                          warnings: false,
                          screw_ie8: true,
                          sequences: true,
                          dead_code: true,
                          drop_debugger: true,
                          comparisons: true,
                          conditionals: true,
                          evaluate: true,
                          booleans: true,
                          loops: true,
                          unused: true,
                          hoist_funs: true,
                          if_return: true,
                          join_vars: true,
                          cascade: true,
                          drop_console: true
                      }
                  }),
                  new OfflinePlugin({
                      relativePaths: false,
                      AppCache: false,
                      excludes: ['_redirects'],
                      ServiceWorker: {
                          events: true
                      },
                      cacheMaps: [
                          {
                              match: /.*/,
                              to: '/',
                              requestTypes: ['navigate']
                          }
                      ],
                      publicPath: '/'
                  })
              ]
            : []
    ),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: Path.resolve(__dirname, 'src'),
                enforce: 'pre',
                use: 'source-map-loader'
            },
            {
                test: /\.scss$/,
                loader: extractSCSS.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(xml|html|txt|md)$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]--[local]--[hash:base64:8]'
                        }
                    },
                    'postcss-loader' // has separate config, see postcss.config.js nearby
                ]
            }
            // Loaders for other file types can go here
        ]
    }
};
