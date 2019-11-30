const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');

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
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader'
                },

                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
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
            ]
        },

        plugins: [
            new CheckerPlugin(),
            new TsConfigPathsPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],

        devServer: {
            open: true,
            port: 7375
        },

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
