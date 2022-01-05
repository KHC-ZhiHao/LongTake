module.exports = {
    publicPath: '',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            extensions: ['*', '.mjs', '.vue', '.json', '.gif']
        }
    }
}
