const webpack = require('webpack');

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/rapid-triples/" : "/",
    transpileDependencies: [
        "vuetify",
        "@koumoul/vjsf"
    ],
    configureWebpack: {
        resolve: {
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                process: require.resolve('process/browser'),
                buffer: require.resolve('buffer')

            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
            })
        ]
    }
};
