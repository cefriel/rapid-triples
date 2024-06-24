module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/mobilitydcatap-ui/" : "/",
    transpileDependencies: [
        "vuetify", "@koumoul/vjsf"
    ]
}
