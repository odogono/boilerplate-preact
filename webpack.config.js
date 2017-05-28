const Path = require('path');
const Webpack = require('webpack');

const ExtractTextPlugin = 'extract-text-webpack-plugin';
const HtmlWebpackPlugin = 'html-webpack-plugin';
const CopyWebpackPlugin = 'copy-webpack-plugin';
const ReplacePlugin = 'replace-bundle-webpack-plugin';
const OfflinePlugin = 'offline-plugin';

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';
const outDir = Path.resolve(__dirname, './web/js');
const contextPath = process.cwd();


module.exports = {
    // devtool: "eval-source-map",
    devtool: 'source-map',
    // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',

    entry: {
        client: './src/client/index.js'
    },

    output: {
        path: outDir,
        filename: '[name].js'
    },

    resolve: {
		extensions: ['.jsx', '.js', '.json'],
		modules: [
			// path.resolve(__dirname, "src/lib"),
			Path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			// components: path.resolve(__dirname, "src/components"),    // used for tests
			// style: path.resolve(__dirname, "src/style"),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
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
            manifest: require(Path.join(outDir, 'vendor.json'))
        })
    ].concat(isProduction ? [
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
    ] : []),
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
                loaders: ['style', 'css', 'sass']
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
            // Loaders for other file types can go here
        ]
    }
};
