module.exports = {
    publicPath: '',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gif']
        }
    }
}
