const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = function override(config, env) {
    if (!config.resolve) {
        config.resolve = { plugins: [] }
    }
    const tsconfigPathsPlugin = new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
    })

    if (config.resolve.plugins) {
        config.resolve.plugins.push(tsconfigPathsPlugin)
    } else {
        config.resolve.plugins = [tsconfigPathsPlugin]
    }
    return config
}
