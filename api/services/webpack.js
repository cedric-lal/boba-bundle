const builtInModules = require('builtin-modules')
const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { OUTPUT_BUNDLE_NAME } = require('../config/config')
const { getOutputFolderPath, getPackageJson, getModuleFolderPath, getPathToEntryPoint } = require('../utils/path.utils');
const { reject } = require('lodash');



/**
 * Bundle a specific package version using webpack
 * @param {string} pkgName name of the package
 * @param {string} version version of the package
 * @returns {Promise} promise that resolve when webpack has finish bundling
 */
const bundlePackage = async (pkgName, version) => {
    const moduleFolderPath = getModuleFolderPath(pkgName, version)
    const outputFolderPath = getOutputFolderPath(pkgName, version)
    const packageJson = getPackageJson(moduleFolderPath)
    const webpackConfig = getWebpackConfig(pkgName, version, packageJson, outputFolderPath)

    return runWebpack(webpackConfig).catch((e) => {
        throw new Error(`Packaging of ${pkgName} version ${version} failed: ` + e)
    })
}

/**
 * Run webpack using the config in parameter
 * @param {Object} config
 */
const runWebpack = async (config) => {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err || stats.hasErrors()) {
                reject(stats.compilation.errors)
            } else {
                resolve()
            }
        })
    })
}

/**
 * Return the module configuration for the webpack config
 * @param {Object} packageJson The package.json of the module in json format
 * @returns {{moduleName: string, value: string}} the node attribute of the webpack config
 */
const getNodeBuiltInModules = (packageJson) => {
    const dependencies = Object.keys(packageJson.dependencies || {})

    const nodeBuiltInFeature = {}
    for (const module of builtInModules) {
        if (!dependencies.includes(module)) { // If a dependencies has same name as node built in feature we want to include it in the bundle
            nodeBuiltInFeature[module] = 'empty'
        }
    }

    nodeBuiltInFeature['__filename'] = true
    nodeBuiltInFeature['__dirname'] = true
    nodeBuiltInFeature['setImmediate'] = false
    nodeBuiltInFeature['console'] = false
    nodeBuiltInFeature['process'] = false
    nodeBuiltInFeature['Buffer'] = false

    return nodeBuiltInFeature
}

/**
 * Return modules that should not be bundled
 * Correspond to the externals attribute of the webpack config
 * @param {Object} packageJson The package.json of the module in json format
 * @returns {{moduleName: string, fakeModulePath: string}}
 */
const getExternalModules = (packageJson) => {
    const peerDependencies = Object.keys(packageJson.peerDependencies || {})
    const externalModules = {}
    for (const peer of peerDependencies) {
        externalModules[peer] = peer
    }
    return externalModules;
}

/**
 * Return a webpack config with multiple loader
 * @param {string} pkgName name of the package
 * @param {string} version version of the package
 * @param {Object} packageJson The package.json of the module in json format
 * @param {string} outputFolderPath Absolute path to the webpack output folder
 * @returns {Object} The webpack config object
 */
const getWebpackConfig = (pkgName, version, packageJson, outputFolderPath) => {
    const entryPointPath = getPathToEntryPoint(pkgName, version, packageJson)

    return webpackConfig = {
        mode: 'production',
        target: 'node',
        entry: entryPointPath,
        context: path.dirname(entryPointPath),
        node: getNodeBuiltInModules(packageJson),
        output: {
            libraryTarget: 'commonjs2',
            path: outputFolderPath,
            filename: OUTPUT_BUNDLE_NAME
        },
        optimization: {
            minimize: true
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new webpack.IgnorePlugin(/^electron$/),
            new VueLoaderPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    use: {
                        loader: require.resolve('babel-loader'),
                        options: {
                            presets: [require.resolve('@babel/preset-env')]
                        }
                    }
                },
                {
                    test: /\.tsx?$/,
                    loader: require.resolve('ts-loader')
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [MiniCssExtractPlugin.loader,
                    require.resolve('css-loader'),
                    require.resolve('postcss-loader'),
                    require.resolve('sass-loader')]
                },
                {
                    test: /\.node$/,
                    loader: require.resolve('node-loader')
                },
                {
                    test: /\.js$/,
                    use: [require.resolve('shebang-loader')],
                },
                {
                    test: /\.(html|svelte)$/,
                    use: {
                        loader: require.resolve('svelte-loader'),
                        options: {
                            emitCss: true,
                        }
                    }
                },
                {
                    test: /\.vue$/,
                    loader: require.resolve('vue-loader')
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg|png|jpeg|jpg|gif|webp)$/,
                    loader: require.resolve('file-loader')
                }
            ],
        },
        externals: getExternalModules(packageJson)

    }
}

module.exports = bundlePackage;