const fs = require('fs')
const zlib = require('zlib');

/** Zip a file and save it in the same folder
 * @param {string} filePath - Absolute path of the file to zip
 */
gzipFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(`${filePath}.gz`);

        const zip = zlib.createGzip();

        fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
            if (err) return reject('The file could not be zipped ' + err);
            else resolve();
        })
    })
}

module.exports = {
    gzipFile
}