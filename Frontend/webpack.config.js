const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['react'],
                            ['es2015', {modules: false}]
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]

            },
            { //i had problems with url-loader so i use only file-loader for now.
                //will be linked
                test: /\.(jpg|png|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new HardSourceWebpackPlugin()
    ],
    externals: { //required by webpack-bundle-tracker
        "isomorphic-fetch": "fetch"
    }
};
