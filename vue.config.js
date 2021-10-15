module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/styles/variables.sass"
                    @import "@/assets/styles/mixins.sass"
                `,
                sassOptions: {
                    quietDeps: true,
                },
            },
        },
    },
    devServer: {
        proxy: process.env.API_URL,
    },
}
