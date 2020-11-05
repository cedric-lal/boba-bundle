const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { gzipFile } = require('../utils/zip.utils')

const { getOutputFolderPath } = require('../utils/path.utils')
const bundlePackage = require('./webpack')
const getVersionHistory = require('./versions')
const { WORKSPACE_PATH, OUTPUT_BUNDLE_NAME } = require('../config/config')


/**
* Return information about multiple versions of the package
* @param {string} pkgName - The name of the package
* @returns {{version: string, minifiedSizeInKb: number, gzipSizeInKb: number}[]]} array with package information per version
*/
const getStats = async (pkgName) => {
    if (!pkgName) throw new Error('Package name must be provided')
    const versions = await getVersionHistory(pkgName)

    return await Promise.all(versions.map(async (version) => {
        await installPkg(pkgName, version)
        return {
            version,
            ... await getSizes(pkgName, version)
        }
    }))
}

/**
 * Calculate minified and gzip sizes for a specific package version
 * @param {string} pkgName name of the package
 * @param {string} version version of the package
 * @returns {minifiedSizeInKb: number, gzipSizeInKb: number} minified and gzip sizes in kb
 */
const getSizes = async (pkgName, version) => {
    // Check if this package has already be bundled
    let bundleFilePath = getOutputFolderPath(pkgName, version) + OUTPUT_BUNDLE_NAME
    await fs.promises.access(bundleFilePath, fs.F_OK).catch(async e => {
        await bundlePackage(pkgName, version) // Create the bundle if it doesn't exist
    })

    const minifiedSizeInKb = Number(fs.statSync(bundleFilePath).size / 1000).toFixed(1)

    await gzipFile(bundleFilePath)
    const gzipSizeInKb = Number(fs.statSync(bundleFilePath + '.gz').size / 1000).toFixed(1)

    return { minifiedSizeInKb, gzipSizeInKb }
}

/**  
 * Install NPM package in local workspace
 * @param {string} pkg name of the package
 * @param {string} version version of the package 
 * @returns {Promise} that resolve when the install is over
 * */
const installPkg = async (pkg, version) => {
    // Create workspace if it doesn't exist yet
    await fs.promises.mkdir(WORKSPACE_PATH).catch(() => { })
    const installCommand = `npm i -s --production=false --prefix ${WORKSPACE_PATH}/${pkg}/${version} ${pkg}@${version}`
    return exec(installCommand).catch(e => {
        throw new Error('The package could not be installed ' + e)
    })
}

module.exports = {
    getStats
}