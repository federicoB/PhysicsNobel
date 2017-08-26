const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker')

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
/*            {
                test: /\.json/,
                loader: 'json-loader'
            },*/
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]

            },
            {
                test: /\.(jpg|png|ttf|svg)*$/,
                loader: 'url-loader',
                options: {
                    limit: 25000, //limit to 25kB
                },
            },
            { //file loader declared after url-load so images < 25kB will be include in bundle and others
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
        new BundleTracker({filename: './webpack-stats.json'})
    ],
    node: { //WORKAROUND for using request package
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    externals: {
        "isomorphic-fetch": "fetch"
    }
};
