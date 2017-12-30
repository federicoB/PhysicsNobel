const path = require('path');
const merge = require("webpack-merge")
const BundleTracker = require('webpack-bundle-tracker');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

const commonConfig = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']

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
    },
};

const productionConfig = {
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    //including also node_modules to be sure there will be no incompatibility with pre-es2015
                    path.resolve(__dirname, 'node_modules')
                ],
                exclude: [
                    //excluding wikijs because it was giving error with babel
                    path.resolve(__dirname, 'node_modules/wikijs')
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['react'],
                            ['es2015', {modules: false}],
                            ['es2016'],
                            ['es2017']
                        ]
                    }
                }]
            },
        ]
    },
    plugins: [
        //javascript minifier
        new UglifyWebpackPlugin()
    ],
};

const developmentConfig = {
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
                            ['es2016'],
                            ['es2017']
                        ]
                    }
                }]
            },
        ]
    },
    devtool: 'source-map'
};

module.exports = env => {
    if (env === "production") {
        return merge(commonConfig, productionConfig);
    } else
        return merge(commonConfig, developmentConfig);
};
