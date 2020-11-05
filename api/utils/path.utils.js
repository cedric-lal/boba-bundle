const path = require('path')
const { WORKSPACE_PATH } = require('../config/config')

/**
 * Return the folder path where the module is bundled
 * @param {string} pkg name of the package
 * @param {string} version version of the package
 * @returns {string} path to the output folder of the package
 */
const getOutputFolderPath = (pkg, version) => {
    return path.join(WORKSPACE_PATH, `${pkg}/${version}/bundle/`)
}

/**
 * Return the package.json of the module
 * @param {string} moduleFolderPath absolute path to the module folder
 * @returns {Object} package.json file of the module as json
 */
const getPackageJson = (moduleFolderPath) => {
    return require(path.join(moduleFolderPath, 'package.json'))
}

/**
 * Return the path to the entry point of a module
 * if the main of the package.json is not define we default to index.js
 * @param {string} pkgName name of the package
 * @param {string} version version of the package
 * @param {Object} packageJson of the module as json
 * @returns {string} absolute path to the entry point 
 */
const getPathToEntryPoint = (pkgName, version, packageJson) => {
    const entryPoint = packageJson.main
    if (!entryPoint) entryPoint = 'index.js'
    return path.join(getModuleFolderPath(pkgName, version), entryPoint);
}

/**
 * Return the path to the entry point of a module
 * if the main of the package.json is not define we default to index.js
 * @param {string} pkgName name of the package
 * @param {string} version version of the package
 * @returns {string} absolute path to the 
 */
const getModuleFolderPath = (pkgName, version) => {
    return path.join(WORKSPACE_PATH, `${pkgName}/${version}/node_modules/${pkgName}/`)
}

module.exports = {
    getOutputFolderPath,
    getPackageJson,
    getPathToEntryPoint,
    getModuleFolderPath
}