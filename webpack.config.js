const path = require('path')
module.exports = {
    mode: 'production',
    entry: './lib/index.ts',
    output: {
        library: 'LongTake',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, './dist-new'),
        publicPath: '/dist-new/',
        filename: 'index.js',
        globalObject: 'this || (typeof window !== \'undefined\' ? window : global)'
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}
