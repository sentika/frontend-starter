const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');
const helpers = require('./helpers');

module.exports = function () {
    return {
        mode: 'development',

        entry: './src/scripts/index.ts',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },

        devtool: 'source-map',

        // Currently we need to add '.ts' to the resolve.extensions array.
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.scss$/,
                    loader: 'import-glob-loader',
                    exclude: [
                        /node_modules/
                    ]
                },

                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader'
                },

                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                    include: [helpers.root('src', 'styles')]
                }
            ]
        },

        plugins: [
            new CheckerPlugin(),
            new TsConfigPathsPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],

        performance: {
            hints: false
        },

        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false,
            fs: 'empty'
        }
    }
};
