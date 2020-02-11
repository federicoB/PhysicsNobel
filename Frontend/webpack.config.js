const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
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
            {
                test: /\.(jpg|png|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/react'],
                            ['@babel/env', {
                                "targets": {
                                    "browsers": ["> 10%"] //target browsers with market share > 10%
                                }
                            }],
                        ]
                    }
                }]
            },
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin()
    ],
    externals: { //required by wikijs
        "isomorphic-fetch": "fetch"
    },
};
