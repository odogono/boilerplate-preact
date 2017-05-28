const Path = require('path');
const Webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let environment = process.env.NODE_ENV || 'development';
const isProduction = environment === 'production';
const outDir = Path.resolve(__dirname, './web/js');

const contextPath = process.cwd();
const dirJS = Path.join(__dirname, 'web', 'js');
const dirCSS = Path.join(__dirname, 'web', 'css');

let plugins = [
    new Webpack.DllPlugin({
        name: '[name]',
        path: Path.join(outDir, '[name].json')
    }),
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];

// if (isProduction) {
    plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        })
    );
// }

module.exports = {
    context: process.cwd(),
    devtool: 'source-map',

    entry: {
        vendor: [
            'alt',
            'get-node-dimensions',
            'preact',
            'underscore',
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            // { from: 'node_modules/material-components-web/dist/material-components-web.js', to: dirJS },
            { from: 'node_modules/material-components-web/dist/material-components-web.css', to: dirCSS }
        ]),
    ],
    resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat',
            // Not necessary unless you consume a module using `createClass`
            'create-react-class': 'preact-compat/lib/create-react-class'
        }
    },
    output: {
        path: outDir,
        filename: '[name].js',
        library: '[name]'
    },
    plugins
};
