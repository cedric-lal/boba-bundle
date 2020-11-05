const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { NB_MAJOR_VERSIONS_IN_HISTORY, NB_VERSIONS_IN_HISTORY } = require('../config/config')

/**
* Return a list of the package version history
* latest version + NB_VERSIONS_IN_HISTORY + NB_MAJOR_VERSIONS_IN_HISTORY are returned
* @param {string} pkgName - The name of the package
* @returns {string[]]} Array of the version history
*/
getVersionHistory = async (pkgName) => {
    let versions = await getAllVersions(pkgName)
    versions = filterVersions(versions)

    const latestVersion = versions.shift()
    let versionHistoryList = [latestVersion] // Initialize the list of version returned

    // Initialize variables used to find the required versions
    let nbRemainingMajorVersions = NB_MAJOR_VERSIONS_IN_HISTORY;
    let nbRemainingVersions = NB_VERSIONS_IN_HISTORY;
    let [previousMajor] = latestVersion.split('.')
    for (const version of versions) {
        const [major] = version.split('.')
        if (major < previousMajor && nbRemainingMajorVersions) {
            previousMajor = major
            nbRemainingMajorVersions = --nbRemainingMajorVersions
            versionHistoryList.push(version) // Adding a major version
        } else if (nbRemainingVersions) {
            nbRemainingVersions = --nbRemainingVersions
            versionHistoryList.push(version) // // Adding a previous version (major or not)
        }

        if (!nbRemainingVersions && !nbRemainingMajorVersions) {
            return versionHistoryList; // Break the loop when all wanted versions have been retrieved
        }
    }

    return versionHistoryList
}

/**
 * Return all released versions for a specific package in descending order (first element is latest version)
 * @param {string} pkgName name of the package
 * @returns {string[]} Array of all released versions
 */
const getAllVersions = async (pkgName) => {
    const { stdout } = await exec(`npm view ${pkgName} versions --json`).catch(() => {
        throw new Error('The package versions could not be retrieved')
    })
    const regExp = /\r\n|\n|\r|\[|"|\]|  */gm // Match new line, ellipsis, opening and closing bracket, spaces
    return stdout.replace(regExp, '').split(',').reverse()
}

/**
 * Filter out pre release, experimental, beta and alpha versions
 * @param {string[]]} versions array of all the versions of a package
 * @returns {string[]]} Array of filtered version
 */
const filterVersions = (versions) => {
    return versions.filter((version) => {
        return version.split('.').length <= 3 &&
            !version.includes('rc') &&
            !version.includes('beta') &&
            !version.includes('alpha') &&
            !version.includes('experimental')

    })
}

module.exports = getVersionHistory