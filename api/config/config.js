const path = require('path')

/**
 * Workspace where packages are build
 * @type {string}
 */
const WORKSPACE_PATH = path.resolve(__dirname, '../workspace')

/**
 * Number of previous versions to retrieve, excluding latest version
 * @type {number}
 */
const NB_VERSIONS_IN_HISTORY = 2;

/**
 * Number of major versions to retrieve
 * @type {number}
 */
const NB_MAJOR_VERSIONS_IN_HISTORY = 1;

/**
 * Name of the minified bundle file
 */
const OUTPUT_BUNDLE_NAME = "bundle.min.js"

module.exports = {
    WORKSPACE_PATH,
    OUTPUT_BUNDLE_NAME,
    NB_MAJOR_VERSIONS_IN_HISTORY,
    NB_VERSIONS_IN_HISTORY
}