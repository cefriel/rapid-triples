const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === "production" ? "/mobilitydcatap-ui/" : "/",
    transpileDependencies: [
        "vuetify", "@koumoul/vjsf"
    ],
    configureWebpack: {
        resolve: {
            alias: {
                'ajv/dist/2019': path.resolve(__dirname, 'node_modules/ajv/dist/2019.js'),
                'ajv-errors': path.resolve(__dirname, 'node_modules/ajv-errors'),
                'vuetify/lib': path.resolve(__dirname, 'node_modules/vuetify/lib'),
                '@koumoul/vjsf/lib/VJsf.css': path.resolve(__dirname, 'node_modules/@koumoul/vjsf/lib/VJsf.css'),
                '@koumoul/vjsf/lib/deps/third-party.js': path.resolve(__dirname, 'node_modules/@koumoul/vjsf/lib/deps/third-party.js')
            }
        },
        module: {
            rules: [
                {
                    test: /\.jinja$/,
                    use: 'raw-loader'
                }
            ]
        }
    },
    pluginOptions: {
        vuetify: {
        }
    }
});
