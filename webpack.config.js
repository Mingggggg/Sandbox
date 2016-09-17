module.exports = {
    entry: {
        main: './assets/sandbox.js'
    },
    output: {
        filename: './dist/bundle.js'
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
}
