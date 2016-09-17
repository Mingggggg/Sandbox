var webpack = require("webpack");

module.exports = {
    entry: {
        main: './assets/sandbox.js'
    },
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react','es2015']
                }
            },
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            PRODUCTION: true
        })
    ],
}
